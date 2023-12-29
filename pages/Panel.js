"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BackgroundAnimation from "../src/app/component/BackgroundAnimation";
import Header from "../src/app/component/Header";
import Link from "next/link";
import Fondo from "../src/app/component/fondo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Panel = () => {
  const [viaje, setViaje] = useState([]);
  const [nuevoViaje, setNuevoViaje] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState(new Date());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedViajeIndex, setSelectedViajeIndex] = useState(null);

  useEffect(() => {
    cargarViaje();
  }, []);

  const cargarViaje = async () => {
    try {
      const response = await axios.get("http://localhost:4000/viaje");
      setViaje(response.data);
    } catch (error) {
      console.error("Error al cargar viaje:", error);
      // ...
    }
  };

  const agregarViaje = async () => {
    if (nuevoViaje.trim() !== "") {
      try {
        await axios.post("http://localhost:4000/viaje", {
          nombre: nuevoViaje,
          fecha: nuevaFecha.toISOString(),
        });

        cargarViaje();

        setNuevoViaje("");
        setNuevaFecha(new Date());
      } catch (error) {
        console.error("Error al agregar viaje:", error);
      }
    }
  };

  const mostrarModalEliminar = (index) => {
    setSelectedViajeIndex(index);
    setShowDeleteModal(true);
  };

  const eliminarViaje = async () => {
    try {
      if (selectedViajeIndex !== null) {
        // Obtener los pasajeros asociados al viaje antes de eliminarlo
        const pasajerosResponse = await axios.get(
          `http://localhost:4000/viaje/${selectedViajeIndex}/pasajeros`
        );

        // Eliminar el viaje
        await axios.delete(`http://localhost:4000/viaje/${selectedViajeIndex}`);

        // Eliminar los pasajeros asociados al viaje
        const pasajerosAEliminar = pasajerosResponse.data.map(
          (pasajero) => pasajero.id
        );

        await Promise.all(
          pasajerosAEliminar.map((pasajeroId) =>
            axios.delete(`http://localhost:4000/pasajeros/${pasajeroId}`)
          )
        );

        setViaje((prevViaje) =>
          prevViaje.filter((viaje) => viaje.id !== selectedViajeIndex)
        );

        setShowDeleteModal(false);
      } else {
        throw new Error("No se ha seleccionado un viaje válido para eliminar");
      }
    } catch (error) {
      console.error("Error al eliminar viaje:", error);

      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      agregarViaje();
    }
  };

  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
  };

  return (
    <div style={{ background: "#f0f0f0", padding: "20px" }}>
      <Header />
      <h2>Panel de Viajes</h2>

      <div>
        <input
          type="text"
          value={nuevoViaje}
          onChange={(e) => setNuevoViaje(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <DatePicker
          selected={nuevaFecha}
          onChange={(date) => setNuevaFecha(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecciona fecha"
        />

        <button onClick={agregarViaje}>Agregar Viaje</button>
      </div>

      <ul className="mt-8">
        {viaje.map((viaje) => (
          <li key={viaje.id} className="mt-4 ml-9 ">
            {viaje.nombre}- {formatFecha(viaje.fecha)}
            <button
              className="bg-red-500 text-white p-2 rounded ml-2 h-8"
              onClick={() => mostrarModalEliminar(viaje.id)}
            >
              Eliminar
            </button>
            <Link
              className="bg-green-500 text-white p-2 rounded ml-2 h-8 no-underline"
              href={`/IngresarPasajeros?viaje=${viaje.id}`}
            >
              Ir a Ingresar Pasajeros
            </Link>
          </li>
        ))}
      </ul>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md">
            <p>¿Seguro que desea eliminar este viaje?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={eliminarViaje}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Panel;
