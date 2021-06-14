package com.ifmo.adda.dao

import java.time.Instant
import javax.persistence.*

@Entity
@Table(name = "CUSTOM_ORDER_ITEM")
data class CustomOrder(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    var id: Int? = null,

    @Column(nullable = false)
    val client: Int,

    @Column(nullable = true)
    val description: String,

    @Column(nullable = false)
    var dateOfOrder: Instant,

    @Column(nullable = false)
    val dateOfReceive: Instant,

    @Column(nullable = false)
    val status: Int,

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "worker_to_order",
        joinColumns = [JoinColumn(name = "order_id", referencedColumnName = "ID")],
        inverseJoinColumns = [JoinColumn(name = "client_id", referencedColumnName = "ID")]
    )
    var workers: MutableList<User>
)