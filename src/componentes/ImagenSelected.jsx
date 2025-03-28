import { useState } from "react";
import "../estilos/formulario.css"

export function ImageSelect({ listPokemones, onSelect }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (pokemon) => {
    setSelected(pokemon);
    setOpen(false);
    if (onSelect)
      onSelect({
        id: pokemon.id,
        imagen: pokemon.sprites.other.home.front_default,
      });
  };

  return (
    <div className="mb-3 position-relative">
      <div
        className="form-control d-flex align-items-center justify-content-between"
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        {selected ? (
          <div className="d-flex align-items-center gap-2">
            <img
              src={selected.sprites.other.home.front_default}
              alt={selected.name}
              width="40"
              height="40"
            />
            <span>{selected.name}</span>
          </div>
        ) : (
          <span className="text-muted">Selecciona un Pokémon</span>
        )}
        <i className={`bi ${open ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
      </div>

      {open && (
        <div
          className="position-absolute bg-white border rounded shadow-sm p-2 mt-1 w-100"
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 999,
          }}
        >
          {listPokemones.map((pokemon) => (
            <div
              key={pokemon.id}
              className="d-flex align-items-center gap-2 mb-2 p-1 rounded hover-effect"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(pokemon)}
            >
              <img
                src={pokemon.sprites.other.home.front_default}
                alt={pokemon.name}
                width="40"
                height="40"
              />
              <span>{pokemon.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
