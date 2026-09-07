//
//  SwapQuote.swift
//  EACOswap
//
//  Created by EACO Team on 2026-09-07.
//

import Foundation

struct SwapQuote: Codable {
    let outAmount: String
    let slippageBps: Int
    let priceImpactPct: String?
    let routePlan: [RouteStep]?
    let contextSlot: Int?
    let timeTaken: Double?
    let inputMint: String?
    let outputMint: String?
    let inAmount: String?
    let otherAmountThreshold: String?
    let swapMode: String?

    enum CodingKeys: String, CodingKey {
        case outAmount = "outAmount"
        case slippageBps = "slippageBps"
        case priceImpactPct = "priceImpactPct"
        case routePlan = "routePlan"
        case contextSlot = "contextSlot"
        case timeTaken = "timeTaken"
        case inputMint = "inputMint"
        case outputMint = "outputMint"
        case inAmount = "inAmount"
        case otherAmountThreshold = "otherAmountThreshold"
        case swapMode = "swapMode"
    }
}

struct RouteStep: Codable {
    let swapInfo: SwapInfo
    let percent: Int
}

struct SwapInfo: Codable {
    let ammKey: String
    let label: String?
    let inputMint: String
    let outputMint: String
    let inAmount: String
    let outAmount: String
    let feeAmount: String
    let feeMint: String

    enum CodingKeys: String, CodingKey {
        case ammKey = "ammKey"
        case label
        case inputMint = "inputMint"
        case outputMint = "outputMint"
        case inAmount = "inAmount"
        case outAmount = "outAmount"
        case feeAmount = "feeAmount"
        case feeMint = "feeMint"
    }
}
