package com.example.demo.services;
import com.example.demo.entities.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//codigo de negocio
@Service
public class EmployeeService implements IEmployeeService {
    @Autowired
    private EmployeeRepository repository;

    @Override
    public List<Employee> getEmployeesList() {
        return (List<Employee>) repository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return (Employee) repository.findById(id).get();
    }

    @Override
    public void removeEmployee(long id) {
        repository.deleteById(id);
    }

    @Override
    public void saveEmployee(Employee employee) {
        repository.save(employee);
    }

}
