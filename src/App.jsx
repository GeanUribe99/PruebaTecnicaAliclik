import { useEffect, useState } from "react";
import { Formulario } from "./componentes/formulario.jsx";
import { ListUsuarios } from "./componentes/ListUsuarios.jsx";
import { Button } from "./componentes/ui/Buton.js";
import { obtenerUsuarios,eliminarUsuarioPorId } from "./services/usuarioservice.js";
import {Modal} from "./componentes/ui/Modal";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);


  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then(async (data) => {
        const detalles = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setPokemons(detalles);
      });

    const users = obtenerUsuarios();
    setUsuarios(users);
  }, []);


  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);
  };


  const handleMostrarFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const eliminarUsuario = (id) => {
    eliminarUsuarioPorId(id);
    const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
    setUsuarios(nuevosUsuarios);
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
