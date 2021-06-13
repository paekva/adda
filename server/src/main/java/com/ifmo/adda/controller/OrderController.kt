package com.ifmo.adda.controller

import com.ifmo.adda.dto.OrderDto
import com.ifmo.adda.dto.OrdersDto
import com.ifmo.adda.service.OrdersService
import com.ifmo.adda.service.OrdersService.Companion.EXPECTED_DELIVERY_TIME
import com.ifmo.adda.service.UserService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import java.time.Instant
import java.time.temporal.ChronoUnit

@RestController
@RequestMapping(
    value = ["/api/1.0/orders/"],
    produces = [MediaType.APPLICATION_JSON_VALUE]
)
class OrderController(
    private val ordersService: OrdersService,
    private val userService: UserService
) {
    @GetMapping("/all")
    fun getAllProducts(): OrdersDto = OrdersDto(ordersService.getOrders())

    @GetMapping("/forUser")
    fun getOrdersForUser(): OrdersDto {
        val orders =
            if (userService.IAmAdmin()) ordersService.getOrders() else ordersService.getOrdersForClient(userService.myId())
        return OrdersDto(orders)
    }

    @PostMapping("/createCustom")
    fun createCustomOrder(@RequestBody description: String) = ordersService.makeCustomOrder(
        OrderDto(
            null,
            userService.myId(),
            true,
            description,
            null,
            Instant.now().toEpochMilli(),
            Instant.now().plusMillis(EXPECTED_DELIVERY_TIME).toEpochMilli(),
            10
        )
    )
}