//
//  DEX.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import Foundation

struct DEX: Codable, Identifiable, Hashable {
    let id: String
    let name: String
    let url: String
    let description: String
    let supportsEACO: Bool
    let logoUrl: String?
    let tvl: Double?
    let volume24h: Double?

    enum CodingKeys: String, CodingKey {
        case id, name, url, description
        case supportsEACO = "supports_eaco"
        case logoUrl = "logo_url"
        case tvl
        case volume24h = "volume_24h"
    }

    static var jupiter: DEX {
        DEX(
            id: "jupiter",
            name: "Jupiter",
            url: "https://jup.ag",
            description: "Solana's leading DEX aggregator",
            supportsEACO: true,
            logoUrl: nil,
            tvl: nil,
            volume24h: nil
        )
    }

    static var raydium: DEX {
        DEX(
            id: "raydium",
            name: "Raydium",
            url: "https://raydium.io",
            description: "AMM and liquidity provider on Solana",
            supportsEACO: true,
            logoUrl: nil,
            tvl: nil,
            volume24h: nil
        )
    }

    static var orca: DEX {
        DEX(
            id: "orca",
            name: "Orca",
            url: "https://orca.so",
            description: "User-friendly DEX on Solana",
            supportsEACO: true,
            logoUrl: nil,
            tvl: nil,
            volume24h: nil
        )
    }

    static var meteora: DEX {
        DEX(
            id: "meteora",
            name: "Meteora",
            url: "https://meteora.ag",
            description: "Dynamic AMM pools on Solana",
            supportsEACO: false,
            logoUrl: nil,
            tvl: nil,
            volume24h: nil
        )
    }

    static var allDEXes: [DEX] {
        [.jupiter, .raydium, .orca, .meteora]
    }
}
