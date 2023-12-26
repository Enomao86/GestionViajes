// IngresarPasajeros/page.jsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const IngresarPasajeros = () => {
  const router = typeof window !== "undefined" ? useRouter() : null;
  const { viaje: viajeNombre } = router || { query: {} };

  const [nuevoPasajero, setNuevoPasajero] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
  });

  const [pasajeros, setPasajeros] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (viajeNombre) {
      cargarPasajeros();
    }
  }, [viajeNombre]);

  const cargarPasajeros = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/pasajeros?viaje=${encodeURIComponent(
          viajeNombre
        )}`
      );
      setPasajeros(response.data);
    } catch (error) {
      console.error("Error al cargar pasajeros:", error);
    }
  };

  const agregarPasajero = async () => {
    try {
      await axios.post("http://localhost:3001/pasajeros", {
        ...nuevoPasajero,
        viaje: viajeNombre,
      });

      cargarPasajeros();

      // Limpiamos los campos del nuevo pasajero
      setNuevoPasajero({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
      });

      setError(null); // Reiniciamos el estado de error
    } catch (error) {
      console.error("Error al agregar pasajero:", error);
      setError("Error al agregar pasajero. Verifica los datos.");
    }
  };

  const eliminarPasajero = async (pasajeroId) => {
    try {
      await axios.delete(`http://localhost:3001/pasajeros/${pasajeroId}`);
      cargarPasajeros();
    } catch (error) {
      console.error("Error al eliminar pasajero:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPasajero((prevPasajero) => ({
      ...prevPasajero,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Ingresar Pasajeros - Viaje: {viajeNombre}</h2>

      {/* Formulario para ingresar pasajeros */}
      <div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nuevoPasajero.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={nuevoPasajero.apellido}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>DNI:</label>
          <input
            type="text"
            name="dni"
            value={nuevoPasajero.dni}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={nuevoPasajero.telefono}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={agregarPasajero}>Agregar Pasajero</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {/* Lista de pasajeros */}
      <ul>
        {pasajeros.map((pasajero) => (
          <li key={pasajero.id}>
            {pasajero.nombre} {pasajero.apellido} - DNI: {pasajero.dni} -
            Teléfono: {pasajero.telefono}
            <button onClick={() => eliminarPasajero(pasajero.id)}>
              Eliminar
            </button>
            {/* Agregar botón para modificar */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngresarPasajeros;
