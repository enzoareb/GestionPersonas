package com.gestion.servicio;

import com.gestion.dto.UsuarioDto;
import com.gestion.models.Usuario;

import java.util.List;

public interface UsuarioServicio {

    Usuario save(UsuarioDto usuarioDto);


    List<Usuario> getUsuarios();

    Usuario getPerfil(String email);

    void eliminarUsuario(Long id);

    boolean verificarUsuarioPorCredenciales(UsuarioDto usuarioDto);

    boolean editPassword(UsuarioDto usuarioDto);

    boolean editUsuario(UsuarioDto usuarioDto, String email);
}
