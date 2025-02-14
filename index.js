const express = require("express");
const cors = require("cors");
const http = require("http");
const session = require("express-session");
const app = express();

const usuariosRoutes = require("./src/routes/usuariosRoutes");
const pedidosRoutes = require("./src/routes/pedidosRoutes");
const articulosRoutes = require("./src/routes/articulosRoutes");
const etapasRoutes = require("./src/routes/etapasRoutes");
const telasRoutes = require("./src/routes/telasRoutes");
const agregadosRoutes = require("./src/routes/agregadosRoutes");

app.use(
  cors({
    origin: process.env.URLFRONTEND || "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRETSESSION || "rsgfdghbe134125rtgwfsdwaedsf",
    proxy: process.env.NODE_ENV === "development",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    },
  })
);

app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/articulos", articulosRoutes);
app.use("/etapas", etapasRoutes);
app.use("/telas", telasRoutes);
app.use("/agregados", agregadosRoutes);

app.get("/", (req, res) => {
  console.log("Servidor conectado en /");
  res.send("Servidor funcionando correctamente.");
});

const server = http.createServer(app);
const PORT = process.env.DB_PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
