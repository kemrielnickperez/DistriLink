package com.group5.distributorsystem.repositories;


import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.Distributor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DistributorRepository extends MongoRepository<Distributor, String> {
    Optional<Distributor> findById(String id);
}
