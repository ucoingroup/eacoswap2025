//
//  Token.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import Foundation

struct Token: Codable, Identifiable, Hashable {
    let id: String
    let name: String
    let symbol: String
    let currentPrice: Double?
    let marketCap: Double?
    let totalVolume: Double?
    let priceChange24h: Double?
    let image: String?
    let decimals: Int?
    let mintAddress: String?
    let platformId: String?

    enum CodingKeys: String, CodingKey {
        case id
        case name
        case symbol
        case currentPrice = "current_price"
        case marketCap = "market_cap"
        case totalVolume = "total_volume"
        case priceChange24h = "price_change_24h"
        case image
        case decimals
        case mintAddress = "mint_address"
        case platformId = "platform_id"
    }

    static var eaco: Token {
        Token(
            id: "eacocoin",
            name: "EACO",
            symbol: "EACO",
            currentPrice: nil,
            marketCap: nil,
            totalVolume: nil,
            priceChange24h: nil,
            image: nil,
            decimals: 6,
            mintAddress: "5EacoNSJtM7PGqj7Gh2pv1U2N7y1b8ZG6tC6sE7K8b9A",
            platformId: "solana"
        )
    }

    static var sol: Token {
        Token(
            id: "solana",
            name: "Solana",
            symbol: "SOL",
            currentPrice: nil,
            marketCap: nil,
            totalVolume: nil,
            priceChange24h: nil,
            image: nil,
            decimals: 9,
            mintAddress: "So11111111111111111111111111111111111111112",
            platformId: "solana"
        )
    }

    static var usdc: Token {
        Token(
            id: "usd-coin",
            name: "USD Coin",
            symbol: "USDC",
            currentPrice: nil,
            marketCap: nil,
            totalVolume: nil,
            priceChange24h: nil,
            image: nil,
            decimals: 6,
            mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            platformId: "solana"
        )
    }

    static var usdt: Token {
        Token(
            id: "tether",
            name: "Tether",
            symbol: "USDT",
            currentPrice: nil,
            marketCap: nil,
            totalVolume: nil,
            priceChange24h: nil,
            image: nil,
            decimals: 6,
            mintAddress: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
            platformId: "solana"
        )
    }

    static var wbtc: Token {
        Token(
            id: "wrapped-bitcoin",
            name: "Wrapped Bitcoin",
            symbol: "wBTC",
            currentPrice: nil,
            marketCap: nil,
            totalVolume: nil,
            priceChange24h: nil,
            image: nil,
            decimals: 8,
            mintAddress: "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJ",
            platformId: "solana"
        )
    }

    static var weth: Token {
        Token(
            id: "wrapped-ethereum",
            name: "Wrapped Ethereum",
            symbol: "wETH",
            currentPrice: nil,
            marketCap: nil,
            totalVolume: nil,
            priceChange24h: nil,
            image: nil,
            decimals: 8,
            mintAddress: "7vfCXTUXx5WJV5JMHxQK5UJjB8DQ4kK9QLg6r12WJLyr",
            platformId: "solana"
        )
    }

    static var wbnb: Token {
        Token(
            id: "wrapped-bnb",
            name: "Wrapped BNB",
            symbol: "wBNB",
            currentPrice: nil,
            marketCap: nil,
            totalVolume: nil,
            priceChange24h: nil,
            image: nil,
            decimals: 8,
            mintAddress: "9gP2K5Qq5KmM8L3J6N7r8P9Q0R1S2T3U4V5W6X7Y8Z9",
            platformId: "solana"
        )
    }

    static var trx: Token {
        Token(
            id: "tron",
            name: "TRON",
            symbol: "TRX",
            currentPrice: nil,
            marketCap: nil,
            totalVolume: nil,
            priceChange24h: nil,
            image: nil,
            decimals: 6,
            mintAddress: "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1",
            platformId: "solana"
        )
    }

    static var ecnh: Token {
        Token(
            id: "ecnh-stable",
            name: "eCNH Stable",
            symbol: "eCNH",
            currentPrice: nil,
            marketCap: nil,
            totalVolume: nil,
            priceChange24h: nil,
            image: nil,
            decimals: 6,
            mintAddress: "Z1Y2X3W4V5U6T7S8R9Q0P1O2N3M4L5K6J7I8H9G0F1",
            platformId: "solana"
        )
    }

    static var allTokens: [Token] {
        [.eaco, .sol, .usdc, .usdt, .wbtc, .weth, .wbnb, .trx, .ecnh]
    }
}
