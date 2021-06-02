package com.ifmo.adda.controller

import com.ifmo.adda.dto.OrderDto
import com.ifmo.adda.service.OrdersService
import com.ifmo.adda.service.UserService
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
    private val ordersService: OrdersService,
    private val userService: UserService
) {
    @GetMapping(
        value = ["/all"]
    )
    fun getAllProducts(): OrdersList = ordersService.getOrders()

    @GetMapping(
            value = ["/forUser"]
    )
    fun getOrdersForUser(): OrdersList = if (userService.IAmAdmin()) ordersService.getOrders() else ordersService.getOrdersForClient(userService.myId().toBigInteger())
}

//OrdersList(listOf(Order(1, 2, listOf(3, 8, 9), 4, 5, 6)))


data class OrdersList(
    val orders: List<OrderDto>
)