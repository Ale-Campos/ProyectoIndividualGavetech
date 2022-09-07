let selecciones = [];
fetch(window.location + "/list")
  .then((response) => response.json())
  .then((data) => mostarData(data))
  .catch((err) => console.log(err));

const mostarData = (data) => {
  console.log(data);
  const select2 = document.getElementById("select2");
  for (let index = 0; index < data.length; index++) {
    let option = document.createElement("option");
    option.text = data[index].descripcion;
    option.value = data[index].idproducto;

    select2.appendChild(option);
  }
};

async function leerIngresos() {
  const idProducto = document.querySelector("#idProducto").value;
  const descripcion = document.querySelector("#descripcion").value;
  const imagen = document.querySelector("#imagen").value;
  const stock = document.querySelector("#stock").value;
  const posicion = document.querySelector("#posicion").value;
  const categoria_id = document.querySelector("#categoria_id").value;
  let productoNuevo = {
    idProducto,
    descripcion,
    imagen,
    stock,
    posicion,
    categoria_id,
  };

  const response = await fetch(window.location + "/send", {
    method: "POST",
    body: JSON.stringify(productoNuevo),
    headers: {
      "Content-type": "application/json",
    },
  });

  const result = response.json();
  console.log("Response front " + result);
  return result; //Resultado de la promesa
}

async function mostrarProductos() {
  fetch(window.location + "/list")
    .then((response) => response.json())
    .then((data) => mostarData(data))
    .catch((err) => console.log(err));

  const mostarData = (data) => {
    console.log(data);
    let body = "";
    for (let index = 0; index < data.length; index++) {
      body =
        body +
        `<tr><td>${data[index].idproducto}</td><td>${data[index].descripcion}</td><td>${data[index].imagen}</td><td>${data[index].stock}</td><td>${data[index].posicion}</td><td>${data[index].categoria_id}</td></tr>`;
    }
    document.getElementById("tablaProductos").innerHTML = body;
  };
}

function agregarAPedido() {
  let select = document.getElementById("select2").value;
  fetch(window.location + `/${select}`)
    .then((response) => response.json())
    .then((data) => imprimirResultado(data))
    .catch((err) => console.log(err));
  const ul = document.getElementById("listadoSeleccion");
  const imprimirResultado = (data) => {
    const seleccion = {
      ////Aca hay que definir que datos se envían al backend

      idproducto: data[0].idproducto,
      descripcion: data[0].descripcion,
    };
    agregarSelecciones(seleccion);
    console.log("Selecciones");
    console.log(selecciones);
    let li = document.createElement("li");

    li.textContent = `IdProucto: ${data[0].idproducto} Descripcion: ${data[0].descripcion}`;
    ul.appendChild(li);
  };
}
const agregarSelecciones = (seleccion) => {
  selecciones.push(seleccion);
};

async function enviarPedido() {
  //Aca ponemos la info que queremos pasar a qr en función a lo definido en agregarPedido()
  let idProducto = "";
  let descripcion = "/";
  //Formamos los strings
  selecciones.forEach((x) => {
    idProducto = idProducto + `${x.idproducto},`;
    descripcion = descripcion + `${x.descripcion},`;
  });
  //Creamos el json a enviar
  let json = {
    idProducto: idProducto,
    descripcion: descripcion,
  };
  console.log(json);
  //Enviamos por el post de la api
  await fetch(window.location + "/qr/sendString", {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => imprimirQr(data));

  function imprimirQr(data) {
    let div = document.getElementById("contenedorQr");
    let img = document.createElement("img");
    img.src = data.url;
    div.appendChild(img);
  }
}
