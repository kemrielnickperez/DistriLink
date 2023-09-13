package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.CollectionPaymentReceipt;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionPaymentReceiptRepository extends CrudRepository<CollectionPaymentReceipt, Integer> {
}
