package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.DealerDocument;
import com.group5.distributorsystem.repositories.DealerDocumentRepository;
import com.group5.distributorsystem.repositories.DealerRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Dealer registerDealer(Dealer dealer, List<String> documentIds, List<String> documentNames, List<String> documentTypes, List<MultipartFile> documentContents) {
        Dealer updatedDealer = dealerRepository.save(dealer);
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
        return dealerRepository.save(updatedDealer);
    }

    public List<Dealer> getAllDealers(){

        return dealerRepository.findAll();
    }

    /*public Optional<Dealer> getDealerByID(int dealerid){
        return dealerRepository.findById(dealerid);
    }*/
    public Optional<Dealer> getDealerByID(String dealerid){

        return dealerRepository.findById(dealerid);
    }

    public Dealer findByDealeridAndPassword(String dealerid, String password){
        return dealerRepository.findByDealeridAndPassword(dealerid, password);
    }
}
