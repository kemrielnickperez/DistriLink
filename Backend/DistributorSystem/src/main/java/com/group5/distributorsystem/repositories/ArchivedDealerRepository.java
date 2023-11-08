package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.ArchivedDealer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchivedDealerRepository extends MongoRepository<ArchivedDealer, String > {

}
