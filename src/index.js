const express = require("express");
const path = require("path");
const http = require("http");
const SocketIO = require("socket.io");
const handlebars = require("express-handlebars");
const routerProductos = require("./routers/producto-api");
const Productos = require('./productos');

/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;

const layoutDirPath = path.resolve(__dirname, "../views/layouts");
const defaultLayerPth = path.resolve(__dirname, "../views/layouts/index.hbs");

const partialDirPath = path.resolve(__dirname, "../views/partials");
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    layoutsDir: layoutDirPath,
    extname: "hbs",
    defaultLayout: defaultLayerPth,
    partialsDir: partialDirPath,
  })
);

app.set("views", "./views"); 
const publicPath = path.resolve(path.join(__dirname, "../public"));
app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerProductos);

const server = app.listen(puerto, () => console.log("Server up en puerto", puerto));

app.get("/", async (req, res) => {
  res.render("main");
});

const io = SocketIO(server);

//websocket cuando se conecta un nuevo cliente
io.on('connection', (socket) => {
  console.log("nueva conexion: " + socket.id);
  socket.on('producto:nuevo', (productoNuevo) => {
    console.log("Producto nuevo recibido: " + productoNuevo);
    let data = Productos.guardar(productoNuevo.title, productoNuevo.price, productoNuevo.thumbnail);
    io.sockets.emit('producto:nuevo', data);
    console.log("estado es true: " + data);
    
  })
})







