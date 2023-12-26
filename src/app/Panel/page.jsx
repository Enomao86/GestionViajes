// components/Panel.js
"use client";
import React, { useState, useEffect } from "react";
import BackgroundAnimation from "../component/BackgroundAnimation";
import Header from "../component/Header";
import Link from "next/link";
import Fondo from "../component/fondo";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Panel = () => {
  const [viajes, setViajes] = useState([]);
  const [nuevoViaje, setNuevoViaje] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState(new Date());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedViajeIndex, setSelectedViajeIndex] = useState(null);

  useEffect(() => {
    cargarViajes();
  }, []);

  const cargarViajes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/viajes");
      setViajes(response.data);
    } catch (error) {
      console.error("Error al cargar viajes:", error);
    }
  };

  const agregarViaje = async () => {
    if (nuevoViaje.trim() !== "") {
      try {
        await axios.post("http://localhost:3001/viajes", {
          nombre: nuevoViaje,
          fecha: nuevaFecha.toISOString(),
        });

        cargarViajes();

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
      const selectedViaje = viajes[selectedViajeIndex];
      const viajeId = selectedViaje.id;

      // Obtener la lista de pasajeros asociados al viaje
      const responsePasajeros = await axios.get(
        `http://localhost:3001/viajes/${viajeId}/pasajeros`
      );

      // Obtener directamente la propiedad "pasajeros" o un array vacío si no existe
      const pasajerosAsociados = responsePasajeros.data[0]?.pasajeros || [];

      // Eliminar los pasajeros asociados al viaje
      await Promise.all(
        pasajerosAsociados.map(async (pasajeroId) => {
          try {
            await axios.delete(`http://localhost:3001/pasajeros/${pasajeroId}`);
          } catch (error) {
            // Manejar errores, por ejemplo, puedes imprimirlos en la consola
            console.error(
              `Error al eliminar el pasajero ${pasajeroId}:`,
              error
            );
          }
        })
      );

      // Elimina el viaje del servidor
      await axios.delete(`http://localhost:3001/viajes/${viajeId}`);

      // Actualizar el estado local para reflejar la eliminación del viaje
      setViajes((prevViajes) =>
        prevViajes.filter((viaje) => viaje.id !== selectedViaje.id)
      );

      // Ocultar el modal después de eliminar el viaje
      setShowDeleteModal(false);
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
        {viajes.map((viaje, index) => (
          <li key={index} className="mt-4 ml-9 ">
            {viaje.nombre}- {formatFecha(viaje.fecha)}
            <button
              className="bg-red-500 text-white p-2 rounded ml-2 h-8"
              onClick={() => mostrarModalEliminar(index)}
            >
              Eliminar
            </button>
            <Link
              className="bg-green-500 text-white p-2 rounded ml-2 h-8 no-underline"
              href={`/IngresarPasajeros?viaje=/${encodeURIComponent(
                viaje.nombre
              )}`}
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
