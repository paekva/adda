package com.ifmo.adda.dto

import java.time.Instant

data class CartDto(
    val id: Int,
    val client: Int,
    val products: List<ProductToQuantity>?
)

data class ProductToQuantity(
    val productId: Int,
    val quantity: Int
)

fun CartDto.toOrderDto() = OrderDto(
    null,
    client,
    false,
    null,
    products,
    Instant.now().toEpochMilli(),
    Instant.now().toEpochMilli() + 2592000000,
    Status.ACCEPTANCE

)