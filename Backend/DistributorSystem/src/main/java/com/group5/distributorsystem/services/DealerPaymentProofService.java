package com.group5.distributorsystem.services;

import com.group5.distributorsystem.models.DealerDocument;
import com.group5.distributorsystem.models.DealerPaymentProof;
import com.group5.distributorsystem.repositories.DealerPaymentProofRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;


@Service
public class DealerPaymentProofService  {

    @Autowired
    DealerPaymentProofRepository dealerPaymentProofRepository;

    public Iterable<DealerPaymentProof> findAllDealerProofByCollectionPaymentReceiptId(String paymentreceiptid){
        return dealerPaymentProofRepository.findByCollectionPaymentReceipt_Paymentreceiptid(paymentreceiptid);
    }
}
