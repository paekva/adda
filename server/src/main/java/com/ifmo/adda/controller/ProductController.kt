package com.ifmo.adda.controller

import com.ifmo.adda.dto.ProductDto
import com.ifmo.adda.service.ProductsService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

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


    @PostMapping(
        value = ["/byIds"]
    )
    fun getProductById(@RequestBody ids: List<Int>): List<ProductDto> =
        productsService.getProductsByIds(ids)
}

data class ProductsList(
    val products: List<ProductDto>
)