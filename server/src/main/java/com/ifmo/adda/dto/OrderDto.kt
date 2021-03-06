package com.ifmo.adda.dto

data class OrderDto(
        val id: Int?,
        val client: Int,
        val isCustom: Boolean,
        val description: String?,
        val products: List<ProductToQuantity>?,
        val dateOfOrder: Long,
        val dateOfReceive: Long,
        val status: Status,
        val price: String?,
        val lastError: String?
)

data class OrdersDto(
        val orders: List<OrderDto>
)

data class OrderConfirmationDto(
    val orderId: Int,
    val status: Int,
    val confirmationSize: Int
)

enum class Status {
    ACCEPTANCE,
    RETURNED,
    BUY_WAIT,
    BUY,
    BUY_ERROR,
    BUY_WAIT_ACCEPTANCE,
    LOAD_WAIT,
    LOAD,
    LOAD_ERROR,
    ON_THE_WAY,
    UNLOAD_WAIT,
    UNLOAD,
    UNLOAD_WAIT_ACCEPTANCE,
    UNLOAD_ERROR,
    DELIVERY_WAIT,
    DELIVERY,
    DELIVERY_WAIT_ACCEPTANCE,
    DELIVERY_ERROR,
    DELIVERED,
    CANCELED,
    PAID,
    UNKNOWN
}