package com.ifmo.adda.controller

import com.ifmo.adda.dto.ProductDto
import com.ifmo.adda.service.ProductsService
import com.ifmo.adda.service.UserService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(
    value = ["/api/1.0/products/"],
    produces = [MediaType.APPLICATION_JSON_VALUE]
)
class ProductController(
    private val productsService: ProductsService
) {
    @GetMapping(
        value = ["/all"]
    )
    fun getAllProducts(): ProductsList = productsService.getProducts()
}


data class ProductsList(
    val products: List<ProductDto>
)