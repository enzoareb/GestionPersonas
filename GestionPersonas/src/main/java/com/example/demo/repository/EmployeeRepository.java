package com.example.demo.repository;
import com.example.demo.entities.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

//logica de base de datos
@Repository
public interface EmployeeRepository extends CrudRepository<Employee,Long> {


}
