package com.ifmo.adda.dao

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
    val client: Int,

    @Column(nullable = false)
    var dateOfOrder: Instant,

    @Column(nullable = false)
    val dateOfReceive: Instant,

    @Column(nullable = false)
    val status: Int,

    @Column
    val lastError: String?,

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "product_to_order",
        joinColumns = [JoinColumn(name = "order_id", referencedColumnName = "ID")],
        inverseJoinColumns = [JoinColumn(name = "product_id", referencedColumnName = "ID")]
    )
    var products: MutableList<Product>,

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "worker_to_order",
        joinColumns = [JoinColumn(name = "order_id", referencedColumnName = "ID")],
        inverseJoinColumns = [JoinColumn(name = "client_id", referencedColumnName = "ID")]
    )
    var workers: MutableList<User>
)