package com.ifmo.adda.service

import com.ifmo.adda.controller.ProductsList
import com.ifmo.adda.dao.toDto
import com.ifmo.adda.repository.ProductsRepository
import org.springframework.stereotype.Service

@Service
class ProductsService(
    private val productRepository: ProductsRepository
) {

    fun getProducts() = ProductsList(
        productRepository.findAll().map { it.toDto() }
    )
}