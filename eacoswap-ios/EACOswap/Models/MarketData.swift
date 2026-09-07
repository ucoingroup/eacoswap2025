//
//  MarketData.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import Foundation

struct MarketDataResponse: Codable {
    let tokens: [Token]
    let total: Int
    let page: Int
    let perPage: Int
    let lastUpdated: Date?

    enum CodingKeys: String, CodingKey {
        case tokens
        case total
        case page
        case perPage = "per_page"
        case lastUpdated = "last_updated"
    }
}

struct MarketDataError: Codable, Error {
    let code: String
    let message: String
}

enum MarketCapRange: String, CaseIterable {
    case top100 = "100"
    case top1000 = "1000"
    case top10000 = "10000"

    var displayName: String {
        switch self {
        case .top100: return "Top 100"
        case .top1000: return "Top 1000"
        case .top10000: return "Top 10000"
        }
    }
}
