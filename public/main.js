const socket = io();

let title = document.getElementById("title");
let price = document.getElementById("price");
let thumbnail = document.getElementById("thumbnail");
let btn = document.getElementById("guardar");

if (btn) {
  btn.addEventListener("click", () => {
    if(title.value != "" && price.value != "" && thumbnail.value != ""){
      producto = {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value,
      };
      socket.emit("producto:nuevo", producto);
    }else{
      alert("Debe rellenar todos los campos")
    }
    
  });
}

socket.on("producto:nuevo", (data) => {
  console.log("refrezcar datos!!!");
  console.log(data);
  
  // Obtener la referencia del elemento body
  document.getElementById("tabla").innerHTML = "";
  let divTabla = document.getElementById("tabla")

  // Crea un elemento <table> y un elemento <tbody>
  let tabla = document.createElement("table")
  tabla.className = "table";
  let cuerpoTabla = document.createElement('tbody');

  // Crea las celdas

  data.forEach(function(datosFilas) {
    var fila = document.createElement('tr');
    
    var celda = document.createElement('td');
    celda.appendChild(document.createTextNode(datosFilas.id));
    fila.appendChild(celda);
    celda = document.createElement('td');
    celda.appendChild(document.createTextNode(datosFilas.title));
    fila.appendChild(celda);
    celda = document.createElement('td');
    celda.appendChild(document.createTextNode(datosFilas.price));
    fila.appendChild(celda);
    celda = document.createElement('td');
    var img = document.createElement('img');
    img.style = "width: 64px; height: 64px;"
    img.src = datosFilas.thumbnail;
    celda.appendChild(img);
    fila.appendChild(celda);

    cuerpoTabla.appendChild(fila);
  });

  tabla.appendChild(cuerpoTabla);
  divTabla.appendChild(tabla);
});
