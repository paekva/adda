package com.ifmo.adda.service

import com.ifmo.adda.dao.ProductPhoto
import com.ifmo.adda.dto.ImageSavedResponseDto
import com.ifmo.adda.exception.NotFoundException
import com.ifmo.adda.repository.ProductPhotoRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class ProductPhotoService(
    private val productPhotoRepository: ProductPhotoRepository
) {

    fun getImage(productId: Int): ByteArray {
        val productPhoto =
            productPhotoRepository.findByIdOrNull(productId)
                ?: throw NotFoundException("No img for id $productId")
        return productPhoto.image
    }

    fun saveImage(productId: Int, data: ByteArray): ImageSavedResponseDto {
        val new = ProductPhoto(productId, data)
        val saved = productPhotoRepository.saveAndFlush(new)
        return ImageSavedResponseDto(saved.productId, saved.image.size)
    }

    fun getImageId(productId: Int): Int? {
        val productPhoto =
            productPhotoRepository.findByIdOrNull(productId)
        return productPhoto?.productId
    }
}