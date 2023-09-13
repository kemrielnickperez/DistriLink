package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.DirectPaymentReceipt;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectPaymentReceiptRepository extends CrudRepository<DirectPaymentReceipt, Integer> {
}
