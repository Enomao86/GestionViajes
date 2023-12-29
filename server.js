const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); // Asegúrate de importar uuidv4

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

server.post("/viaje", async (req, res) => {
  const { nombre, fecha } = req.body;
  try {
    // Generar un ID único para el nuevo viaje
    const nuevoViajeId = uuidv4();

    // Crear el nuevo viaje con el ID generado
    const nuevoViaje = {
      id: nuevoViajeId,
      nombre,
      fecha,
    };
    await viajeRouter.db.get("viaje").push(nuevoViaje).write();

    res.json({
      message: "Viaje agregado correctamente",
      viaje: nuevoViaje, // Devolver el nuevo viaje con su ID
    });
  } catch (error) {
    console.error("Error al agregar viaje:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Rutas de  viajes
const viajeRouter = jsonServer.router("db.json", { foreignKeySuffix: "Id" });
server.use("/viaje", viajeRouter);

// Ruta para obtener pasajeros de un viaje específico
server.get("/viaje/:viajeId/pasajeros", async (req, res) => {
  const { viajeId } = req.params;

  try {
    console.log("viajeId:", viajeId);
    // Filtrar pasajeros por viajeId
    const pasajerosDelViaje = viajeRouter.db
      .get("pasajeros")
      .filter({ viajeId })
      .value();

    res.json(pasajerosDelViaje);
  } catch (error) {
    console.error("Error al obtener pasajeros del viaje:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Ruta para agregar pasajero a un viaje específico
server.post("/viaje/:viajeId/pasajeros", async (req, res) => {
  const { viajeId } = req.params;
  const { nombre, apellido, dni, telefono } = req.body;

  try {
    // Verificar si el viaje existe
    const viaje = viajeRouter.db.get("viaje").find({ id: viajeId }).value();

    if (!viaje) {
      return res.status(404).json({ message: "Viaje no encontrado" });
    }

    // Agregar el pasajero al viaje
    const nuevoPasajero = {
      id: uuidv4(),
      nombre,
      apellido,
      dni,
      telefono,
      viajeId,
    };

    viajeRouter.db.get("pasajeros").push(nuevoPasajero).write();

    res.json({ message: "Pasajero agregado al viaje correctamente" });
  } catch (error) {
    console.error("Error al agregar pasajero al viaje:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

const pasajerosDelViaje = viajeRouter.db
  .get("pasajeros")
  .filter({ viajeId })
  .value();
console.log("Pasajeros del viaje:", pasajerosDelViaje);

// Ruta para eliminar un viaje
server.delete("/viaje/:viajeId", async (req, res) => {
  const { viajeId } = req.params;

  try {
    // Eliminar el viaje
    await viajeRouter.db.get("viaje").remove({ id: viajeId }).write();

    // Eliminar los pasajeros asociados al viaje
    await viajeRouter.db.get("pasajeros").remove({ viajeId }).write();

    res.json({ message: "Viaje eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar viaje:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Rutas de usuario
const userRouter = jsonServer.router("db.json");
server.use("/users", userRouter); // Corregido el prefijo de la ruta

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
