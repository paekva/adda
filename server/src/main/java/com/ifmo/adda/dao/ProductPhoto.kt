package com.ifmo.adda.dao

import javax.persistence.*

@Entity
@Table(name = "product_photo")
data class ProductPhoto(

    @Id
    @Column(nullable = false)
    val productId: Int,

    @Column(nullable = false)
    val image: ByteArray
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ProductPhoto

        if (productId != other.productId) return false
        if (!image.contentEquals(other.image)) return false

        return true
    }

    override fun hashCode(): Int {
        var result = productId
        result = 31 * result + image.contentHashCode()
        return result.toInt()
    }
}