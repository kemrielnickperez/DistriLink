package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.Dealer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealerRepository extends CrudRepository<Dealer, Integer> {

}
