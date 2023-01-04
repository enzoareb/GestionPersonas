package com.gestion.gestion.dao;

import com.gestion.gestion.models.Usuario;

import java.util.List;

public interface IusuarioDao {

    List<Usuario> getUsuarios();

    void eliminarUsuario(Long id);

    void registrarUsuario(Usuario usuario);

    Boolean verificarUsuarioPorCredenciales(Usuario usuario);
}
