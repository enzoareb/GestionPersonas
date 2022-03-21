package com.example.demo.controllers;
import com.example.demo.entities.Supplier;
import com.example.demo.services.ISupplierService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import java.util.List;

//punto de entrada
@RestController
public class SupplierController {

    @Autowired
    private ISupplierService service;

    @GetMapping("/api/suppliers")
    public List<Supplier> getSuppliersList(){
        return service.getSuppliersList();
    }

    @GetMapping("/api/suppliers/{id}")
    public Supplier getSupplierById(@PathVariable String id){
        return service.getSupplierById(Long.parseLong(id));
    }


    @DeleteMapping("/api/suppliers/{id}")
    public void removeSupplier(@PathVariable String id){
        service.removeSupplier(Long.parseLong(id));
    }

    @PostMapping("/api/suppliers")
    public void saveSupplier(@RequestBody Supplier supplier){
        service.saveSupplier(supplier);
    }

}