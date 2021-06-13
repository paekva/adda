package com.ifmo.adda.controller

import com.ifmo.adda.dto.CartDto
import com.ifmo.adda.service.CartService
import com.ifmo.adda.service.OrdersService
import com.ifmo.adda.service.UserService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(
    value = ["/api/1.0/cart/"],
    produces = [MediaType.APPLICATION_JSON_VALUE]
)
class CartController(
    private val cartService: CartService,
    private val userService: UserService
) {
    @GetMapping("/cartContents")
    fun getCartContents(): CartDto = cartService.getCartContents(userService.myId())

    @PostMapping("/addProduct")
    fun addProduct(@RequestParam productId: Int): CartDto = cartService.addProduct(userService.myId(), productId)

    @PostMapping("/deleteProduct")
    fun deleteProduct(@RequestParam productId: Int): CartDto = cartService.deleteProduct(userService.myId(), productId)

    @PostMapping("/removeOneProduct")
    fun removeOneProduct(@RequestParam productId: Int): CartDto = cartService.removeOneProduct(userService.myId(), productId)

    @GetMapping("/clear")
    fun clearCart(): CartDto = cartService.clearCart(userService.myId())

    @GetMapping("/makeOrder")
    fun makeOrder() = cartService.convertCartToOrder(userService.myId())
}
