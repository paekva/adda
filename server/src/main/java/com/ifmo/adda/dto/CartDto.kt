package com.ifmo.adda.dto

import java.time.Instant

data class CartDto(
        val id: Int,
        val client: Int,
        val products: List<Pair<Int, Int>>?
)

fun CartDto.toOrderDto() = OrderDto(null, client, false, null, products, Instant.now().toEpochMilli(), Instant.now().toEpochMilli() + 2592000000, 1)