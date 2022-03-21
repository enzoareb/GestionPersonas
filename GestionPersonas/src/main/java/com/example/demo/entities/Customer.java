package com.example.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;

import javax.persistence.*;

@Entity @Table(name = "customers") //nombre de la tabla referencia
@Getter @Setter @ToString @EqualsAndHashCode
public class Customer {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    //otra anotacion
    //@Column(unique = true,nullable = false)
    private Long id;
    private String nombre;
    private String email;
    private String telefono;
    private String direccion;


}
