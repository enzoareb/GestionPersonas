package com.example.demo.services;
import com.example.demo.entities.Employee;

import java.util.List;

public interface IEmployeeService {

    List<Employee> getEmployeesList();

    Employee getEmployeeById(Long id);

    void removeEmployee(long id);

    void saveEmployee(Employee employee);
}