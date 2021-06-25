package com.ifmo.adda.controller

import com.ifmo.adda.dto.OrderDto
import com.ifmo.adda.dto.OrdersDto
import com.ifmo.adda.dto.Status
import com.ifmo.adda.service.OrderConfirmationService
import com.ifmo.adda.service.OrdersService
import com.ifmo.adda.service.OrdersService.Companion.EXPECTED_DELIVERY_TIME
import com.ifmo.adda.service.UserService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.mvc.support.RedirectAttributes
import java.time.Instant

@RestController
@RequestMapping(
    value = ["/api/1.0/orders/"],
    produces = [MediaType.APPLICATION_JSON_VALUE]
)
class OrderController(
    private val ordersService: OrdersService,
    private val userService: UserService,
    private val orderConfirmationService: OrderConfirmationService
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
            Status.ACCEPTANCE,
            "Оценивается"
        )
    )

    @GetMapping("/user/cancel/order")
    fun cancelOrder(@RequestParam orderId: Int, @RequestParam isCustom: Boolean): OrderDto {
        return ordersService.cancelOrder(orderId, isCustom)
    }

    @GetMapping("/declineCustom")
    fun declineCustomOrder(@RequestParam orderId: Int, @RequestParam reason: String): OrderDto {
        return ordersService.cancelCustomOrder(orderId, reason)
    }

    @GetMapping("/acceptCustom")
    fun acceptCustomOrder(@RequestParam orderId: Int, @RequestParam newPrice: String): OrderDto {
        return ordersService.acceptCustomOrder(orderId, newPrice)
    }

    @GetMapping("/acceptWork")
    fun acceptWork(@RequestParam orderId: Int): OrderDto {
        return ordersService.acceptOrder(orderId, userService.iAmAdmin())
    }

    @GetMapping("/start")
    fun startOrder(@RequestParam orderId: Int): OrderDto {
        return ordersService.startOrder(orderId, userService.meAsEntity().authorities)
    }

    @GetMapping("/check")
    fun checkOrder(@RequestParam orderId: Int): OrderDto {
        return ordersService.sendOrderOnCheck(orderId, userService.meAsEntity().authorities)
    }

    @GetMapping("/confirmation/get")
    fun getConfirmation(@RequestParam orderId: Int, @RequestParam status: Status): ByteArray? {
        return orderConfirmationService.getConfirmationByOrderAndStatus(orderId, status)
    }

    @PostMapping("/confirmation/set/{orderId}/{status}")
    fun setConfirmation(
        @PathVariable("orderId") orderId: Int,
        @PathVariable("status") status: Status,
        @RequestParam("file") file: MultipartFile,
        redirectAttributes: RedirectAttributes
    ) = orderConfirmationService.setConfirmation(orderId, status, file.bytes)
}