package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.DirectPaymentReceipt;
import com.group5.distributorsystem.models.PaymentReceipt;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentReceiptRepository extends CrudRepository<PaymentReceipt, Integer> {

    //di rako need ani kay sa list of receipts kay nagsagol raman tanan
    /*Iterable<DirectPaymentReceipt> getPaymentReceiptsByDiscriminatorValue(String discriminatorValue);
     */
}
