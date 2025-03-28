import { Button } from "./ui/Buton";
import { Table } from "./ui/Table";

export function ListUsuarios({ listUsuarios, onEliminar }) {
  console.log(listUsuarios)
  return (
    <>
      <h2 className="my-3">Usuarios Registrados</h2>
      {listUsuarios.length === 0 ? (
        <h5>No hay usuarios registrados.</h5>
      ) : (
        <Table headers={["#", "Imagen", "Nombre", "Apellido", "Teléfono", "Acciones"]}>
          {listUsuarios.map((usuario, index) => (
            <tr key={index}>
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
              <td>
                <Button className="btn btn-sm btn-warning me-2">
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
