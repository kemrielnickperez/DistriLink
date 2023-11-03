package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.*;
import com.group5.distributorsystem.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class CollectionPaymentReceiptService {

    @Autowired
    CollectionPaymentReceiptRepository collectionPaymentReceiptRepository;

    @Autowired
    PaymentTransactionService paymentTransactionService;

    @Autowired
    PaymentTransactionRepository paymentTransactionRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    CollectorRemittanceProofRepository collectionPaymentProofRepository;

    @Autowired
    DealerPaymentProofRepository dealerPaymentProofRepository;



    public CollectionPaymentReceipt createCollectionPaymentReceipt(
            CollectionPaymentReceipt collectionPaymentReceipt,
            List<String> collectorproofid, List<String> dealerproofid,
            List<String> collectordocumentNames, List<String> dealerdocumentNames,
            List<String> collectordocumentTypes, List<String> dealerdocumentTypes,
            List<MultipartFile> collectordocumentContents, List<MultipartFile> dealerdocumentContents
    ) {
        CollectionPaymentReceipt savedCollectionPaymentReceipt = collectionPaymentReceiptRepository.save(collectionPaymentReceipt);

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findById(collectionPaymentReceipt.getPaymenttransaction().getPaymenttransactionid()).get();

        for (int i = 0; i < collectorproofid.size(); i++) {
            CollectorRemittanceProof collectorProof = new CollectorRemittanceProof();
            collectorProof.setCollectorremittanceproofid(collectorproofid.get(i));
            collectorProof.setName(collectordocumentNames.get(i));
            collectorProof.setType(collectordocumentTypes.get(i));
            collectorProof.setCollectionPaymentReceipt(savedCollectionPaymentReceipt);

            try {
                collectorProof.setContent(collectordocumentContents.get(i).getBytes());
            } catch (IOException e) {
                // Handle the exception (e.g., log an error).
                System.err.println("Error reading file bytes for attachment: " + collectorProof.getName());
                e.printStackTrace();
                continue;
            }
            collectionPaymentProofRepository.save(collectorProof);
            savedCollectionPaymentReceipt.getCollectorremittanceproofids().add(collectorProof.getCollectorremittanceproofid());

        }

        for (int i = 0; i < dealerproofid.size(); i++) {
            DealerPaymentProof dealerProof = new DealerPaymentProof();
            dealerProof.setDealerpaymentproofid(dealerproofid.get(i));
            dealerProof.setName(dealerdocumentNames.get(i));
            dealerProof.setType(dealerdocumentTypes.get(i));
            dealerProof.setCollectionPaymentReceipt(savedCollectionPaymentReceipt);
            try {
                dealerProof.setContent(dealerdocumentContents.get(i).getBytes());
            } catch (IOException e) {
                // Handle the exception (e.g., log an error).
                System.err.println("Error reading file bytes for attachment: " + dealerProof.getName());
                e.printStackTrace();
                continue;
            }
            dealerPaymentProofRepository.save(dealerProof);
            savedCollectionPaymentReceipt.getDealerpaymentproofids().add(dealerProof.getDealerpaymentproofid());
        }

        //dili paman ta ni mo isPaid diri, adto na sa confirm
        //paymentTransactionService.updatePaidPaymentTransaction(paymentTransaction.getPaymenttransactionid());

        paymentTransaction.setPaymentreceiptid(savedCollectionPaymentReceipt.getPaymentreceiptid());

        paymentTransactionRepository.save(paymentTransaction);

        return collectionPaymentReceiptRepository.save(savedCollectionPaymentReceipt);
    }

    /*public CollectionPaymentReceipt createCollectionPaymentReceipt(CollectionPaymentReceipt collectionPaymentReceipt){

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findById(collectionPaymentReceipt.getPaymenttransaction().getPaymenttransactionid()).get();

        Employee collector = employeeRepository.findById(collectionPaymentReceipt.getCollector().getEmployeeid()).get();

        paymentTransaction.setPaymentreceiptid(collectionPaymentReceipt.getPaymentreceiptid());

        collector.getCollectionpaymentids().add(collectionPaymentReceipt.getPaymentreceiptid());

        paymentTransactionService.updatePaidPaymentTransaction(paymentTransaction.getPaymenttransactionid());

        paymentTransactionRepository.save(paymentTransaction);

        employeeRepository.save(collector);

        paymentTransactionRepository.save(paymentTransaction);

        return collectionPaymentReceiptRepository.save(collectionPaymentReceipt);
    }*/

    public ResponseEntity confirmCollectionPaymentReceipt(String collectionpaymentreciptid, String cashierid) {

        CollectionPaymentReceipt collectionPaymentReceipt = collectionPaymentReceiptRepository.findById(collectionpaymentreciptid).get();

        Employee cashier = employeeRepository.findById(cashierid).get();

        collectionPaymentReceipt.setIsconfirmed(true);
        collectionPaymentReceipt.setCashier(cashier);
        cashier.getPaymentreceiptids().add(collectionPaymentReceipt.getPaymentreceiptid());


        collectionPaymentReceiptRepository.save(collectionPaymentReceipt);
        employeeRepository.save(cashier);

        return new ResponseEntity("Collection Payment Receipt Confirmed Successfully!", HttpStatus.OK);
    }


    public List<CollectionPaymentReceipt> getAllCollectionPaymentReceipts() {
        return collectionPaymentReceiptRepository.findAll();
    }


    public List<CollectionPaymentReceipt> getAllUnconfirmedCollectionPaymentReceipts() {
        return collectionPaymentReceiptRepository.findByIsconfirmedFalse();
    }
}
