package com.group5.distributorsystem.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;
import java.time.LocalDate;
import java.util.Date;
import java.util.Set;
@Entity
@Table(name = "dealers")
public class Dealer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dealerid;

    @Column
    private String firstname;

    @Column
    private String middlename;

    @Column
    private String lastname;

    @Column
    private LocalDate birthdate;

    @Column
    private String gender;

    @Column
    private String currentaddress;

    @Column
    private String permanentaddress;

    @Column
    private String contactnumber;

    @Column
    private boolean hasbusiness;

    @Column
    private String businessname;

    @Column
    private String businessaddress;

    @Column
    private String businessphone;

    @Column
    private String businesstin;

    @Column
    private double creditlimit;

    @Column
    private LocalDate submissiondate;

    @Column
    private String attachments;

    @OneToMany(mappedBy = "dealer")
    @JsonIgnore
    private Set<Order> orders;


    public Dealer() {
    }


    public Dealer(int dealerid, String firstname, String middlename, String lastname, LocalDate birthdate, String gender, String currentaddress, String permanentaddress, String contactnumber, boolean hasbusiness, String businessname, String businessaddress, String businessphone, String businesstin, double creditlimit, LocalDate submissiondate, String attachments, Set<Order> orders) {
        this.dealerid = dealerid;
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
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
        this.attachments = attachments;
        this.orders = orders;
    }

    public int getDealerid() {
        return dealerid;
    }

    public void setDealerid(int dealerid) {
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

    public String getBusinessphone() {
        return businessphone;
    }

    public void setBusinessphone(String businessphone) {
        this.businessphone = businessphone;
    }

    public String getBusinessaddress() {
        return businessaddress;
    }

    public void setBusinessaddress(String businessaddress) {
        this.businessaddress = businessaddress;
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

    public String getAttachments() {
        return attachments;
    }

    public void setAttachments(String attachments) {
        this.attachments = attachments;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }
}