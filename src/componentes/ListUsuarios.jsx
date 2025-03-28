import { useState,useEffect } from "react";
import { Button } from "./ui/Buton";
import { Table } from "./ui/Table";
import { Input } from "./ui/Input";
import { buscarUsuarioPorNombre } from "../services/usuarioservice";

export function ListUsuarios({ listUsuarios, onEliminar, onEditar }) {

  const [busqueda, setBusqueda] = useState("");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(listUsuarios);

  const handleBuscar = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    if (valor.trim() === "") {
      setUsuariosFiltrados(listUsuarios);
    } else {
      const resultados = buscarUsuarioPorNombre(valor);
      setUsuariosFiltrados(resultados);
    }
  };

  // Si cambia la lista original, actualizar filtrados
  useEffect(() => {
    setUsuariosFiltrados(listUsuarios);
  }, [listUsuarios]);

  return (
    <>
      <h2 className="my-3">Usuarios Registrados</h2>
      <Input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={handleBuscar}
        className="mb-3"
      />

      {usuariosFiltrados.length === 0 ? (
        <h5>No hay usuarios registrados.</h5>
      ) : (
        <Table headers={["#", "Imagen", "Nombre", "Apellido", "Teléfono","Nickname","Correo", "Acciones"]}>
          {usuariosFiltrados.map((usuario, index) => (
            <tr key={usuario.id}>
              <th scope="row">{index + 1}</th>
              <td>
                <img
                  src={usuario.img}
                  alt={`Pokemon de ${usuario.nombre}`}
                  width="50"
                  height="50"
                />
              </td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.nickname}</td>
              <td>{usuario.correo}</td>
              <td>
                <Button className="btn btn-sm btn-warning me-2" onClick={() => onEditar(usuario)}>
                  Editar
                </Button>
                <Button className="btn btn-sm btn-danger" onClick={() => onEliminar(usuario.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
}
