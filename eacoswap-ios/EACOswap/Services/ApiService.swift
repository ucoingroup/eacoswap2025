//
//  ApiService.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import Foundation
import Network
import os.log

actor ApiService {
    static let shared = ApiService()

    private let session: URLSession
    private let logger = Logger(subsystem: "com.eacoswap.app", category: "ApiService")
    private let monitor = NWPathMonitor()
    private var isOnline: Bool = true
    private var retryCount: Int = 0
    private let maxRetries: Int = 3

    private init() {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 30
        config.timeoutIntervalForResource = 300
        config.requestCachePolicy = .returnCacheDataElseLoad
        config.urlCache = URLCache(memoryCapacity: 50 * 1024 * 1024,
                                    diskCapacity: 100 * 1024 * 1024,
                                    directory: nil)
        self.session = URLSession(configuration: config)
        setupNetworkMonitor()
    }

    private func setupNetworkMonitor() {
        monitor.pathUpdateHandler = { [weak self] path in
            self?.isOnline = path.status == .satisfied
        }
        monitor.start(queue: DispatchQueue.global(qos: .background))
    }

    // MARK: - Base Request

    private func performRequest<T: Decodable>(
        endpoint: String,
        method: String = "GET",
        body: Data? = nil,
        headers: [String: String]? = nil
    ) async throws -> T {
        guard isOnline else {
            throw APIError.noInternetConnection
        }

        let baseURL = UserDefaults.standard.string(forKey: "server_url") ?? Constants.defaultServerURL
        guard let url = URL(string: "\(baseURL)\(endpoint)") else {
            throw APIError.invalidURL
        }

        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("EACOswap-iOS/1.0", forHTTPHeaderField: "User-Agent")

        headers?.forEach { key, value in
            request.setValue(value, forHTTPHeaderField: key)
        }

        if let body = body {
            request.httpBody = body
        }

        logger.info("Request: \(method) \(url.absoluteString)")

        do {
            let (data, response) = try await session.data(for: request)

            guard let httpResponse = response as? HTTPURLResponse else {
                throw APIError.invalidResponse
            }

            switch httpResponse.statusCode {
            case 200...299:
                let decoder = JSONDecoder()
                decoder.dateDecodingStrategy = .iso8601
                decoder.keyDecodingStrategy = .convertFromSnakeCase
                let decoded = try decoder.decode(T.self, from: data)
                retryCount = 0
                return decoded
            case 401:
                throw APIError.unauthorized
            case 429:
                throw APIError.rateLimited
            case 500...599:
                throw APIError.serverError(httpResponse.statusCode)
            default:
                throw APIError.httpError(statusCode: httpResponse.statusCode, data: data)
            }
        } catch let error as APIError {
            throw error
        } catch {
            if retryCount < maxRetries {
                retryCount += 1
                try await Task.sleep(nanoseconds: UInt64(pow(2.0, Double(retryCount)) * 1_000_000_000))
                return try await performRequest(endpoint: endpoint, method: method, body: body, headers: headers)
            }
            throw APIError.networkError(error)
        }
    }

    // MARK: - API Endpoints

    func getHealth() async throws -> HealthResponse {
        try await performRequest(endpoint: "/api/health")
    }

    func getSolPrice() async throws -> SolPriceResponse {
        try await performRequest(endpoint: "/api/sol-price")
    }

    func getMarketCap(range: MarketCapRange) async throws -> MarketDataResponse {
        try await performRequest(endpoint: "/api/tokens/market-cap?range=\(range.rawValue)")
    }

    func getJupiterQuote(
        inputMint: String,
        outputMint: String,
        amount: String,
        slippageBps: Int = 50
    ) async throws -> SwapQuote {
        let endpoint = "/api/jupiter/quote?inputMint=\(inputMint.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? inputMint)" +
                       "&outputMint=\(outputMint.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? outputMint)" +
                       "&amount=\(amount)" +
                       "&slippageBps=\(slippageBps)"
        return try await performRequest(endpoint: endpoint)
    }

    func postHeliusRPC(body: [String: Any]) async throws -> Data {
        let baseURL = UserDefaults.standard.string(forKey: "server_url") ?? Constants.defaultServerURL
        guard let url = URL(string: "\(baseURL)/api/helius/rpc") else {
            throw APIError.invalidURL
        }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONSerialization.data(withJSONObject: body)

        let (data, response) = try await session.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
            throw APIError.invalidResponse
        }
        return data
    }

    func isReachable() -> Bool {
        return isOnline
    }
}

// MARK: - Response Models

struct HealthResponse: Codable {
    let status: String
    let version: String?
    let timestamp: String?
}

struct SolPriceResponse: Codable {
    let solana: SolPriceData?
    let price: Double?
    let lastUpdated: Date?

    enum CodingKeys: String, CodingKey {
        case solana, price
        case lastUpdated = "last_updated"
    }

    var currentPrice: Double {
        solana?.usd ?? price ?? 0
    }
}

struct SolPriceData: Codable {
    let usd: Double
    let usdMarketCap: Double?
    let usd24hVol: Double?
    let usd24hChange: Double?

    enum CodingKeys: String, CodingKey {
        case usd
        case usdMarketCap = "usd_market_cap"
        case usd24hVol = "usd_24h_vol"
        case usd24hChange = "usd_24h_change"
    }
}

// MARK: - Error Types

enum APIError: LocalizedError {
    case invalidURL
    case invalidResponse
    case noInternetConnection
    case unauthorized
    case rateLimited
    case serverError(Int)
    case httpError(statusCode: Int, data: Data)
    case networkError(Error)
    case decodingError(Error)

    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return NSLocalizedString("error.invalid_url", comment: "")
        case .invalidResponse:
            return NSLocalizedString("error.invalid_response", comment: "")
        case .noInternetConnection:
            return NSLocalizedString("error.no_internet", comment: "")
        case .unauthorized:
            return NSLocalizedString("error.unauthorized", comment: "")
        case .rateLimited:
            return NSLocalizedString("error.rate_limited", comment: "")
        case .serverError(let code):
            return String(format: NSLocalizedString("error.server_error", comment: ""), code)
        case .httpError(let statusCode, _):
            return String(format: NSLocalizedString("error.http_error", comment: ""), statusCode)
        case .networkError(let error):
            return error.localizedDescription
        case .decodingError(let error):
            return error.localizedDescription
        }
    }
}
