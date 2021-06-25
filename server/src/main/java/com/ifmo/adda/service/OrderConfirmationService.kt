package com.ifmo.adda.service

import com.ifmo.adda.dao.OrderConfirmation
import com.ifmo.adda.dao.getStatusIntItem
import com.ifmo.adda.dto.OrderConfirmationDto
import com.ifmo.adda.dto.Status
import com.ifmo.adda.repository.OrderConfirmationRepository
import com.ifmo.adda.repository.OrdersRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*
import javax.annotation.PostConstruct

@Service
class OrderConfirmationService(
    private val orderConfirmationRepository: OrderConfirmationRepository,
    private val ordersRepository: OrdersRepository
) {

    fun getConfirmationByOrderAndStatus(orderId: Int, status: Status): ByteArray? {
        val data = orderConfirmationRepository.findAllByOrderIdAndStatus(orderId, getStatusIntItem(status))
            .sortedByDescending { it -> it.dateOfConfirmation }
        return if (data.count() > 0) data[0].confirmation else null
    }

    @PostConstruct
    fun restoreConfirmation() {
        if (orderConfirmationRepository.findAll().isEmpty()) {
            val existingProducts = ordersRepository.findAll()
            existingProducts.forEach {
                restorePhotoFromResources(it.id!!)
            }
        }
    }

    private fun restorePhotoFromResources(orderId: Int) {
        val resource = this::class.java.classLoader.getResource("$orderId.jpg") ?: return
        val data = Files.readAllBytes(Paths.get(resource.toURI()))
        setConfirmation(orderId, Status.BUY, data)
    }

    @Transactional
    fun setConfirmation(orderId: Int, status: Status, data: ByteArray): OrderConfirmationDto {
        val new = OrderConfirmation(orderId, getStatusIntItem(status), data, Calendar.getInstance().time.toInstant())
        val saved = orderConfirmationRepository.saveAndFlush(new)
        return OrderConfirmationDto(saved.orderId, saved.status, saved.confirmation.size)
    }
}