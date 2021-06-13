package com.ifmo.adda.dto

data class OrderDto(
    val id: Int?,
    val client: Int,
    val isCustom: Boolean,
    val description: String?,
    val products: List<ProductToQuantity>?,
    val dateOfOrder: Long,
    val dateOfReceive: Long,
    val status: Int
)

data class OrdersDto(
    val orders: List<OrderDto>
)