package com.ifmo.adda.dao

import javax.persistence.*

@Entity
@Table(name = "order_confirmation")
data class OrderConfirmation(

    @Id
    @Column(nullable = false)
    val orderId: Int,

    @Column(nullable = false)
    val status: Int,

    @Column(nullable = false)
    val confirmation: ByteArray
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as OrderConfirmation

        if (orderId != other.orderId) return false
        if (status != other.status) return false
        if (!confirmation.contentEquals(other.confirmation)) return false

        return true
    }

    override fun hashCode(): Int {
        var result = orderId
        result = 31 * result + confirmation.contentHashCode()
        return result.toInt()
    }
}