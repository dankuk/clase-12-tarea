const express = require("express");
const router = express.Router();
const producto = require("../productos");



router.post("/guardar", (req, res) => {
  const body = req.body;
  // console.log(body);
  if (!body.title || !body.price || !body.thumbnail) {
    res.status(400);
    return res.json({
      msg: "Falta el nombre, el precio o la url de imagen",
    });
  }
  producto.guardar(body.title,body.price,body.thumbnail);
  res.redirect("/api/productos/vista");
});

router.put("/modificar/:id", async(req, res) => {
  // console.log(req);
  const idBuscado = Number(req.params.id);
  const body = req.body;


  let productos = await producto.leer();
  // console.log(productos);
  if(productos==undefined){
    res.status(404);
    return res.json({
      msg: "No existen productos",
    });
  }

  const posicion = productos.map((aProduct) => aProduct.id).indexOf(idBuscado);
  // console.log(posicion);
  if (posicion == -1) {
    res.status(404);
    return res.json({
      msg: "Producto no encontrado",
    });
  }
  // console.log(body);
  if (!body.title || !body.price || !body.thumbnail) {
    res.status(404);
    return res.json({
      msg: "Falta el nombre o el precio",
    });
  }
  if(producto.modificar(idBuscado,body.title,body.price,body.thumbnail)){
    res.status(201);
    return res.json({
      msg: "producto modificado correctamente",
    });
  }else{
    res.status(404);
    return res.json({
      msg: "Error",
    });
  }
});

router.delete("/eliminar/:id", async(req, res) => {
  const idBuscado = Number(req.params.id);
  let productos = await producto.leer();
  if(productos==undefined){
    res.status(404);
    return res.json({
      msg: "No existen productos",
    });
  }

  const posicion = productos.map((aProduct) => aProduct.id).indexOf(idBuscado);
  // console.log("posicion: " + posicion);
  if (posicion == -1) {
    res.status(404);
    return res.json({
      msg: "Producto no encontrado",
    });
  };
  if(producto.eliminar(idBuscado)){
    res.status(200);
    return res.json({
      msg: "Producto eliminado",
    });
  }else{
    res.status(404);
    return res.json({
      msg: "Error",
    });
  }
});

router.get("/listar", async(req, res) => {
   let data = await producto.leer();
  if (data.length > 0) {
    res.json({
      data: data,
    });
  } else {
    res.json({
      error: "No hay productos cargados",
    });
  }
});

router.get("/vista", async(req, res) => {
  let data = await producto.leer();
  let datos = {};
  if(data!=undefined){
    datos = {
      titleFormulario: "Nuevo producto",
      titleTabla: "Tabla de productos",
      existe : true,
      data: data
    };
    // console.log(datos);
    res.render('vistaTabla', datos);
  }else{
    datos = {
      titleFormulario: "Nuevo producto",
      titleTabla: "Tabla de productos",
      noexiste : true,
    };
    // console.log(datos);
    res.render('vistaTabla', datos);
  }
});

router.get("/formulario", async(req, res) => {
  let datos = {
    title: "Nuevo Producto",
  };
  res.render('formulario', datos);
});

module.exports=router;