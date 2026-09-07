package com.eaco.swap

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*

interface ApiService {

    @GET("/api/health")
    suspend fun getHealth(): HealthResponse

    @GET("/api/sol-price")
    suspend fun getSolPrice(): SolPriceResponse

    @GET("/api/tokens/market-cap")
    suspend fun getMarketCap(@Query("range") range: String): MarketCapResponse

    @GET("/api/jupiter/quote")
    suspend fun getJupiterQuote(
        @Query("inputMint") inputMint: String,
        @Query("outputMint") outputMint: String,
        @Query("amount") amount: String
    ): JupiterQuoteResponse

    @POST("/api/helius/rpc")
    suspend fun postHeliusRpc(@Body body: HeliusRpcRequest): HeliusRpcResponse

    companion object {
        fun create(baseUrl: String): ApiService {
            val logging = HttpLoggingInterceptor().apply {
                level = HttpLoggingInterceptor.Level.BODY
            }

            val client = OkHttpClient.Builder()
                .addInterceptor(logging)
                .build()

            val url = if (baseUrl.endsWith("/")) baseUrl else "$baseUrl/"

            return Retrofit.Builder()
                .baseUrl(url)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(ApiService::class.java)
        }
    }
}

data class HealthResponse(
    val status: String,
    val timestamp: Long? = null
)

data class SolPriceResponse(
    val price: Double,
    val change24h: Double,
    val lastUpdated: String? = null
)

data class MarketCapResponse(
    val tokens: List<TokenInfo>,
    val range: String
)

data class TokenInfo(
    val address: String,
    val symbol: String,
    val name: String,
    val marketCap: Double? = null,
    val price: Double? = null,
    val change24h: Double? = null
)

data class JupiterQuoteResponse(
    val inputMint: String,
    val outputMint: String,
    val inAmount: String,
    val outAmount: String,
    val priceImpactPct: Double? = null,
    val routePlan: List<RouteStep>? = null
)

data class RouteStep(
    val swapInfo: SwapInfo? = null
)

data class SwapInfo(
    val ammKey: String,
    val label: String,
    val inputMint: String,
    val outputMint: String,
    val inAmount: String,
    val outAmount: String,
    val feeAmount: String,
    val feeMint: String
)

data class HeliusRpcRequest(
    val jsonrpc: String = "2.0",
    val id: Int = 1,
    val method: String,
    val params: List<Any>
)

data class HeliusRpcResponse(
    val jsonrpc: String,
    val id: Int,
    val result: Any? = null,
    val error: RpcError? = null
)

data class RpcError(
    val code: Int,
    val message: String
)
