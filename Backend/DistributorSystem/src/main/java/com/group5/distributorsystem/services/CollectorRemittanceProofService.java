package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.CollectorRemittanceProof;
import com.group5.distributorsystem.models.DealerPaymentProof;
import com.group5.distributorsystem.repositories.CollectionPaymentReceiptRepository;
import com.group5.distributorsystem.repositories.CollectorRemittanceProofRepository;
import com.group5.distributorsystem.repositories.DealerPaymentProofRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CollectorRemittanceProofService {

    @Autowired
    CollectorRemittanceProofRepository collectorRemittanceProofRepository;

    public Iterable<CollectorRemittanceProof> findAllCollectorProofByCollectionPaymentReceiptId(String paymentreceiptid){
        return collectorRemittanceProofRepository.findByCollectionPaymentReceipt_Paymentreceiptid(paymentreceiptid);
    }
}
