// Guardar un nuevo usuario
export const guardarEnLocalStorage = (usuario) => {
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuariosGuardados.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
};

// Obtener usuarios
export const obtenerUsuarios = () => {
  const data = localStorage.getItem("usuarios");
  return data ? JSON.parse(data) : [];
};

// Eliminar usuario por ID
export const eliminarUsuarioPorId = (id) => {
  const usuarios = obtenerUsuarios();
  const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
  localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
};

// Buscar usuario por nombre (opcional)
export const buscarUsuarioPorNombre = (nombre) => {
  const usuarios = obtenerUsuarios();
  return usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
};
