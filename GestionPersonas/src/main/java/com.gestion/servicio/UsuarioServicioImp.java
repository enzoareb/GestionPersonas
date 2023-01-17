package com.gestion.servicio;

import com.gestion.dto.UsuarioDto;
import com.gestion.models.Usuario;
import com.gestion.repository.UsuarioRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicioImp  implements UsuarioServicio{

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario save(UsuarioDto usuarioDto) {
        Usuario usuario = new Usuario(usuarioDto.getNombre(),usuarioDto.getApellido(),usuarioDto.getEmail(),usuarioDto.getTelefono(),usuarioDto.getPassword());
        return usuarioRepository.save(usuario);
    }

    @Override
    public List<Usuario> getUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario getPerfil(String email) {

        Usuario usuario= usuarioRepository.findByEmail(email);
        if (usuario==null){
            return new Usuario(0,"-","-","-","-","-");
        }
        return usuario;
    }

    @Override
    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public boolean verificarUsuarioPorCredenciales(UsuarioDto usuarioDto) {

        Usuario usuario= usuarioRepository.findByEmail(usuarioDto.getEmail());
        if (usuario == null)
            return false;
        String passwordHashed= usuario.getPassword();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

        return argon2.verify(passwordHashed,usuarioDto.getPassword());
    }

    @Override
    public boolean editPassword(UsuarioDto usuarioDto) {
        Usuario usuario= usuarioRepository.findByEmail(usuarioDto.getEmail());
        if (usuario==null)
            return false;
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1,usuarioDto.getPassword());
        usuario.setPassword(hash);
        usuarioRepository.save(usuario);
        return true;
    }

    @Override
    public boolean editUsuario(UsuarioDto usuarioDto, String email) {
        Usuario usuario= usuarioRepository.findByEmail(email);
        usuario.setId(usuarioDto.getId());
        usuario.setNombre(usuarioDto.getNombre());
        usuario.setApellido(usuarioDto.getApellido());
        usuario.setEmail(usuarioDto.getEmail());
        usuario.setTelefono(usuario.getTelefono());
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1,usuarioDto.getPassword());
        usuario.setPassword(hash);
        usuarioRepository.save(usuario);
        return false;
    }

}
