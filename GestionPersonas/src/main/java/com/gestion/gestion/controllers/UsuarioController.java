package com.gestion.gestion.controllers;

import com.gestion.gestion.dao.UsuarioDao;
import com.gestion.gestion.models.Usuario;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UsuarioController {
    @Autowired
    private UsuarioDao usuarioDao;




    @RequestMapping(value = "api/usuarios",method = RequestMethod.GET)
    public List<Usuario> getUsuarios(){
        return usuarioDao.getUsuarios();
    }

    @RequestMapping(value = "api/usuarios/{id}",method = RequestMethod.DELETE)
    public void eliminarUsuario(@PathVariable Long id){
        usuarioDao.eliminarUsuario(id);
    }

    @RequestMapping(value = "api/usuario",method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1,usuario.getPassword());
        usuario.setPassword(hash);
        usuarioDao.registrarUsuario(usuario);
    }

    @RequestMapping(value = "api/login",method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario){

        if (usuarioDao.verificarUsuarioPorCredenciales(usuario)){
            return "OK";
        }
        return "FAIL";
    }

}
