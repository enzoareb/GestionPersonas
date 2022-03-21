package com.example.demo.controllers;
import com.example.demo.entities.Employee;
import com.example.demo.services.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import java.util.List;

//punto de entrada
@RestController
public class EmployeeController {

    @Autowired
    private IEmployeeService service;

    @GetMapping("/api/employees")
    public List<Employee> getEmployeesList(){
        return service.getEmployeesList();
    }

    @GetMapping("/api/employees/{id}")
    public Employee getEmployeeById(@PathVariable String id){
        return service.getEmployeeById(Long.parseLong(id));
    }

    @DeleteMapping("/api/employees/{id}")
    public void removeEmployee(@PathVariable String id){
        service.removeEmployee(Long.parseLong(id));
    }

    @PostMapping("/api/employees")
    public void saveEmployee(@RequestBody Employee employee){
        service.saveEmployee(employee);
    }

}