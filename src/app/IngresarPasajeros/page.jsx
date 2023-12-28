// pages/AgregarPasajeros.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AgregarPasajeros = () => {
  const { viajeId } = useParams();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pasajeros, setPasajeros] = useState([]);

  useEffect(() => {
    // Obtener la lista de pasajeros al cargar el componente
    obtenerPasajeros();
  }, [viajeId]);

  const obtenerPasajeros = async () => {
    try {
      console.log("Identificador del viaje:", viajeId);
      const response = await axios.get(
        `http://localhost:4002/pasajeros?viaje=${viajeId}`
      );
      setPasajeros(response.data);
    } catch (error) {
      console.error("Error al obtener pasajeros:", error);
    }
  };

  const agregarPasajero = async () => {
    try {
      const nuevoviajeId = viajeId;
      await axios.post("http://localhost:4002/pasajeros", {
        nombre,
        apellido,
        dni,
        telefono,
        viajeId: nuevoviajeId,
      });

      // Limpiar los campos después de agregar el pasajero
      setNombre("");
      setApellido("");
      setDni("");
      setTelefono("");

      // Actualizar la lista de pasajeros después de agregar uno nuevo
      obtenerPasajeros();
    } catch (error) {
      console.error("Error al agregar pasajero:", error);
    }
  };

  const eliminarPasajero = async (id) => {
    try {
      await axios.delete(`http://localhost:4002/pasajeros/${id}`);
      // Actualizar la lista de pasajeros después de eliminar uno
      obtenerPasajeros();
    } catch (error) {
      console.error("Error al eliminar pasajero:", error);
    }
  };

  return (
    <div>
      <h2>Agregar Pasajero</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label>Apellido:</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <div>
        <label>DNI:</label>
        <input
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <button onClick={agregarPasajero}>Agregar Pasajero</button>

      {/* Mostrar la lista de pasajeros y botones para eliminar */}
      <h2>Pasajeros</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pasajeros.map((pasajero) => (
            <tr key={pasajero.id}>
              <td>{pasajero.nombre}</td>
              <td>{pasajero.apellido}</td>
              <td>{pasajero.dni}</td>
              <td>{pasajero.telefono}</td>
              <td>
                <button onClick={() => eliminarPasajero(pasajero.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgregarPasajeros;
