package com.ifmo.adda.controller

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(
    value = ["/api/1.0/orders/"],
    produces = [MediaType.APPLICATION_JSON_VALUE]
)
class OrderController(
) {
    @GetMapping(
        value = ["/all"]
    )
    fun getAllProducts(): OrdersList = OrdersList(listOf(Order(1, 2, listOf(3, 8, 9), 4, 5, 6)))
}

data class Order(
    val id: Int,
    val client: Int,
    val products: List<Int>,
    val dateOfOrder: Int,
    val dateOfReceive: Long,
    val status: Int
)

data class OrdersList(
    val orders: List<Order>
)