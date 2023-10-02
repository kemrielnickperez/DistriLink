package com.group5.distributorsystem.repositories;


import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.models.OrderedProduct;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface OrderedProductRepository extends MongoRepository<OrderedProduct, String> {

    // Set<OrderedProduct> findByOrderid(String orderid);
}
