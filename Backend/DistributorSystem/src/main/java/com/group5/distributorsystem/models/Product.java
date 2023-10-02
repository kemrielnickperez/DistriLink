package com.group5.distributorsystem.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;


@Document("Products")
public class Product {

    @Id
    private String productid;


    private String name;


    private String unit;


    private float price;


    private float commissionrate;

    private Set<String> orderedproductids;

    //private Set<OrderedProduct> orderedProducts;

    /*@OneToMany(mappedBy = "product")
    @JsonIgnore
    //@JsonBackReference // you inform Jackson to handle the serialization appropriately and break the infinite recursion.
    private Set<OrderedProduct> orderedProducts;*/


    public Product() {
    }

    public Product(String productid, String name, String unit, float price, float commissionrate, Set<String> orderedproductids) {
        this.productid = productid;
        this.name = name;
        this.unit = unit;
        this.price = price;
        this.commissionrate = commissionrate;
        this.orderedproductids = orderedproductids;
    }

    public String getProductid() {
        return productid;
    }

    public void setProductid(String productid) {
        this.productid = productid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public float getCommissionrate() {
        return commissionrate;
    }

    public void setCommissionrate(float commissionrate) {
        this.commissionrate = commissionrate;
    }

    public Set<String> getOrderedproductids() {
        return orderedproductids;
    }

    public void setOrderedproductids(Set<String> orderedproductids) {
        this.orderedproductids = orderedproductids;
    }
}
