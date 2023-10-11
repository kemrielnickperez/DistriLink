package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.DealerDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface DealerDocumentRepository extends MongoRepository <DealerDocument, String> {

    Iterable<DealerDocument> findByDealer_Dealerid(String dealerid);

}
