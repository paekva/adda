package com.ifmo.adda.dto

import java.time.Instant

data class OrderDto(
        val id: Int?,
        val client: Int,
        val isCustom: Boolean,
        val description: String?,
        val products: List<Pair<Int, Int>>?,
        val dateOfOrder: Long,
        val dateOfReceive: Long,
        val status: Int
)

fun OrderDto.from(cartDto: CartDto) = OrderDto(null, cartDto.client, false, null, products, Instant.now().toEpochMilli(), Instant.now().toEpochMilli() + 2592000000, 1)