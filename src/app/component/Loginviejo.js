// Login.jsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validar el formato del email y la longitud de la contraseña
    if (!email || !password) {
      setError("Por favor, ingrese su email y contraseña");
      return;
    }

    try {
      // Verificar las credenciales del usuario
      const response = await axios.post("http://localhost:4000/users", {
        email,
        password,
      });

      console.log(response.data);
      closeModal(); // Cierra el modal después de un inicio de sesión exitoso

      // Mostrar SweetAlert después de un inicio de sesión exitoso
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Inicio de sesión exitoso",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Redirigir a la nueva ruta después del registro exitoso
        navigate("/Panel");
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response.data);

      // Mostrar SweetAlert con el mensaje de error
      setError(error.response.data.message || "Credenciales incorrectas.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Inicio de Sesión</h2>
      <form onSubmit={handleLogin}>
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
          onClick={handleLogin}
          className="rounded text-2xl mt-2 bg-gradient-to-r from-green-400 to-blue-500"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
