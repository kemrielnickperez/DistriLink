package com.group5.distributorsystem.repositories;


import com.group5.distributorsystem.models.Distributor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistributorRepository extends MongoRepository<Distributor, String> {
}
