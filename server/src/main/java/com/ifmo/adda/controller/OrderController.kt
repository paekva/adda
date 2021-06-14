package com.ifmo.adda.controller

import com.ifmo.adda.dto.OrderDto
import com.ifmo.adda.dto.OrdersDto
import com.ifmo.adda.dto.Status
import com.ifmo.adda.service.OrdersService
import com.ifmo.adda.service.OrdersService.Companion.EXPECTED_DELIVERY_TIME
import com.ifmo.adda.service.UserService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import java.time.Instant

@RestController
@RequestMapping(
    value = ["/api/1.0/orders/"],
    produces = [MediaType.APPLICATION_JSON_VALUE]
)
class OrderController(
    private val ordersService: OrdersService,
    private val userService: UserService
) {
    @GetMapping("/forUser")
    fun getOrdersForUser(): OrdersDto {
        val orders =
            if (userService.iAmAdmin())
                ordersService.getOrders()
            else if (userService.iAmWorker())
                ordersService.getOrdersForWorker(userService.myId())
            else
                ordersService.getOrdersForClient(userService.myId())
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
            Status.ACCEPTANCE
        )
    )

    @GetMapping("/cancel")
    fun cancelOrder(@RequestParam orderId: Int): OrderDto {
        return ordersService.cancelOrder(orderId)
    }

    @GetMapping("/accept")
    fun acceptOrder(@RequestParam orderId: Int): OrderDto {
        return ordersService.acceptOrder(orderId)
    }

    @GetMapping("/decline")
    fun declineOrder(@RequestParam orderId: Int): OrderDto {
        return ordersService.declineOrder(orderId, userService.iAmAdmin())
    }

    @GetMapping("/start")
    fun startOrder(@RequestParam orderId: Int): OrderDto {
        return ordersService.startOrder(orderId)
    }

    @GetMapping("/check")
    fun checkOrder(@RequestParam orderId: Int): OrderDto {
        return ordersService.sendOrderOnCheck(orderId)
    }
}