package com.ifmo.adda.service

import com.ifmo.adda.dao.getStatusIntItem
import com.ifmo.adda.dto.Status
import com.ifmo.adda.repository.OrderConfirmationRepository
import org.springframework.stereotype.Service

@Service
class OrderConfirmationService(
    private val orderConfirmationRepository: OrderConfirmationRepository
) {

    fun getConfirmationByOrderAndStatus(orderId: Int, status: Status): ByteArray {
        val data = orderConfirmationRepository.findAllByOrderIdAndStatus(orderId, getStatusIntItem(status))
        print(data)
        return ByteArray(1)
    }

}