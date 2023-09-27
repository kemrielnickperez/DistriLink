package com.group5.distributorsystem.services;

import com.group5.distributorsystem.models.*;
import com.group5.distributorsystem.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderedProductService orderedProductService;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderedProductRepository orderedProductRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    DealerRepository dealerRepository;

    public Order createOrder(Order order) {
        Order newOrder =  orderRepository.save(order);

        double orderamount = 0;

        Dealer dealer = dealerRepository.findById(order.getDealer().getDealerid()).get();

        Set<OrderedProduct> newOrderedProducts = order.getOrderedproducts();

        for(OrderedProduct op :newOrderedProducts) {
            String productid = op.getProduct().getProductid();
            int quantity = op.getQuantity();


            Product product = productRepository.findById(productid).get();

            if(product != null) {
                float price = product.getPrice();
                double subtotal = price * quantity;

                OrderedProduct newOrderedProduct = new OrderedProduct(op.getOrderedproductid(), quantity, subtotal, product, newOrder.getOrderid());
                newOrderedProduct = orderedProductRepository.save(newOrderedProduct);

                orderamount += subtotal;

                product.getOrderedproductids().add(newOrderedProduct.getOrderedproductid());
                productRepository.save(product);



            }
        }
        newOrder.setOrderamount(orderamount);

        //connection to dealer

        dealer.getOrderids().add(newOrder.getOrderid());
        dealerRepository.save(dealer);

        return orderRepository.save(newOrder);
    }


    public List<Order> getAllOrders(){
        return orderRepository.findAll();

    }

    public Optional<Order> getOrderByID(String orderid){
        return orderRepository.findById(orderid);
    }

    public ResponseEntity assignCollector(String orderid, Employee collector){

        Order order = orderRepository.findById(orderid).get();
        order.setCollector(collector);
        orderRepository.save(order);

        Employee employee = employeeRepository.findById(order.getCollector().getEmployeeid()).get();
        employee.getOrderids().add(order.getOrderid());
        employeeRepository.save(employee);


        return new ResponseEntity("Collector assigned successfully", HttpStatus.OK);
    }

    public ResponseEntity removeCollector(String orderid){

        Order order = orderRepository.findById(orderid).get();

        Employee employee = employeeRepository.findById(order.getCollector().getEmployeeid()).get();
        employee.getOrderids().remove(order.getOrderid());
        employeeRepository.save(employee);


        order.setCollector(null);
        orderRepository.save(order);



        return new ResponseEntity("Collector removed successfully", HttpStatus.OK);

    }

}


