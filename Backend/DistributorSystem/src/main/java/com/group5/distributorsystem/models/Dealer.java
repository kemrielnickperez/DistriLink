package com.group5.distributorsystem.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Document("Dealers")
public class Dealer {

    @Id
    private String dealerid;

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

    private boolean hasbusiness;

    private String businessname;

    private String businessaddress;

    private String businessphone;

    private String businesstin;

    private double creditlimit;

    private LocalDate submissiondate;

    private Set<String> orderids = new HashSet<>();;

    private Set<String> documentids = new HashSet<>();

    public Dealer() {
    }


    public Dealer(String dealerid, String firstname, String middlename, String lastname, String emailaddress, String password, LocalDate birthdate, String gender, String currentaddress, String permanentaddress, String contactnumber, boolean hasbusiness, String businessname, String businessaddress, String businessphone, String businesstin, double creditlimit, LocalDate submissiondate, Set<String> orderids, Set<String> documentids) {
        this.dealerid = dealerid;
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
        this.hasbusiness = hasbusiness;
        this.businessname = businessname;
        this.businessaddress = businessaddress;
        this.businessphone = businessphone;
        this.businesstin = businesstin;
        this.creditlimit = creditlimit;
        this.submissiondate = submissiondate;
        this.orderids = orderids;
        this.documentids = documentids;
    }

    public String getDealerid() {
        return dealerid;
    }

    public void setDealerid(String dealerid) {
        this.dealerid = dealerid;
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

    public boolean isHasbusiness() {
        return hasbusiness;
    }

    public void setHasbusiness(boolean hasbusiness) {
        this.hasbusiness = hasbusiness;
    }

    public String getBusinessname() {
        return businessname;
    }

    public void setBusinessname(String businessname) {
        this.businessname = businessname;
    }

    public String getBusinessaddress() {
        return businessaddress;
    }

    public void setBusinessaddress(String businessaddress) {
        this.businessaddress = businessaddress;
    }

    public String getBusinessphone() {
        return businessphone;
    }

    public void setBusinessphone(String businessphone) {
        this.businessphone = businessphone;
    }

    public String getBusinesstin() {
        return businesstin;
    }

    public void setBusinesstin(String businesstin) {
        this.businesstin = businesstin;
    }

    public double getCreditlimit() {
        return creditlimit;
    }

    public void setCreditlimit(double creditlimit) {
        this.creditlimit = creditlimit;
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

    public Set<String> getDocumentids() {
        return documentids;
    }

    public void setDocumentids(Set<String> documentids) {
        this.documentids = documentids;
    }
}