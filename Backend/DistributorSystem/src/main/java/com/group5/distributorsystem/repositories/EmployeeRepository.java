package com.group5.distributorsystem.repositories;

import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.Employee;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.Set;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {

    Optional<Employee> findById(String id);

    Employee findByEmployeeidAndPassword(String employeeid, String password);
}
