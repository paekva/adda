package com.ifmo.adda.dto

data class OrderDto(
    val id: Int?,
    val client: Int,
    val isCustom: Boolean,
    val description: String?,
    val products: List<ProductToQuantity>?,
    val dateOfOrder: Long,
    val dateOfReceive: Long,
    val status: Status
)

data class OrdersDto(
    val orders: List<OrderDto>
)

enum class Status {
    ACCEPTANCE,
    BUY,
    LOAD,
    UNLOAD,
    DELIVERY,
    ON_THE_WAY,
    UNKNOWN
}