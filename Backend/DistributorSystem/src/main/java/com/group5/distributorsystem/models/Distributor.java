package com.group5.distributorsystem.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Document("Distributors")
public class Distributor {

    @Id
    private String distributorid;

    private String firstname;

    private String middlename;

    private String lastname;

    private String emailaddress;

    private String password;

    private LocalDate birthdate;

    private String gender;

    private String currentaddress;

    private String permanentaddress;

    private String contactnumber;


    private Set<String> dealerids = new HashSet<>();


    private Set<String> employeeids = new HashSet<>();


    private Set<String> orderids = new HashSet<>();

    private Set<String> paymentreceiptids = new HashSet<>();;

    public Distributor() {
    }

    public Distributor(String distributorid, String firstname, String middlename, String lastname, String emailaddress, String password, LocalDate birthdate, String gender, String currentaddress, String permanentaddress, String contactnumber, Set<String> dealerids, Set<String> employeeids, Set<String> orderids, Set<String> paymentreceiptids) {
        this.distributorid = distributorid;
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
        this.dealerids = dealerids;
        this.employeeids = employeeids;
        this.orderids = orderids;
        this.paymentreceiptids = paymentreceiptids;
    }


    public String getDistributorid() {
        return distributorid;
    }

    public void setDistributorid(String distributorid) {
        this.distributorid = distributorid;
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

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
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

    public Set<String> getDealerids() {
        return dealerids;
    }

    public void setDealerids(Set<String> dealerids) {
        this.dealerids = dealerids;
    }

    public Set<String> getEmployeeids() {
        return employeeids;
    }

    public void setEmployeeids(Set<String> employeeids) {
        this.employeeids = employeeids;
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

    public String getFullName(){
        return firstname + " " + middlename + " " + lastname;
    }


}
