package com.ifmo.adda.controller

import com.ifmo.adda.dto.ProductDto
import com.ifmo.adda.dto.ProductsList
import com.ifmo.adda.service.ProductPhotoService
import com.ifmo.adda.service.ProductsService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.mvc.support.RedirectAttributes

@RestController
@RequestMapping(
    value = ["/api/1.0/products/"],
    produces = [MediaType.APPLICATION_JSON_VALUE]
)
class ProductController(
    private val productsService: ProductsService,
    private val productPhotoService: ProductPhotoService
) {
    @GetMapping("/all")
    fun getAllProducts(): ProductsList = productsService.getProducts()


    @PostMapping("/byIds")
    fun getProductById(@RequestBody ids: List<Int>): List<ProductDto> =
        productsService.getProductsByIds(ids)

    @PostMapping("/image/set/{productId}")
    fun setImage(
        @PathVariable("productId") productId: Int,
        @RequestParam("file") file: MultipartFile,
        redirectAttributes: RedirectAttributes
    ) = productPhotoService.saveImage(productId, file.bytes)

    @GetMapping(
        value = ["/image/get/{productPhotoId}"],
        produces = [MediaType.IMAGE_JPEG_VALUE]
    )
    fun getImage(@PathVariable("productPhotoId") productPhotoId: Int): ByteArray =
        productPhotoService.getImage(productPhotoId)
}