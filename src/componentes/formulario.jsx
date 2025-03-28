import "bootstrap/dist/css/bootstrap.min.css";
import {formInicio} from "../constantes/formInicio"
import {validarFormulario} from "../utils/validaciones"
import { guardarEnLocalStorage } from "../services/usuarioservice.js";
import { Usuario } from "../models/Usuario.js";
import { useState,useEffect } from "react";
import { ImageSelect } from "./ImagenSelected";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Buton";
import { Form } from "./ui/Form";

export function Formulario({ listPokemones, onUsuarioCreado , usuarioEditar ,onUsuarioEditado}) {
  
  /*Opciones Dinamicas Para los Buttons*/
  let textButtonFormulario = usuarioEditar ? 'Editar Usuario' : 'Crear Usuario';
  let btnClassName = usuarioEditar ? 'btn btn-secondary' : 'btn btn-primary';

  const [formData, setFormData] = useState(formInicio);

  useEffect(() => {
    if (usuarioEditar) {
      setFormData(usuarioEditar);
    }
  }, [usuarioEditar]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (!validarFormulario(formData)) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (usuarioEditar) {
      onUsuarioEditado(formData);
    } else {
      let nuevoUsuario = new Usuario(
        Date.now(),
        formData.nombre,
        formData.apellido,
        formData.nacimiento,
        formData.telefono,
        formData.pokemonId,
        formData.img
      );
      guardarEnLocalStorage(nuevoUsuario);
      onUsuarioCreado(nuevoUsuario);
      alert("Cuenta guardada");
      setFormData(formInicio);
    }
  };

  const handleSelectPokemon = (pokemonData) => {
    setFormData({
      ...formData,
      pokemonId: pokemonData.id,
      img: pokemonData.imagen,
    });
  };

  return (
    <Form className="container" onSubmit={(e) => e.preventDefault()}>
      <Label htmlFor="nombre">Nombre:</Label>
      <Input
        id="nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Escribe tu nombre"
      />

      <Label htmlFor="apellido">Apellido:</Label>
      <Input
        id="apellido"
        name="apellido"
        type="text"
        value={formData.apellido}
        onChange={handleChange}
        placeholder="Escribe tu apellido"
      />

      <Label htmlFor="nacimiento">Nacimiento:</Label>
      <Input
        id="nacimiento"
        name="nacimiento"
        type="date"
        value={formData.nacimiento}
        onChange={handleChange}
      />

      <Label htmlFor="telefono">Teléfono:</Label>
      <Input
        id="telefono"
        name="telefono"
        type="number"
        step="1"
        value={formData.telefono}
        onChange={handleChange}
        placeholder="999999999"
      />

      <Label>Seleccionar Pokemon</Label>
      <ImageSelect listPokemones={listPokemones} onSelect={handleSelectPokemon} />

      <Button className={btnClassName} onClick={handleClick}>
        {textButtonFormulario}
      </Button>
    </Form>
  );
}
