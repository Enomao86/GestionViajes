const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");

const server = express();

// Middleware para procesar JSON
server.use(express.json());

// Configuración de CORS
server.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Rutas de usuario (puedes ajustar la ruta según tus necesidades)
const userRouter = jsonServer.router("db.json");
server.use("/users/", userRouter);

// Ruta para manejar el inicio de sesión
server.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = userRouter.db.get("users").find({ email }).value();

    if (!user) {
      // Usuario no encontrado
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Verificar la contraseña
    if (password !== user.password) {
      // Contraseña incorrecta
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Éxito en el inicio de sesión
    res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Inicia el servidor en el puerto 4000
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor JSON Server en ejecución en http://localhost:${PORT}`);
});
