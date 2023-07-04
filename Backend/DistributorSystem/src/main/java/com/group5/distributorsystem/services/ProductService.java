package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.Product;
import com.group5.distributorsystem.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public Product createProduct(Product product){
        return productRepository.save(product);
    }

    public Iterable<Product> getAllProducts(){
        return productRepository.findAll();
    }
}
