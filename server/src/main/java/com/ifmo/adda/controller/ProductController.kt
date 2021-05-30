package com.ifmo.adda.controller

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(
    value = ["/freeapi/1.0/products/"],
    produces = [MediaType.APPLICATION_JSON_VALUE])
class ProductController {
    @GetMapping(
        value = ["/all"],
        produces = [MediaType.IMAGE_JPEG_VALUE]
    )
    fun createReservation(): String = "success"

}