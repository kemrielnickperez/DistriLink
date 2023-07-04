package com.group5.distributorsystem.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productid;

    @Column
    private String name;

    @Column
    private String unit;

    @Column
    private float price;

    @Column
    private float commissionrate;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    //@JsonBackReference // you inform Jackson to handle the serialization appropriately and break the infinite recursion.
    private Set<OrderedProduct> orderedProducts;


    public Product() {
    }

    public Product(int productid, String name, String unit, float price, float commissionrate, Set<OrderedProduct> orderedProducts) {
        this.productid = productid;
        this.name = name;
        this.unit = unit;
        this.price = price;
        this.commissionrate = commissionrate;
        this.orderedProducts = orderedProducts;
    }

    public int getProductid() {
        return productid;
    }

    public void setProductid(int productid) {
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


    public Set<OrderedProduct> getOrderedProducts() {
        return orderedProducts;
    }

    public void setOrderedProducts(Set<OrderedProduct> orderedProducts) {
        this.orderedProducts = orderedProducts;
    }
}
