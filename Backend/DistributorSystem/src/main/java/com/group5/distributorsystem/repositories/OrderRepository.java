package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.sql.rowset.CachedRowSet;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer> {
}
