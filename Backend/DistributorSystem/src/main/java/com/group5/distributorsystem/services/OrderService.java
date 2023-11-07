package com.group5.distributorsystem.services;

import com.group5.distributorsystem.models.*;
import com.group5.distributorsystem.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
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

    @Autowired
    DistributorRepository distributorRepository;

    public Order createOrder(Order order) {

        Order newOrder =  orderRepository.save(order);

        double orderamount = 0;


        Dealer dealer = dealerRepository.findById(order.getDealer().getDealerid()).get();


        Distributor distributor = distributorRepository.findById(dealer.getDistributor().getDistributorid()).get();

        Set<OrderedProduct> newOrderedProducts = order.getOrderedproducts();
        Set<OrderedProduct> savedOrderedProducts = new HashSet<>();

        for(OrderedProduct op :newOrderedProducts) {
            String productid = op.getProduct().getProductid();
            int quantity = op.getQuantity();


            Product product = productRepository.findById(productid).get();


            if(product != null) {
                float price = product.getPrice();
                double subtotal = price * quantity;

                OrderedProduct newOrderedProduct = new OrderedProduct(op.getOrderedproductid(), quantity, op.getSubtotal(), product, newOrder.getOrderid());

                newOrderedProduct = orderedProductRepository.save(newOrderedProduct);

                savedOrderedProducts.add(newOrderedProduct);

                orderamount += subtotal;

                newOrderedProduct.setProduct(product);
                product.getOrderedproductids().add(newOrderedProduct.getOrderedproductid());
                productRepository.save(product);
                orderedProductRepository.save(newOrderedProduct);



            }
        }
        newOrder.setOrderedproducts(savedOrderedProducts);
        newOrder.setOrderamount(orderamount);

        //connection to dealer
        //dealer.setDistributor(distributor);
        dealer.getOrderids().add(newOrder.getOrderid());
        dealerRepository.save(dealer);

        newOrder.setDistributor(distributor);
        distributor.getOrderids().add(newOrder.getOrderid());
        distributorRepository.save(distributor);

        return orderRepository.save(newOrder);
    }


    public List<Order> getAllOrders(){
        return orderRepository.findAll();

    }

    public Optional<Order> getOrderByID(String orderid){
        return orderRepository.findById(orderid);
    }


    /*public ResponseEntity assignCollector(String orderid, Employee collector) {
        Order order = orderRepository.findById(orderid).get();
        Employee employee = employeeRepository.findById(collector.getEmployeeid()).get();

        if (order.getCollector() == null) {
            order.setCollector(employee);
        }else{
            Employee prevEmployee = order.getCollector();
            prevEmployee.getOrders().remove(order);
            employeeRepository.save(prevEmployee);
            order.setCollector(employee);
        }


        employee.getOrders().add(order);

        orderRepository.save(order);
        employeeRepository.save(employee);

        return new ResponseEntity("Collector assigned successfully", HttpStatus.OK);
    }
*/

    public ResponseEntity assignCollector(String[] orderids, String collectorid) {
        Employee employee = employeeRepository.findById(collectorid).get();


        for (String orderId : orderids) {
            Order order = orderRepository.findById(orderId).get();

            if (order != null) {
                if (order.getCollector() != null) {
                    Employee prevEmployee = order.getCollector();
                    prevEmployee.getOrderids().remove(order.getOrderid());
                    employeeRepository.save(prevEmployee);
                }


                order.setCollector(employee);
                orderRepository.save(order);


                employee.getOrderids().add(order.getOrderid());
            }
        }

        employeeRepository.save(employee);
        return new ResponseEntity("Collector assigned successfully", HttpStatus.OK);
    }




    public ResponseEntity removeCollector(String orderid) {

        Order order = orderRepository.findById(orderid).get();


        Employee employee = employeeRepository.findById(order.getCollector().getEmployeeid()).get();
        employee.getOrderids().remove(orderid);
        employeeRepository.save(employee);

        order.setCollector(null);
        orderRepository.save(order);

        return new ResponseEntity("Collector removed successfully", HttpStatus.OK);
    }
    public ResponseEntity updateOrder(String orderId, Order updatedOrder) {
        Order optionalOrder = orderRepository.findById(orderId).get();

        if (optionalOrder != null) {

            // Update order details from the updatedOrder object
            optionalOrder.setPenaltyrate(updatedOrder.getPenaltyrate());
            optionalOrder.setDistributiondate(updatedOrder.getDistributiondate());
            optionalOrder.setPaymentterms(updatedOrder.getPaymentterms());
            optionalOrder.setOrderedproducts(updatedOrder.getOrderedproducts());
            optionalOrder.setOrderamount(updatedOrder.getOrderamount());
            optionalOrder.setConfirmed(updatedOrder.getConfirmed());
            optionalOrder.setIsclosed(updatedOrder.isIsclosed());
            for (OrderedProduct op: updatedOrder.getOrderedproducts()){
                op.setOrderid(updatedOrder.getOrderid());
            }

            // You can add more fields to update as needed

            // Save the updated order to the repository
            orderRepository.save(optionalOrder);


            return new ResponseEntity<>("Order updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity updateOrderClosedStatus(String orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            boolean allPaymentsPaid = true;

            for (PaymentTransaction transaction : order.getPaymenttransactions()) {
                if (!transaction.isPaid()) {
                    allPaymentsPaid = false;
                    break; // Exit the loop as soon as you find an unpaid transaction
                }
            }

            order.setIsclosed(allPaymentsPaid);
            orderRepository.save(order);

            return new ResponseEntity<>("Order closed status updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }
    }

    public List<Order> getAllUnconfirmedOrders() {
        return orderRepository.findByIsconfirmedFalse();
    }

}


