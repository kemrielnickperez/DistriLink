package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.ArchivedDealer;
import com.group5.distributorsystem.models.Dealer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArchivedDealerRepository extends MongoRepository<ArchivedDealer, String > {

    List<Dealer> findAllByDistributor_Distributorid(String distributorId);

}
