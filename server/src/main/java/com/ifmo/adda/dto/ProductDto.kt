package com.ifmo.adda.dto

data class ProductDto(
    val id: Int,
    val name: String,
    val price: String,
    val imageId: Int?
)

data class ProductsList(
    val products: List<ProductDto>
)

data class ImageSavedResponseDto(
    val productId: Int,
    val imageSize: Int
)