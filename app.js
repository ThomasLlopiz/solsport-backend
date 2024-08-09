const express = require("express");
const cors = require("cors");
const http = require("http");
const session = require("express-session");

const app = express();

const usuariosRoutes = require("./routes/usuariosRoutes");
const pedidosRoutes = require("./routes/pedidosRoutes");
const articulosRoutes = require("./routes/articulosRoutes");
const etapasRoutes = require("./routes/etapasRoutes");

app.use(
  cors({
    origin: process.env.URLFRONTEND || "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRETSESSION || "rsgfdghbe134125rtgwfsdwaedsf",
    proxy: process.env.NODE_ENV == "production",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV == "production", sameSite: "none" },
  })
);

app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/articulos", articulosRoutes);
app.use("/etapas", etapasRoutes);

app.get("/", (req, res) => {
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
