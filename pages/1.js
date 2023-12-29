// pages/AgregarPasajeros.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useParams } from "react-router-dom";
import { useRouter } from "next/router";

const AgregarPasajeros = () => {
  //const { viajeId } = useParams();
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [hospedaje, setHospedaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [cuit, setCuit] = useState("");
  const [lugarSalida, setLugarSalida] = useState("");
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [nroEmergencia, setNroEmergencia] = useState("");
  const [nombreEmergencia, setNombreEmergencia] = useState("");
  const [pasajeros, setPasajeros] = useState([]);
  const router = useRouter();
  const { viaje } = router.query;

  useEffect(() => {
    // Obtener la lista de pasajeros al cargar el componente
    obtenerPasajeros();
  }, [viaje]);

  const obtenerPasajeros = async () => {
    try {
      console.log("Identificador del viaje:", viaje);
      const response = await axios.get(
        `http://localhost:4000/pasajeros?viaje=${viaje}`
      );
      setPasajeros(response.data);
    } catch (error) {
      console.error("Error al obtener pasajeros:", error);
    }
  };

  const agregarPasajero = async () => {
    try {
      const nuevoViaje = viaje;
      await axios.post("http://localhost:4000/pasajeros", {
        fechaIngreso,
        hospedaje,
        nombre,
        apellido,
        dni,
        cuit,
        lugarSalida,
        nombreGrupo,
        fechaNacimiento,
        telefono,
        email,
        nroEmergencia,
        nombreEmergencia,
        viaje: nuevoViaje,
      });

      // Limpiar los campos después de agregar el pasajero
      setFechaIngreso("");
      setHospedaje("");
      setNombre("");
      setApellido("");
      setDni("");
      setCuit("");
      setLugarSalida("");
      setNombreGrupo("");
      setFechaNacimiento("");
      setTelefono("");
      setEmail("");
      setNroEmergencia("");
      setNombreEmergencia("");

      // Actualizar la lista de pasajeros después de agregar uno nuevo
      obtenerPasajeros();
    } catch (error) {
      console.error("Error al agregar pasajero:", error);
    }
  };

  const eliminarPasajero = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/pasajeros/${id}`);
      // Actualizar la lista de pasajeros después de eliminar uno
      obtenerPasajeros();
    } catch (error) {
      console.error("Error al eliminar pasajero:", error);
    }
  };

  return (
    <div>
      <h2>Agregar Pasajero {viaje} </h2>
      <div>
        <label>Fecha ingreso:</label>
        <input
          type="text"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
        />
      </div>
      <div>
        <label>Hospedaje:</label>
        <input
          type="text"
          value={hospedaje}
          onChange={(e) => setHospedaje(e.target.value)}
        />
      </div>
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
        <label>Cuit:</label>
        <input
          type="text"
          value={cuit}
          onChange={(e) => setCuit(e.target.value)}
        />
      </div>
      <div>
        <label>Lugar Salida:</label>
        <input
          type="text"
          value={lugarSalida}
          onChange={(e) => setLugarSalida(e.target.value)}
        />
      </div>
      <div>
        <label>Nombre del grupo:</label>
        <input
          type="text"
          value={nombreGrupo}
          onChange={(e) => setNombreGrupo(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha nacimiento:</label>
        <input
          type="text"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
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
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Nro emergencia</label>
        <input
          type="text"
          value={nroEmergencia}
          onChange={(e) => setNroEmergencia(e.target.value)}
        />
      </div>
      <div>
        <label>Nombre emergencia:</label>
        <input
          type="text"
          value={nombreEmergencia}
          onChange={(e) => setNombreEmergencia(e.target.value)}
        />
      </div>
      <button onClick={agregarPasajero}>Agregar Pasajero</button>

      {/* Mostrar la lista de pasajeros y botones para eliminar */}
      <h2>Pasajeros</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha de ingreso</th>
            <th>Hospedaje</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>CUIT</th>
            <th>Lugar Salida</th>
            <th>Nombre del grupo</th>
            <th>Fecha nacimiento</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Nro emergencia</th>
            <th>Nombre emergencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pasajeros.map((pasajero) => (
            <tr key={pasajero.id}>
              <td>{pasajero.fechaIngreso}</td>
              <td>{pasajero.hospedaje}</td>
              <td>{pasajero.nombre}</td>
              <td>{pasajero.apellido}</td>
              <td>{pasajero.dni}</td>
              <td>{pasajero.cuit}</td>
              <td>{pasajero.lugarSalida}</td>
              <td>{pasajero.nombreGrupo}</td>
              <td>{pasajero.fechaNacimiento}</td>
              <td>{pasajero.telefono}</td>
              <td>{pasajero.email}</td>
              <td>{pasajero.nroEmergencia}</td>
              <td>{pasajero.nombreEmergencia}</td>
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
