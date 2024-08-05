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

app.use("/backend/usuarios", usuariosRoutes);
app.use("/backend/pedidos", pedidosRoutes);
app.use("/backend/articulos", articulosRoutes);
app.use("/backend/etapas", etapasRoutes);

app.get("/backend/", (req, res) => {
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Conectado</title>
    </head>
    <body>
      <h1>¡Servidor Conectado!</h1>
    </body>
    </html>
  `;
  res.send(htmlResponse);
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
