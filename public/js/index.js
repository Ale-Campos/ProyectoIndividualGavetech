let selecciones = [];
fetch("home/list")
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

  const response = await fetch("/home/send", {
    method: "POST",
    body: JSON.stringify(productoNuevo),
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log("Response front " + response);
  const result = response.json();
  return result;
}

async function mostrarProductos() {
  fetch("home/list")
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
  fetch(`home/${select}`)
    .then((response) => response.json())
    .then((data) => imprimirResultado(data))
    .catch((err) => console.log(err));
  const ul = document.getElementById("listadoSeleccion");
  const imprimirResultado = (data) => {
    const seleccion = {
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
