import { useState, useEffect } from "react";
import {
  obtenerUsuarios,
  eliminarUsuarioPorId,
  editarUsuarioPorId,
} from "../services/usuarioservice";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  useEffect(() => {
    const cargarUsuarios = () => {
      const data = obtenerUsuarios();
      setUsuarios(data);
    };
    cargarUsuarios();
  }, []);

  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios((prev) => [...prev, nuevoUsuario]);
    cerrarFormulario();
  };

  const eliminarUsuario = (id) => {
    eliminarUsuarioPorId(id);
    setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
  };

  const editarUsuario = (usuario) => {
    setUsuarioEditar(usuario);
    setMostrarFormulario(true);
  };

  const actualizarUsuario = (usuarioActualizado) => {
    editarUsuarioPorId(usuarioActualizado);
    setUsuarios((prev) =>
      prev.map((usuario) =>
        usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario
      )
    );
    cerrarFormulario();
  };

  const toggleFormulario = () => {
    setMostrarFormulario((prev) => !prev);
    if (usuarioEditar) setUsuarioEditar(null);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setUsuarioEditar(null);
  };

  return {
    usuarios,
    mostrarFormulario,
    usuarioEditar,
    agregarUsuario,
    eliminarUsuario,
    editarUsuario,
    actualizarUsuario,
    toggleFormulario,
    cerrarFormulario,
  };
}
