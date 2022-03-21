package com.example.demo;

import com.example.demo.entities.Customer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {

		Customer as = new Customer();
		SpringApplication.run(DemoApplication.class, args);
	}

}
