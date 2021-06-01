package com.ifmo.adda.dto

data class OrderDto(
    val id: Int,
    val client: Int,
    val products: List<Int>,
    val dateOfOrder: Long,
    val dateOfReceive: Long,
    val status: Int
)