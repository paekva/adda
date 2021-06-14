package com.ifmo.adda.service

import com.ifmo.adda.dao.Product
import com.ifmo.adda.dao.toDto
import com.ifmo.adda.dto.ProductsList
import com.ifmo.adda.exception.NotFoundException
import com.ifmo.adda.repository.ProductsRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class ProductsService(
    private val productRepository: ProductsRepository,
    private val productPhotoService: ProductPhotoService
) {

    fun getProducts() = ProductsList(
        productRepository.findAll().map { it.toDto(productPhotoService.getImageId(it.id!!)) }
    )

    fun getProductsByIds(ids: List<Int>) =
        productRepository.findAllById(ids).map { it.toDto(productPhotoService.getImageId(it.id!!)) }

    fun getProduct(productId: Int): Product {
        return productRepository.findByIdOrNull(productId)
            ?: throw NotFoundException("cannot find product by id $productId")
    }
}