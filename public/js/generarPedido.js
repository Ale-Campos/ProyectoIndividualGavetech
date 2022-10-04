let selecciones = [];
fetch(window.location + "/list") //MODIFICAR ESTA DIRECCION
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

async function pruebaSelect() {
  let select = document.getElementById("select2");
  let inputCant = document.getElementById("cant1");

  inputCant.max = await consularStock(select.value);
}

async function consularStock(value) {
  let cantidad;
  await fetch(`http://localhost:4000/generarPedido/select/${value}`)
    .then((response) => response.json())
    .then((data) => (cantidad = data[0].stock_virtual));
  return cantidad;
}

function agregarAPedido() {
  let select = document.getElementById("select2").value;
  fetch(window.location + `/select/${select}`)
    .then((response) => response.json())
    .then((data) => imprimirResultado(data))
    .catch((err) => console.log(err));
  const ul = document.getElementById("listadoSeleccion");
  const cantidad = document.getElementById("cant1").value;
  const imprimirResultado = (data) => {
    const seleccion = {
      ////Aca hay que definir que datos se envían al backend

      idproducto: data[0].idproducto,
      cantidad: cantidad,
    };
    agregarSelecciones(seleccion);
    console.log("Selecciones");
    console.log(selecciones);
    let li = document.createElement("li");

    li.textContent = `IdProucto: ${data[0].idproducto} Descripcion: ${data[0].descripcion} Cantidad: ${cantidad}`;
    ul.appendChild(li);
  };
}
const agregarSelecciones = (seleccion) => {
  selecciones.push(seleccion);
};

async function enviarPedido() {
  //Aca ponemos la info que queremos pasar a qr en función a lo definido en agregarPedido()
  let idProducto = [];
  let cantidad = [];
  //Formamos los strings
  selecciones.forEach((x) => {
    idProducto.push(x.idproducto);
    cantidad.push(x.cantidad);
  });
  //Creamos el json a enviar
  let json = {
    idProducto: idProducto,
    cantidad: cantidad,
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
