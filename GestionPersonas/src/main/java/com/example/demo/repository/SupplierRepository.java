package com.example.demo.repository;
import com.example.demo.entities.Supplier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

//logica de base de datos
@Repository
public interface SupplierRepository extends CrudRepository<Supplier,Long> {


}
