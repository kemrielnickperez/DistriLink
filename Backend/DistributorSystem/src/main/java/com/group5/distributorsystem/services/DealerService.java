package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.ArchivedDealer;
import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.DealerDocument;
import com.group5.distributorsystem.models.Distributor;
import com.group5.distributorsystem.repositories.ArchivedDealerRepository;
import com.group5.distributorsystem.repositories.DealerDocumentRepository;
import com.group5.distributorsystem.repositories.DealerRepository;
import com.group5.distributorsystem.repositories.DistributorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DealerService {

    @Autowired
    DealerRepository dealerRepository;

    @Autowired
    DealerDocumentRepository dealerDocumentRepository;

    @Autowired
    DealerEmailService dealerEmailService;

    @Autowired
    DistributorRepository distributorRepository;

    @Autowired
    ArchivedDealerRepository archivedDealerRepository;

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

    public List<Dealer> getAllUnconfirmedDealers() {
        return dealerRepository.findByIsconfirmedFalse();
    }

    public void updateDealerConfirmation(String dealerId, Double creditlimit) {
        Optional<Dealer> optionalDealer = dealerRepository.findById(dealerId);
        // Get the dealer's information
        if (optionalDealer.isPresent()) {
            Dealer existingDealer = optionalDealer.get();
            String subject = "Dealer Information";
            String content =
                    "Dealer Name: " + existingDealer.getFirstname() + " " + existingDealer.getMiddlename() + " " + existingDealer.getLastname() + "\n" +
                            "Dealer ID: " + existingDealer.getDealerid() + "\n" +
                            "Password: " + existingDealer.getPassword() + "\n" +
                            "Your Credit Limit: " + creditlimit + "\n" +
                            "Your dealer account has been confirmed. Thank you for registering.";

            // Use the EmailService to send the email using the dealer's email address
            dealerEmailService.sendConfirmEmail(existingDealer, subject, content);


            existingDealer.setConfirmed(true);
            existingDealer.setRemarks("Confirmed");
            existingDealer.setCreditlimit(creditlimit);
            // Save the updated "confirmed" property back to the database
            dealerRepository.save(existingDealer);
        }
        }

    public void updateDealerPending(String dealerId,  String remarks) {
        Dealer optionalDealer = dealerRepository.findById(dealerId).get();

        // Get the dealer's information

        String subject = "Dealer Account Status Update";
        String content =
                "Dealer Name: " + optionalDealer.getFirstname() +" "+  optionalDealer.getMiddlename() +" "+ optionalDealer.getLastname() + "\n" +
                        "Dealer ID: " + optionalDealer.getDealerid()+ "\n" +
                        "Your dealer account has been marked as pending.\n" +
                        "Reason for Pending: " + remarks;

        // Use the EmailService to send the email using the dealer's email address
        dealerEmailService.sendPendingEmail(optionalDealer, subject, content);


        optionalDealer.setConfirmed(false);
        optionalDealer.setRemarks(remarks);
        // Save the updated "confirmed" property back to the database
        dealerRepository.save(optionalDealer);
    }

    public void updateArchivedDealer(String dealerId, String remarks, LocalDate datearchived){
        Dealer optionalDealer = dealerRepository.findById(dealerId).get();

        String subject = "Dealer Account Status Update";
        String content =
                "Dealer Name: " + optionalDealer.getFirstname() +" "+  optionalDealer.getMiddlename() +" "+ optionalDealer.getLastname() + "\n" +
                        "Dealer ID: " + optionalDealer.getDealerid()+ "\n" +
                        "Your dealer account has been declined.\n" +
                        "Reason for Decline: " + remarks;

        dealerEmailService.sendDeclinedEmail(optionalDealer, subject, content);

        ArchivedDealer archivedDealer = new ArchivedDealer(optionalDealer.getDealerid(), optionalDealer.getFirstname(), optionalDealer.getMiddlename(), optionalDealer.getLastname(), optionalDealer.getEmailaddress(), optionalDealer.getPassword(), optionalDealer.getBirthdate() , optionalDealer.getGender(), optionalDealer.getCurrentaddress(), optionalDealer.getPermanentaddress(), optionalDealer.getContactnumber(), optionalDealer.isHasbusiness(), optionalDealer.getBusinessname(), optionalDealer.getBusinessaddress(), optionalDealer.getBusinessphone(), optionalDealer.getBusinesstin(), optionalDealer.getCreditlimit(), optionalDealer.getSubmissiondate(), optionalDealer.getIsconfirmed(), remarks, optionalDealer.getDistributor(), optionalDealer.getOrderids(), optionalDealer.getDocumentids(), datearchived);

        archivedDealerRepository.save(archivedDealer);
        dealerRepository.delete(optionalDealer);

    }


    }



