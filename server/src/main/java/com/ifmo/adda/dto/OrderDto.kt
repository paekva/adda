package com.ifmo.adda.dto

import java.math.BigInteger

data class OrderDto(
        val id: Int,
        val client: BigInteger,
        val isCustom: Boolean,
        val description: String?,
        val products: List<Pair<Int, Int>>?,
        val dateOfOrder: Long,
        val dateOfReceive: Long,
        val status: Int
)