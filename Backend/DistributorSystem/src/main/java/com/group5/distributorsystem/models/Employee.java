package com.group5.distributorsystem.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employeeID;

    @Column
    private String firstname;

    @Column
    private String middlename;

    @Column
    private String lastname;

    @Column
    private String birthdate;

    @Column
    private String gender;

    @Column
    private String currentaddress;

    @Column
    private String permanentaddress;

    @Column
    private String contactnumber;

    @Column
    private boolean is_cashier;

    @Column
    private boolean is_salesassociate;

    @Column
    private boolean is_collector;

    @OneToMany(mappedBy = "collector")
    //@JsonBackReference("order-employee-reference")
    private Set<Order> orders;

    //comment sani kay murag nagdala og panganib
    /*@OneToMany(mappedBy = "cashier")
    @JsonManagedReference("employee-paymentreceipts-reference")
    private Set<PaymentReceipt> paymentReceipts;*/

    @OneToMany(mappedBy = "collector")
    @JsonManagedReference("employee-collectionpaymenttransactions-reference")
    private Set<CollectionPaymentReceipt> collectionPaymentReceipts;

    public Employee() {
    }

    public Employee(int employeeID, String firstname, String middlename, String lastname, String birthdate, String gender, String currentaddress, String permanentaddress, String contactnumber, boolean is_cashier, boolean is_salesassociate, boolean is_collector, Set<Order> orders, /*Set<PaymentReceipt> paymentReceipts,*/ Set<CollectionPaymentReceipt> collectionPaymentReceipts) {
        this.employeeID = employeeID;
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.gender = gender;
        this.currentaddress = currentaddress;
        this.permanentaddress = permanentaddress;
        this.contactnumber = contactnumber;
        this.is_cashier = is_cashier;
        this.is_salesassociate = is_salesassociate;
        this.is_collector = is_collector;
        this.orders = orders;
        //this.paymentReceipts = paymentReceipts;
        this.collectionPaymentReceipts = collectionPaymentReceipts;
    }

    public int getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(int employeeID) {
        this.employeeID = employeeID;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getMiddlename() {
        return middlename;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCurrentaddress() {
        return currentaddress;
    }

    public void setCurrentaddress(String currentaddress) {
        this.currentaddress = currentaddress;
    }

    public String getPermanentaddress() {
        return permanentaddress;
    }

    public void setPermanentaddress(String permanentaddress) {
        this.permanentaddress = permanentaddress;
    }

    public String getContactnumber() {
        return contactnumber;
    }

    public void setContactnumber(String contactnumber) {
        this.contactnumber = contactnumber;
    }

    public boolean isIs_cashier() {
        return is_cashier;
    }

    public void setIs_cashier(boolean is_cashier) {
        this.is_cashier = is_cashier;
    }

    public boolean isIs_salesassociate() {
        return is_salesassociate;
    }

    public void setIs_salesassociate(boolean is_salesassociate) {
        this.is_salesassociate = is_salesassociate;
    }

    public boolean isIs_collector() {
        return is_collector;
    }

    public void setIs_collector(boolean is_collector) {
        this.is_collector = is_collector;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    /*public Set<PaymentReceipt> getPaymentReceipts() {
        return paymentReceipts;
    }

    public void setPaymentReceipts(Set<PaymentReceipt> paymentReceipts) {
        this.paymentReceipts = paymentReceipts;
    }*/

    public Set<CollectionPaymentReceipt> getCollectionPaymentReceipts() {
        return collectionPaymentReceipts;
    }

    public void setCollectionPaymentReceipts(Set<CollectionPaymentReceipt> collectionPaymentReceipts) {
        this.collectionPaymentReceipts = collectionPaymentReceipts;
    }
}
