package com.example.demo.services;

import com.example.demo.entities.Customer;

import java.util.List;
import java.util.Optional;

public interface ICustomerService {

    List<Customer> getCustomersList();

    Customer getCustomerById(Long id);

    void removeCustomer(long id);

    void saveCustomer(Customer customer);
}
