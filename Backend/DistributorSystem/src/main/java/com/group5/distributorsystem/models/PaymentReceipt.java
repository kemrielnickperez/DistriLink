package com.group5.distributorsystem.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonTypeInfo;



@Entity
@Table(name = "payment_receipts")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
//so far wala koy choice sa discriminator. naa gyud siya sa table niya I cant find a way to extract the value of the discriminator column, so yeah design'2 lang sa ni siya. though gibutang lang kuni arun mas clear siya sa db :>
@DiscriminatorColumn(name = "discriminator_paymenttype", discriminatorType = DiscriminatorType.STRING)
public class PaymentReceipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int receiptid;

    @Column
    private String remarks;

    @Column
    private String paymenttype;

    //It's important to note that @JsonBackReference is typically used for one-to-many or many-to-one relationships where one side of the relationship should be omitted during serialization to avoid circular references. For one-to-one relationships, you might not need @JsonBackReference if you are only serializing one direction of the relationship.
    @OneToOne
    @JoinColumn(name = "paymenttransactionid")
    @JsonManagedReference("paymentreceipt-paymenttransactions-reference")
    private PaymentTransaction paymenttransaction;

    //comment sani kay murag nagdala og panganib
   /* @ManyToOne
    @JoinColumn(name = "cashierid")
    @JsonBackReference("employee-paymentreceipts-reference")
    private Employee cashier;*/



    public PaymentReceipt() {
    }

    public PaymentReceipt(int receiptid, String remarks, String paymenttype, PaymentTransaction paymentTransaction /*Employee cashier*/) {
        this.receiptid = receiptid;
        this.remarks = remarks;
        this.paymenttype = paymenttype;
        this.paymenttransaction = paymentTransaction;
        //this.cashier = cashier;
    }

    public int getReceiptid() {
        return receiptid;
    }

    public void setReceiptid(int receiptid) {
        this.receiptid = receiptid;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getPaymenttype() {
        return paymenttype;
    }

    public void setPaymenttype(String paymenttype) {
        this.paymenttype = paymenttype;
    }

    public PaymentTransaction getPaymentTransaction() {
        return paymenttransaction;
    }

    public void setPaymentTransaction(PaymentTransaction paymentTransaction) {
        this.paymenttransaction = paymentTransaction;
    }

   /* public Employee getCashier() {
        return cashier;
    }

    public void setCashier(Employee cashier) {
        this.cashier = cashier;
    }
*/

}
