package com.example.demo.repository;

import com.example.demo.entities.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

//logica de base de datos
@Repository
public interface CustomerRepository extends CrudRepository<Customer,Long> {
    //tipo de dato y tipo de identificador

}
