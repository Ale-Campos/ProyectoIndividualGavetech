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

async function controlCant() {
  let select = document.getElementById("select2");
  const inputCant = document.getElementById("cant1");
  inputCant.value = 1;

  inputCant.max = await consularStock(select.value);
}

async function consularStock(value) {
  let cantidad;

  if (value == "SC") {
    return (cantidad = 0);
  }
  await fetch(`http://localhost:4000/generarPedido/select/${value}`)
    .then((response) => response.json())
    .then((data) => (cantidad = data[0].stock_virtual));
  return cantidad;
}

function agregarAPedido() {
  let select = document.getElementById("select2").value;
  if (select != "SC") {
    fetch(window.location + `/select/${select}`)
      .then((response) => response.json())
      .then((data) => imprimirResultado(data))
      .catch((err) => console.log(err));
    const tabla = document.getElementById("contTabla");
    const cantidad = document.getElementById("cant1").value;
    const imprimirResultado = (data) => {
      const seleccion = {
        ////Aca hay que definir que datos se envían al backend
        descripcion: data[0].descripcion,
        idproducto: data[0].idproducto,
        cantidad: cantidad,
      };
      agregarSelecciones(seleccion);
      console.log("Selecciones");
      console.log(selecciones);

      const tr = document.createElement("tr");
      const tdIdProd = document.createElement("td");
      const tdDescripcion = document.createElement("td");
      const tdCantidad = document.createElement("td");
      const tdBoton = document.createElement("td");
      const botonAnchor = document.createElement("a");
      botonAnchor.id = seleccion.idproducto;
      botonAnchor.textContent = "Quitar";
      botonAnchor.className = "button";
      botonAnchor.addEventListener("click", () => {
        console.log("TENGO EL EVENTO");
        quitarProducto(botonAnchor.id);
      });
      tdIdProd.textContent = seleccion.idproducto;
      tdDescripcion.textContent = seleccion.descripcion;
      tdCantidad.textContent = seleccion.cantidad;
      tdBoton.appendChild(botonAnchor);
      tr.appendChild(tdIdProd);
      tr.appendChild(tdDescripcion);
      tr.appendChild(tdCantidad);
      tr.appendChild(tdBoton);
      tabla.appendChild(tr);
    };
  }
}

function quitarProducto(id) {
  const boton = document.getElementById(`${id}`);
  boton.textContent = "Quitado!!";
  const index = selecciones.findIndex(
    (seleccion) => seleccion.idproducto == id
  );
  console.log(selecciones.splice(index, 1));
  console.log(selecciones);
}

const agregarSelecciones = (seleccion) => {
  selecciones.push(seleccion);
};

async function enviarPedido() {
  //Aca ponemos la info que queremos pasar a qr en función a lo definido en agregarPedido()
  let idProducto = [];
  let cantidad = [];
  let descripcion = [];
  //Formamos los strings
  selecciones.forEach((x) => {
    idProducto.push(x.idproducto);
    cantidad.push(x.cantidad);
    descripcion.push(x.descripcion);
  });
  if (selecciones.length == 0) {
    window.alert("No se han seleccionado componentes");
    return;
  }
  //Creamos el json a enviar
  let json = {
    idProducto: idProducto,
    cantidad: cantidad,
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
  });
  mostrar();
}

function ocultar() {
  const modal_container = document.getElementById("modal_container");
  modal_container.classList.remove("show");
  location.reload();
}
function mostrar() {
  const modal_container = document.getElementById("modal_container");
  modal_container.classList.add("show");
}
