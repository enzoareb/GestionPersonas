package com.gestion.controllers;


import com.gestion.dto.UsuarioDto;
import com.gestion.models.Usuario;

import com.gestion.servicio.UsuarioServicio;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioServicio usuarioServicio;

    @RequestMapping(value = "api/usuarios",method = RequestMethod.GET)
    public List<Usuario> getUsuarios(){
        return usuarioServicio.getUsuarios();
    }

    @RequestMapping(value = "api/perfil/{email}",method = RequestMethod.GET)
    public Usuario getPerfil(@PathVariable String email){
        return usuarioServicio.getPerfil(email);
    }

    @RequestMapping(value = "api/usuarios/{id}",method = RequestMethod.DELETE)
    public void eliminarUsuario(@PathVariable Long id){
        usuarioServicio.eliminarUsuario(id);
    }

    @RequestMapping(value = "api/usuario",method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody UsuarioDto usuarioDto){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1,usuarioDto.getPassword());
        usuarioDto.setPassword(hash);
        usuarioServicio.save(usuarioDto);
    }

    @RequestMapping(value = "api/password",method = RequestMethod.POST)
    public boolean restablecerPassword(@RequestBody UsuarioDto usuarioDto){
       return usuarioServicio.editPassword(usuarioDto);
    }

    @RequestMapping(value = "api/editUsuario/{email}",method = RequestMethod.POST)
    public boolean editUsuario(@RequestBody UsuarioDto usuarioDto,@PathVariable String email){
        return usuarioServicio.editUsuario(usuarioDto,email);
    }

    @RequestMapping(value = "api/login",method = RequestMethod.POST)
    public String login(@RequestBody UsuarioDto usuarioDto){
        if (usuarioServicio.verificarUsuarioPorCredenciales(usuarioDto)){
            return "OK";
        }
        return "FAIL";
    }

}
