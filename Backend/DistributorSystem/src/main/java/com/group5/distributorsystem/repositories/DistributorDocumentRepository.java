package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.DealerDocument;
import com.group5.distributorsystem.models.DistributorDocument;
import com.group5.distributorsystem.models.EmployeeDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DistributorDocumentRepository extends MongoRepository <DistributorDocument, String> {

    Iterable<DistributorDocument> findByDistributor_Distributorid(String employeeid);

}
