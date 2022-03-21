package com.example.demo.services;

import com.example.demo.entities.Customer;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//codigo de negocio
@Service
public class CustomerService implements ICustomerService {
    @Autowired // no hace falta instanciar
    private CustomerRepository repository;

    @Override
    public List<Customer> getCustomersList() {
        return (List<Customer>) repository.findAll();
    }

    @Override
    public Customer getCustomerById(Long id) {
        return (Customer) repository.findById(id).get();
    }

    @Override
    public void removeCustomer(long id) {
        repository.deleteById(id);
    }

    @Override
    public void saveCustomer(Customer customer) {
        repository.save(customer);
    }

}
