package com.ifmo.adda.service

import com.ifmo.adda.dao.ProductPhoto
import com.ifmo.adda.dto.ImageSavedResponseDto
import com.ifmo.adda.exception.NotFoundException
import com.ifmo.adda.repository.ProductPhotoRepository
import com.ifmo.adda.repository.ProductsRepository
import mu.KLogging
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.nio.file.Files
import java.nio.file.Paths
import javax.annotation.PostConstruct

@Service
class ProductPhotoService(
    private val productPhotoRepository: ProductPhotoRepository,
    private val productsRepository: ProductsRepository
) {

    @PostConstruct
    fun restoreImages() {
        if (productPhotoRepository.findAll().isEmpty()) {
            logger.warn { "There are no photos in the database, they will be restored." }
            val existingProducts = productsRepository.findAll()
            existingProducts.forEach {
                restorePhotoFromResources(it.id!!)
            }
        }
    }

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

    private fun restorePhotoFromResources(productId: Int) {
        val resource = this::class.java.classLoader.getResource("$productId.jpg")
        if (resource == null) {
            logger.error { "Cannot find photo for product $productId in resources" }
            return
        }
        val data = Files.readAllBytes(Paths.get(resource.toURI()))
        saveImage(productId, data)
    }

    companion object : KLogging()
}