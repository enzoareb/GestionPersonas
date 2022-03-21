package com.example.demo.controllers;

import com.example.demo.entities.Customer;

import com.example.demo.services.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import java.util.List;

//punto de entrada
@RestController
public class CustomerController {

    @Autowired
    private ICustomerService service;

    @GetMapping("/api/customers")
    public List<Customer> getCustomersList(){
        return service.getCustomersList();
    }

    @GetMapping("/api/customers/{id}")
    public Customer getCustomerById(@PathVariable String id){
        return service.getCustomerById(Long.parseLong(id));
    }

    @DeleteMapping("/api/customers/{id}")
    public void removeCustomer(@PathVariable String id){
        service.removeCustomer(Long.parseLong(id));
    }

    @PostMapping("/api/customers")
    public void saveCustomer(@RequestBody Customer customer){
        service.saveCustomer(customer);
    }

}
