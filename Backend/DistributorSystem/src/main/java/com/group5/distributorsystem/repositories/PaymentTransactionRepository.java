package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.models.PaymentTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentTransactionRepository extends MongoRepository<PaymentTransaction, String> {
}
