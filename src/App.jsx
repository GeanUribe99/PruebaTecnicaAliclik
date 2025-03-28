import { useEffect, useState } from "react";
import { Formulario } from "./componentes/formulario.jsx";
import { ListUsuarios } from "./componentes/ListUsuarios.jsx";
import { Button } from "./componentes/ui/Buton.js";
import {Modal} from "./componentes/ui/Modal";
import {fetchPokemons} from "./services/pokemonService"
import { useUsuarios } from "./hooks/useUsuario"

function App() {

    const [pokemons, setPokemons] = useState([]);

    /*Destructuracion*/
    const {
      usuarios,
      mostrarFormulario,
      usuarioEditar,
      agregarUsuario,
      eliminarUsuario,
      editarUsuario,
      actualizarUsuario,
      toggleFormulario,
      cerrarFormulario,
    } = useUsuarios();

    useEffect(() => {
      const cargarPokemons = async () => {
        const data = await fetchPokemons();
        setPokemons(data);
      };
      cargarPokemons();
    }, []);
    

  return (
    <main className="container my-4">

      <Button className="btn btn-success mb-3" onClick={toggleFormulario}>
      {mostrarFormulario ? "Cerrar Formulario" : "Crear Nuevo Usuario"}
      </Button>

      <Modal
          title={usuarioEditar ? "Editar Usuario" : "Registrar Nuevo Usuario"}
          show={mostrarFormulario}
          onClose={cerrarFormulario}
      >
        <Formulario
          listPokemones={pokemons}
          onUsuarioCreado={agregarUsuario}
          usuarioEditar={usuarioEditar}
          onUsuarioEditado={actualizarUsuario}
        />
      </Modal>
      <ListUsuarios listUsuarios={usuarios} onEliminar={eliminarUsuario} onEditar={editarUsuario}/>
    </main>
  );
}
export default App;
