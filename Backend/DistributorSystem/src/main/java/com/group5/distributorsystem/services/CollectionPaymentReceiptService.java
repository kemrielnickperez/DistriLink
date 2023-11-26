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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    @Autowired
    OrderRepository orderRepository;



    public CollectionPaymentReceipt createCollectionPaymentReceipt(
            CollectionPaymentReceipt collectionPaymentReceipt,
            List<String> collectorproofid, List<String> dealerproofid,
            List<String> collectordocumentNames, List<String> dealerdocumentNames,
            List<String> collectordocumentTypes, List<String> dealerdocumentTypes,
            List<MultipartFile> collectordocumentContents, List<MultipartFile> dealerdocumentContents
    ) {

        CollectionPaymentReceipt savedCollectionPaymentReceipt = collectionPaymentReceiptRepository.save(collectionPaymentReceipt);

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findById(savedCollectionPaymentReceipt.getPaymenttransactionid()).get();



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
        paymentTransactionService.UpdatePaymentTransactionInOrder(paymentTransaction.getPaymenttransactionid());
        paymentTransactionRepository.save(paymentTransaction);

        paymentTransactionService.UpdatePaymentTransactionInOrder(paymentTransaction.getPaymenttransactionid());



        return collectionPaymentReceiptRepository.save(savedCollectionPaymentReceipt);
    }



   public ResponseEntity confirmCollectionPaymentReceipt(String collectionpaymentreciptid, String receiverID) {

       CollectionPaymentReceipt outdatedCollectionPaymentReceipt = collectionPaymentReceiptRepository.findById(collectionpaymentreciptid).get();

       CollectionPaymentReceipt updatedCdollectionPaymentReceipt = collectionPaymentReceiptRepository.findById(collectionpaymentreciptid).get();

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findById(updatedCdollectionPaymentReceipt.getPaymenttransactionid()).get();

        if (receiverID != null) {
            Distributor distributor = distributorRepository.findById(receiverID).orElse(null);
            Employee employee = employeeRepository.findById(receiverID).orElse(null);

            if (distributor != null) {
                updatedCdollectionPaymentReceipt.setReceiverID(distributor.getDistributorid());
                updatedCdollectionPaymentReceipt.setReceivername(distributor.getFullName());
                distributor.getPaymentreceiptids().add(updatedCdollectionPaymentReceipt.getPaymentreceiptid());
                distributorRepository.save(distributor);
            } else if (employee != null) {
                updatedCdollectionPaymentReceipt.setReceiverID(employee.getEmployeeid());
                updatedCdollectionPaymentReceipt.setReceivername(employee.getFullName());
                employee.getPaymentreceiptids().add(updatedCdollectionPaymentReceipt.getPaymentreceiptid());
                employeeRepository.save(employee);
            }
            updatedCdollectionPaymentReceipt.setIsconfirmed(true);
        }
       updatedCdollectionPaymentReceipt.setConfirmationdate(LocalDate.now());
       updatedCdollectionPaymentReceipt.setAmountpaid(updatedCdollectionPaymentReceipt.getRemittedamount());
       updatedCdollectionPaymentReceipt.setPaymenttransactionid(paymentTransaction.getPaymenttransactionid());
       paymentReceiptRepository.save(updatedCdollectionPaymentReceipt);

       for (PaymentReceipt pr: paymentTransaction.getPaymentreceipts()) {
           if(pr.getPaymentreceiptid().equals(outdatedCollectionPaymentReceipt.getPaymentreceiptid())){
                    paymentTransaction.getPaymentreceipts().remove(pr);
           }
       }
       paymentTransaction.getPaymentreceipts().add(updatedCdollectionPaymentReceipt);
       paymentTransactionRepository.save(paymentTransaction);

       //code para ma true na ang isPaid sa payment transaction if ang tanan amount sa PR kay equal na sa amount due sa PT
       PaymentTransaction updatedPaymentTransaction = paymentTransactionService.updatePaidPaymentTransaction(paymentTransaction.getPaymenttransactionid());
       paymentTransactionService.UpdatePaymentTransactionInOrder(updatedPaymentTransaction.getPaymenttransactionid());

        return new ResponseEntity("Collection Payment Receipt Confirmed Successfully!", HttpStatus.OK);
    }




    public List<CollectionPaymentReceipt> getAllCollectionPaymentReceipts() {
        return collectionPaymentReceiptRepository.findAll();
    }


    public List<CollectionPaymentReceipt> getAllUnconfirmedCollectionPaymentReceipts() {
        return collectionPaymentReceiptRepository.findByIsconfirmedFalse();
    }

    public List<CollectionPaymentReceipt> getAllUnconfirmedCollectionPaymentReceiptsByDistributorID(String distributorid) {

            List<CollectionPaymentReceipt> collectionPaymentReceipts = new ArrayList<>();
            Optional<Distributor> distributorOptional = distributorRepository.findById(distributorid);

            if (distributorOptional.isPresent()) {
                Distributor distributor = distributorOptional.get();

                for (String orderId : distributor.getOrderids()) {
                    Optional<Order> orderOptional = orderRepository.findById(orderId);

                    if (orderOptional.isPresent()) {
                        Order order = orderOptional.get();

                        for (PaymentTransaction paymentTransaction : order.getPaymenttransactions()) {

                            for (PaymentReceipt pr:paymentTransaction.getPaymentreceipts()) {
                                if (pr instanceof CollectionPaymentReceipt) {
                                    CollectionPaymentReceipt collectionPaymentReceipt = (CollectionPaymentReceipt) pr;

                                    if (!collectionPaymentReceipt.isIsconfirmed()) {
                                        collectionPaymentReceipts.add(collectionPaymentReceipt);
                                    }
                                }
                            }
                            }
                        }
                    }
                }


            return collectionPaymentReceipts;
            // return collectionPaymentReceiptRepository.findByPaymenttransactionid_Order_Distributor_DistributoridAndIsconfirmedFalse(distributorid);
        }

}
