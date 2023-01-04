package com.gestion.gestion.dao;

import com.gestion.gestion.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Transactional
@Repository
public class UsuarioDao implements IusuarioDao{
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public List<Usuario> getUsuarios() {
        String query= "FROM Usuario";
        List<Usuario> resultado = entityManager.createQuery(query).getResultList();
        return resultado;
    }

    @Override
    public void eliminarUsuario(Long id) {
        Usuario usuario= entityManager.find(Usuario.class,id);
        entityManager.remove(usuario);
    }

    @Override
    public void registrarUsuario(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public Boolean verificarUsuarioPorCredenciales(Usuario usuario) {
        String query= "FROM Usuario WHERE email = :email";
        List<Usuario> lista = entityManager.createQuery(query)
                .setParameter("email",usuario.getEmail())
                .getResultList();
        if (lista.isEmpty()){
            return false;
        }

        String passwordHashed = lista.get(0).getPassword();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

        return argon2.verify(passwordHashed,usuario.getPassword());
    }
}
