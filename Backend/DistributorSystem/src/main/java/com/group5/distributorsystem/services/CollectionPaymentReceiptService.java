package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.*;
import com.group5.distributorsystem.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    @Autowired
    DistributorRepository distributorRepository;

    @Autowired
    PaymentReceiptRepository paymentReceiptRepository;



    public CollectionPaymentReceipt createCollectionPaymentReceipt(
            CollectionPaymentReceipt collectionPaymentReceipt,
            List<String> collectorproofid, List<String> dealerproofid,
            List<String> collectordocumentNames, List<String> dealerdocumentNames,
            List<String> collectordocumentTypes, List<String> dealerdocumentTypes,
            List<MultipartFile> collectordocumentContents, List<MultipartFile> dealerdocumentContents
    ) {
        CollectionPaymentReceipt savedCollectionPaymentReceipt = collectionPaymentReceiptRepository.save(collectionPaymentReceipt);

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findById(collectionPaymentReceipt.getPaymenttransactionid()).get();

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

        paymentTransaction.getPaymentreceipts().add(savedCollectionPaymentReceipt);

        paymentReceiptRepository.save(savedCollectionPaymentReceipt);
        paymentTransactionRepository.save(paymentTransaction);

        return collectionPaymentReceiptRepository.save(savedCollectionPaymentReceipt);
    }



   public ResponseEntity confirmCollectionPaymentReceipt(String collectionpaymentreciptid, String receiverID) {

        CollectionPaymentReceipt collectionPaymentReceipt = collectionPaymentReceiptRepository.findById(collectionpaymentreciptid).get();

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findById(collectionPaymentReceipt.getPaymenttransactionid()).get();


        if (receiverID != null) {
            Distributor distributor = distributorRepository.findById(receiverID).orElse(null);
            Employee employee = employeeRepository.findById(receiverID).orElse(null);

            if (distributor != null) {
                collectionPaymentReceipt.setReceiverID(distributor.getDistributorid());
                collectionPaymentReceipt.setReceivername(distributor.getFullName());
                distributor.getPaymentreceiptids().add(collectionPaymentReceipt.getPaymentreceiptid());
                distributorRepository.save(distributor);
            } else if (employee != null) {
                collectionPaymentReceipt.setReceiverID(employee.getEmployeeid());
                collectionPaymentReceipt.setReceivername(employee.getFullName());
                employee.getPaymentreceiptids().add(collectionPaymentReceipt.getPaymentreceiptid());
                employeeRepository.save(employee);
            }
            collectionPaymentReceipt.setIsconfirmed(true);
        }


        paymentTransaction.getPaymentreceipts().add(collectionPaymentReceipt);

        collectionPaymentReceipt.setConfirmationdate(LocalDate.now()
        );
        collectionPaymentReceipt.setAmountpaid(collectionPaymentReceipt.getRemittedamount());
        paymentTransaction.setPaid(true);
        collectionPaymentReceipt.setPaymenttransactionid(paymentTransaction.getPaymenttransactionid());

        paymentTransactionRepository.save(paymentTransaction);
        paymentReceiptRepository.save(collectionPaymentReceipt);

       //code para ma true na ang isPaid sa payment transaction if ang tanan amount sa PR kay equal na sa amount due sa PT
       paymentTransactionService.updatePaidPaymentTransaction(paymentTransaction.getPaymenttransactionid());

        return new ResponseEntity("Collection Payment Receipt Confirmed Successfully!", HttpStatus.OK);
    }




    public List<CollectionPaymentReceipt> getAllCollectionPaymentReceipts() {
        return collectionPaymentReceiptRepository.findAll();
    }


    public List<CollectionPaymentReceipt> getAllUnconfirmedCollectionPaymentReceipts() {
        return collectionPaymentReceiptRepository.findByIsconfirmedFalse();
    }

    /*public List<CollectionPaymentReceipt> getAllUnconfirmedCollectionPaymentReceiptsByDistributorID(String distributorid) {
        return collectionPaymentReceiptRepository.findByPaymenttransactionid_Order_Distributor_DistributoridAndIsconfirmedFalse(distributorid);
    }*/
}
