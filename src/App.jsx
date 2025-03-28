import { useEffect, useState } from "react";
import { Formulario } from "./componentes/formulario.jsx";
import { ListUsuarios } from "./componentes/ListUsuarios.jsx";
import { Button } from "./componentes/ui/Buton.js";
import { obtenerUsuarios,eliminarUsuarioPorId } from "./services/usuarioservice.js";
import {Modal} from "./componentes/ui/Modal";
import {fetchPokemons} from "./services/pokemonService"

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      const listaPokemons = await fetchPokemons();
      setPokemons(listaPokemons);

      const users = obtenerUsuarios();
      setUsuarios(users);
    };

    cargarDatos();
  }, []);


  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);
  };

  const eliminarUsuario = (id) => {
    eliminarUsuarioPorId(id);
    const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
    setUsuarios(nuevosUsuarios);
  };

  /*Abrir Cerra Modal*/ 
  const handleMostrarFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };


  return (
    <main className="container my-4">

      <Button className="btn btn-success mb-3" onClick={handleMostrarFormulario}>
      {mostrarFormulario ? "Cerrar Formulario" : "Crear Nuevo Usuario"}
      </Button>

      <Modal
        title="Registrar Nuevo Usuario"
        show={mostrarFormulario}
        onClose={() => setMostrarFormulario(false)}
      >
        <Formulario
          listPokemones={pokemons}
          onUsuarioCreado={agregarUsuario}
        />
      </Modal>
      <ListUsuarios listUsuarios={usuarios} onEliminar={eliminarUsuario}/>
    </main>
  );
}

export default App;
