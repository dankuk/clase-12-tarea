const fs = require("fs");
const path = require("path");
const ruta = "./producto/productos.txt";

let productos = [];
 
const guardar = (title, price, thumbnail) => {
  try {
    const nuevoProducto = {
      id: productos.length + 1,
      title: title,
      price: price,
      thumbnail: thumbnail
    };
    productos.push(nuevoProducto);
    return productos;
  } catch (error) {
    console.log(error);
    return;
  }
};

const eliminar = async (idBuscado) => {
  try {
    const productos = await fs.promises.readFile(ruta, "utf-8");
    console.log(idBuscado);

    if (productos) {
      let prod = JSON.parse(productos);
      const arrayProductos = prod.filter(
        (aProduct) => aProduct.id !== idBuscado
      );

      console.log("eliminado correctamente");
      await fs.promises.writeFile(ruta, JSON.stringify(arrayProductos, null, "\t"));
      return;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

const modificar = async (idBuscado, title, price, thumbnail) => {
  try {
    let arreglo = [];
    const productos = await fs.promises.readFile(ruta, "utf-8");
    console.log(idBuscado);

    if (productos) {
      let jData = JSON.parse(productos);
      for (const value of jData) {
        if (value.id == idBuscado) {
          value.title = title;
          value.price = price;
          value.thumbnail = thumbnail;
        }
      }
      console.log(jData);

      console.log("modificado correctamente");
      await fs.promises.writeFile(ruta, JSON.stringify(jData, null, "\t"));
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const leer =  () => {
  if (productos.length > 0) {
    return productos;
  } else {
    return false;
  }
};

const borrar = async () => {
  await fs.promises.unlink(ruta);
  console.log("borrado");
};

module.exports = {
  borrar,
  eliminar,
  leer,
  guardar,
  modificar,
};




// app.put("/productos/modificar/:id", (req, res) => {
//   console.log(req.params);
//   const idBuscado = Number(req.params.id);
//   const body = req.body;

//   const posicion = productos.map((aProduct) => aProduct.id).indexOf(idBuscado);
//   console.log(posicion);
//   if (posicion == -1) {
//     res.status = 404;
//     return res.json({
//       msg: "Producto no encontrado",
//     });
//   }

//   if (!body.nombre || !body.precio) {
//     res.status = 400;
//     return res.json({
//       msg: "Falta el nombre o el precio",
//     });
//   }

//   productos[posicion].nombre = body.nombre;
//   productos[posicion].precio = body.precio;
//   res.status = 201;
//   res.json({
//     data: productos[posicion],
//   });
// });

// app.get("/productos/listar/:id", (req, res) => {
//   console.log(req.params.id);
//   const idBuscado = Number(req.params.id);

//   const findProducto = productos.filter(
//     (aProduct) => aProduct.id === idBuscado
//   );
//   console.log(findProducto.length);
//   if (findProducto.length > 0) {
//     res.json({
//       data: findProducto,
//     });
//   } else {
//     res.json({
//       data: "Producto no encontrado",
//     });
//   }
// });

// app.get("/productos/listar", (req, res) => {
//   if (productos.length > 0) {
//     res.json({
//       data: productos,
//     });
//   } else {
//     res.json({
//       error: "No hay productos cargados",
//     });
//   }
// });
