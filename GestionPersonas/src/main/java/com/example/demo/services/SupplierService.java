package com.example.demo.services;
import com.example.demo.entities.Supplier;
import com.example.demo.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//codigo de negocio
@Service
public class SupplierService implements ISupplierService {
    @Autowired
    private SupplierRepository repository;

    @Override
    public List<Supplier> getSuppliersList() {

        return (List<Supplier>) repository.findAll();
    }

    @Override
    public Supplier getSupplierById(Long id) {
        return (Supplier) repository.findById(id).get();
    }

    @Override
    public void removeSupplier(long id) {
        repository.deleteById(id);
    }

    @Override
    public void saveSupplier(Supplier supplier) {
        repository.save(supplier);
    }

}
