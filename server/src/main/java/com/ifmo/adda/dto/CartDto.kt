package com.ifmo.adda.dto

import java.math.BigInteger

data class CartDto(
        val id: Int,
        val client: BigInteger,
        val products: List<Pair<Int, Int>>?
)