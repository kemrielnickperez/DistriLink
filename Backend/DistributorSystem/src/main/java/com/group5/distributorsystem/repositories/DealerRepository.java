package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.Dealer;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface DealerRepository extends MongoRepository<Dealer, String> {
    Dealer findByDealeridAndPassword(String dealerid, String password);
    Optional<Dealer> findById(String id);

}
