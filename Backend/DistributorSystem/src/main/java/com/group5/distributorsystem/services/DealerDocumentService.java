package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.DealerDocument;
import com.group5.distributorsystem.repositories.DealerDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class DealerDocumentService {

    @Autowired
    DealerDocumentRepository dealerDocumentRepository;

    public DealerDocument createDealerDocument(String documentid, String name, String type, MultipartFile content, String dealer){
        DealerDocument document = new DealerDocument();
        /*document.setDocumentid(documentid);
        document.setName(name);
        document.setType(type);
        document.setDealer(dealer);
        try {
            document.setContent(content.getBytes());
        } catch (IOException e) {
            System.err.println("Error reading file bytes for attachment: " + document.getName());
            e.printStackTrace();

        }*/

        return dealerDocumentRepository.save(document);
    }

    public Iterable<DealerDocument> findAllDocumentsByDealerId(String dealerid){
        return dealerDocumentRepository.findByDealer_Dealerid(dealerid);
    }
}
