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
      const response = await axios.get("http://localhost:4001/viajes");
      setViajes(response.data);
    } catch (error) {
      console.error("Error al cargar viajes:", error);

      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor");
      } else {
        console.error("Error de configuración:", error.message);
      }
    }
  };

  const agregarViaje = async () => {
    if (nuevoViaje.trim() !== "") {
      try {
        const nuevoId = uuidv4();
        await axios.post("http://localhost:4001/viajes", {
          id: nuevoId,
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
      if (
        selectedViajeIndex !== null &&
        typeof selectedViajeIndex === "string" // Asegura que es un UUID
      ) {
        const selectedViaje = viajes.find(
          (viaje) => viaje.id === selectedViajeIndex
        );
        if (!selectedViaje) {
          throw new Error("No se ha encontrado el viaje seleccionado");
        }

        const viajeId = selectedViaje.id;

        const responsePasajeros = await axios.get(
          `http://localhost:4002/viajes/${viajeId}/pasajeros`
        );

        const pasajerosAsociados = responsePasajeros.data[0]?.pasajeros || [];

        await Promise.all(
          pasajerosAsociados.map(async (pasajeroId) => {
            try {
              await axios.delete(
                `http://localhost:4002/pasajeros/${pasajeroId}`
              );
            } catch (error) {
              console.error(
                `Error al eliminar el pasajero ${pasajeroId}:`,
                error
              );
            }
          })
        );

        await axios.delete(`http://localhost:4001/viajes/${viajeId}`);

        setViajes((prevViajes) =>
          prevViajes.filter((viaje) => viaje.id !== selectedViaje.id)
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
        {viajes.map((viaje) => (
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
