package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.DealerDocument;
import com.group5.distributorsystem.models.Distributor;
import com.group5.distributorsystem.repositories.DealerDocumentRepository;
import com.group5.distributorsystem.repositories.DealerRepository;
import com.group5.distributorsystem.repositories.DistributorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class DealerService {

    @Autowired
    DealerRepository dealerRepository;

    @Autowired
    DealerDocumentRepository dealerDocumentRepository;

    @Autowired
    DistributorRepository distributorRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Dealer registerDealer(Dealer dealer, List<String> documentIds, List<String> documentNames, List<String> documentTypes, List<MultipartFile> documentContents) {


        Dealer updatedDealer = dealerRepository.save(dealer);

        Distributor distributor = distributorRepository.findById(dealer.getDistributor().getDistributorid()).get();

        for (int i = 0; i < documentIds.size(); i++) {
            DealerDocument document = new DealerDocument();
            document.setDocumentid(documentIds.get(i));
            document.setName(documentNames.get(i));
            document.setType(documentTypes.get(i));
            document.setDealer(updatedDealer);
            try {
                document.setContent(documentContents.get(i).getBytes());
            } catch (IOException e) {
                // Handle the exception (e.g., log an error).
                System.err.println("Error reading file bytes for attachment: " + document.getName());
                e.printStackTrace();
                continue;
            }
            updatedDealer.getDocumentids().add(document.getDocumentid());
            dealerDocumentRepository.save(document);

        }

        updatedDealer.setDistributor(distributor);
        distributor.getDealerids().add(updatedDealer.getDealerid());
        distributorRepository.save(distributor);

        return dealerRepository.save(updatedDealer);
    }

    public List<Dealer> getAllDealers(){
        return dealerRepository.findAll();
    }

   /* public List<Dealer> getAllDealers(){
        // Define a query with projection to exclude the 'password' field
        *//*Query query = new Query();
        query.fields().exclude("password", "distributor.dealerids", "distributor.orderids", "distributor.employeeids");

        // Execute the query and convert the result into a List of Dealer objects

        return mongoTemplate.find(query, Dealer.class);*//*

        Aggregation aggregation = Aggregation.newAggregation(

                Aggregation.project().andExclude("password", "distributor.dealerids", "distributor.orderids", "distributor.employeeids"),// Match the document by ID
                Aggregation.limit(1) // Limit the result to one document
        );

       return mongoTemplate.aggregate(aggregation, "Dealers", Dealer.class).getMappedResults();

    }*/



    public Dealer getDealerByID(String dealerid){
        return dealerRepository.findById(dealerid).get();
    }

    /*public Dealer getDealerByID(String dealerid){

        // Create a query to find a dealer by ID and exclude the "password" field
        Query query = new Query(Criteria.where("_id").is(dealerid));
        query.fields().exclude("password");

        // Use the query to find the dealer in the database
        return mongoTemplate.findOne(query, Dealer.class);


    }*/

    public Dealer findByDealeridAndPassword(String dealerid, String password){
        return dealerRepository.findByDealeridAndPassword(dealerid, password);
    }

    public double getDealerCreditLimit(String dealerId) {
        Optional<Dealer> optionalDealer = dealerRepository.findById(dealerId);
        if (optionalDealer.isPresent()) {
            return optionalDealer.get().getCreditlimit();
        }
        return 0.0; // Return a default value or handle the case where the dealer doesn't exist.
    }

    public void updateDealerCreditLimit(String dealerId, double newCreditLimit) {
        Optional<Dealer> optionalDealer = dealerRepository.findById(dealerId);
        if (optionalDealer.isPresent()) {
            Dealer dealer = optionalDealer.get();
            dealer.setCreditlimit(newCreditLimit);
            dealerRepository.save(dealer);
        } else {
            // Handle the case where the dealer doesn't exist.
        }
    }

    public void updateDealerDetails(String dealerId, Dealer updatedDealer) {
        Optional<Dealer> optionalDealer = dealerRepository.findById(dealerId);

        if (optionalDealer.isPresent()) {
            Dealer existingDealer = optionalDealer.get();

            // Update the fields you want
            existingDealer.setRemarks(updatedDealer.getRemarks());
            existingDealer.setConfirmed(updatedDealer.getConfirmed());

            // Save the updated Dealer back to the database
            dealerRepository.save(existingDealer);
        }
    }

    public List<Dealer> getAllUnconfirmedDealers() {
        return dealerRepository.findByIsconfirmedFalse();
    }

}
