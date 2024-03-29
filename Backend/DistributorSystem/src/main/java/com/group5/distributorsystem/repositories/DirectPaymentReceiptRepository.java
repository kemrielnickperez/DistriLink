package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.DirectPaymentReceipt;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectPaymentReceiptRepository extends MongoRepository<DirectPaymentReceipt, String> {
}
