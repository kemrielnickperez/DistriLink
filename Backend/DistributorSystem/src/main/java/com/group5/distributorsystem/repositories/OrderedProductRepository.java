package com.group5.distributorsystem.repositories;


import com.group5.distributorsystem.models.OrderedProduct;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderedProductRepository extends CrudRepository<OrderedProduct, Integer> {
}
