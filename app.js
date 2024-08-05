const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const usuariosRoutes = require("./routes/usuariosRoutes");
const pedidosRoutes = require("./routes/pedidosRoutes");
const articulosRoutes = require("./routes/articulosRoutes");
const etapasRoutes = require("./routes/etapasRoutes");

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/articulos", articulosRoutes);
app.use("/etapas", etapasRoutes);

app.get("/", (req, res) => {
  console.log("HOLA");
  res.send(htmlResponse);
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
