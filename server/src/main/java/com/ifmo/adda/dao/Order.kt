package com.ifmo.adda.dao

import java.math.BigInteger
import java.time.Instant
import javax.persistence.*

@Entity
@Table(name = "ORDER_ITEM")
data class Order(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    var id: Int? = null,

    @Column(nullable = false)
    val client: BigInteger,

    @Column(nullable = false)
    var dateOfOrder: Instant,

    @Column(nullable = false)
    val dateOfReceive: Instant,

    @Column(nullable = false)
    val status: Int,

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "product_to_order",
        joinColumns = [JoinColumn(name = "order_id", referencedColumnName = "ID")],
        inverseJoinColumns = [JoinColumn(name = "product_id", referencedColumnName = "ID")]
    )
    var products: Collection<Product>? = null
)