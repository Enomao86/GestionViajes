"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Registerviejo = ({ closeModal }) => {
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar el formato del email y la longitud de la contraseña
    if (!isEmailValid) {
      setError("Formato de email no válido");
      return;
    }

    if (!isPasswordValid) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      // Verificar si el usuario ya existe
      const existingUserResponse = await axios.get(
        `http://localhost:4000/users?email=${email}`
      );

      if (existingUserResponse.data.length > 0) {
        setError("El email ya existe");
        return;
      }

      // Realizar el registro sin bcrypt
      const response = await axios.post("http://localhost:4000/users", {
        alias,
        email,
        password,
      });

      console.log(response.data);
      closeModal(); // Cierra el modal después de un registro exitoso

      // Mostrar SweetAlert después de un registro exitoso
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario registrado",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Redirigir a la nueva ruta después del registro exitoso
        navigate("/Panel");
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error.response.data);

      // Mostrar SweetAlert con el mensaje de error
      setError(
        error.response.data.message || "Ha ocurrido un error inesperado."
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRegister(e);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="alias" className="mt-2">
          Alias:
        </label>
        <input
          type="text"
          id="alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="current-alias"
        />
        <label htmlFor="email" className="rounded">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="current-email"
        />
        <br />
        <label htmlFor="password" className="mt-2">
          Contraseña:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="current-password"
        />
        <br />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          onClick={handleRegister}
          className={`rounded text-2xl mt-2 bg-gradient-to-r from-green-400 to-blue-500${
            !(isEmailValid && isPasswordValid) &&
            "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isEmailValid || !isPasswordValid}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Registerviejo;
