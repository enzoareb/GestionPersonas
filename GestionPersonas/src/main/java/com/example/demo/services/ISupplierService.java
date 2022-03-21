package com.example.demo.services;
import com.example.demo.entities.Supplier;
import java.util.List;

public interface ISupplierService {

    List<Supplier> getSuppliersList();

    Supplier getSupplierById(Long id);

    void removeSupplier(long id);

    void saveSupplier(Supplier supplier);
}