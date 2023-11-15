package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.CollectionPaymentReceipt;
import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.PaymentReceipt;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionPaymentReceiptRepository extends MongoRepository<CollectionPaymentReceipt, String> {
    List<CollectionPaymentReceipt> findByIsconfirmedFalse();
}
