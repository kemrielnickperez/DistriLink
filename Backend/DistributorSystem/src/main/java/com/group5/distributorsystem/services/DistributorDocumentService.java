package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.DealerDocument;
import com.group5.distributorsystem.models.DistributorDocument;
import com.group5.distributorsystem.repositories.DealerDocumentRepository;
import com.group5.distributorsystem.repositories.DistributorDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DistributorDocumentService {

    @Autowired
    DistributorDocumentRepository distributorDocumentRepository;

    public DistributorDocument createDistributorDocument(String documentid, String name, String type, MultipartFile content, String dealer){
        DistributorDocument document = new DistributorDocument();
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

        return distributorDocumentRepository.save(document);
    }

}
