package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.DealerDocument;
import com.group5.distributorsystem.models.DistributorDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DistributorDocumentRepository extends MongoRepository <DistributorDocument, String> {

}
