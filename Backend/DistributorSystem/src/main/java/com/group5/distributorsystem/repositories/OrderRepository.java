package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.CollectionPaymentReceipt;
import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.models.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.sql.rowset.CachedRowSet;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByIsconfirmedFalse();

    List<Order> findByDistributor_DistributoridAndIsconfirmedFalse(String distributorId);

    List<Order> findAllByDistributor_Distributorid(String distributorId);
}
