package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.CollectorRemittanceProof;
import com.group5.distributorsystem.models.DealerPaymentProof;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CollectorRemittanceProofRepository extends MongoRepository<CollectorRemittanceProof, String> {

    Iterable<CollectorRemittanceProof> findByCollectionPaymentReceipt_Paymentreceiptid(String paymentreceiptid);
}
