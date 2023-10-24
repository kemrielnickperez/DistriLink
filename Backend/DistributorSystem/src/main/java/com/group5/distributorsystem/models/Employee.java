package com.group5.distributorsystem.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Document("Employees")
public class Employee {

    @Id
    private String employeeid;

    private String firstname;

    private String middlename;

    private String lastname;

    private String emailaddress;

    private String password;

    private String birthdate;

    private String gender;

    private String currentaddress;

    private String permanentaddress;

    private String contactnumber;

    private String tinnumber;

    private boolean is_cashier;

    private boolean is_salesassociate;

    private boolean is_collector;

    private LocalDate submissiondate;

    private Set<String> orderids = new HashSet<>();

    private Set<String> paymentreceiptids;

    private Set<String> collectionpaymentids;

    private Set<String> documentids = new HashSet<>();


    public Employee() {
    }

    public Employee(String employeeid, String firstname, String middlename, String lastname, String emailaddress, String password, String birthdate, String gender, String currentaddress, String permanentaddress, String contactnumber, String tinnumber, boolean is_cashier, boolean is_salesassociate, boolean is_collector, LocalDate submissiondate, Set<String> orderid, Set<String> paymentreceiptids, Set<String> collectionpaymentids, Set<String> documentids) {
        this.employeeid = employeeid;
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
        this.emailaddress = emailaddress;
        this.password = password;
        this.birthdate = birthdate;
        this.gender = gender;
        this.currentaddress = currentaddress;
        this.permanentaddress = permanentaddress;
        this.contactnumber = contactnumber;
        this.tinnumber = tinnumber;
        this.is_cashier = is_cashier;
        this.is_salesassociate = is_salesassociate;
        this.is_collector = is_collector;
        this.submissiondate = submissiondate;
        this.orderids = orderid;
        this.paymentreceiptids = paymentreceiptids;
        this.collectionpaymentids = collectionpaymentids;
        this.documentids = documentids;
    }

    public String getEmployeeid() {
        return employeeid;
    }

    public void setEmployeeid(String employeeid) {
        this.employeeid = employeeid;
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

    public String getEmailaddress() {
        return emailaddress;
    }

    public void setEmailaddress(String emailaddress) {
        this.emailaddress = emailaddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getTinnumber() {
        return tinnumber;
    }

    public void setTinnumber(String tinnumber) {
        this.tinnumber = tinnumber;
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

    public LocalDate getSubmissiondate() {
        return submissiondate;
    }

    public void setSubmissiondate(LocalDate submissiondate) {
        this.submissiondate = submissiondate;
    }

    public Set<String> getOrderids() {
        return orderids;
    }

    public void setOrderids(Set<String> orderids) {
        this.orderids = orderids;
    }

    public Set<String> getPaymentreceiptids() {
        return paymentreceiptids;
    }

    public void setPaymentreceiptids(Set<String> paymentreceiptids) {
        this.paymentreceiptids = paymentreceiptids;
    }
    
    public Set<String> getCollectionpaymentids() {
        return collectionpaymentids;
    }

    public void setCollectionpaymentids(Set<String> collectionpaymentids) {
        this.collectionpaymentids = collectionpaymentids;
    }

    public Set<String> getDocumentids() {
        return documentids;
    }

    public void setDocumentids(Set<String> documentids) {
        this.documentids = documentids;
    }

}
