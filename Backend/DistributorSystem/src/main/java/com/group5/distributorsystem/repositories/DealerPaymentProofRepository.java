package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.DealerDocument;
import com.group5.distributorsystem.models.DealerPaymentProof;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DealerPaymentProofRepository extends MongoRepository <DealerPaymentProof, String>{

    Iterable<DealerPaymentProof> findByCollectionPaymentReceipt_Paymentreceiptid(String paymentreceiptid);
}
