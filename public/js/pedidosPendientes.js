const urlPrincipal = "http://192.168.0.8:4000";
let pedidos = [];
let idPedidoDenegado = 0;
fetch(urlPrincipal + "/pedidosPendientes")
  .then((response) => response.json())
  .then((data) => {
    pedidos = data;
    mostarData(data);
  })
  .catch((err) => console.log(err));
//<button><i class="fa-solid fa-circle-xmark"></i></button>
const mostarData = (data) => {
  const tabla = document.querySelector("#contTabla");
  data.forEach((element) => {
    //Se completa la tabla
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const button1 = document.createElement("button");
    button1.id = element.idpedido;
    button1.addEventListener("click", () => {
      aceptarPedido(button1.id);
    });
    const button2 = document.createElement("button");
    button2.id = element.idpedido;
    button2.addEventListener("click", () => {
      mostrar(button2.id);
    });
    const tagIDenied = document.createElement("i");
    const tagIAccept = document.createElement("i");
    tagIDenied.className = "fa-solid fa-circle-xmark";
    tagIAccept.className = "fa-solid fa-square-check";

    const anchorDetalle = document.createElement("a");
    anchorDetalle.textContent = "Detalles";
    anchorDetalle.className = "button-small";
    //Evento del <a> para mostrar el detalle del pedido
    anchorDetalle.addEventListener("click", async () => {
      await fetch(
        urlPrincipal +
          `/pedidosPendientes/obtenerItemPedido/${element.idpedido}`
      )
        .then((response) => response.json())
        .then((data) => {
          agregarDetalles(data);
        });
      //PopUp
      mostrarDetalle();
    });

    button1.appendChild(tagIAccept);
    button2.appendChild(tagIDenied);
    td5.appendChild(button1);
    td5.appendChild(button2);
    const fecha = element.fecha.split("T");
    td1.textContent = element.idpedido;
    td2.textContent = fecha[0];
    td3.textContent = `${element.nombre} ${element.apellido}`;
    td4.appendChild(anchorDetalle);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tabla.appendChild(tr);
  });
};

function agregarDetalles(data) {
  const tabla = document.getElementById("tabla");
  const tbody = document.createElement("tbody");
  tabla.removeChild(tabla.lastElementChild);
  data.forEach((item) => {
    const tr = document.createElement("tr");
    const tdDescripcion = document.createElement("td");
    const tdCantidad = document.createElement("td");
    tdDescripcion.textContent = item.descripcion;
    tdCantidad.textContent = item.cantidad;

    tr.appendChild(tdDescripcion);
    tr.appendChild(tdCantidad);
    tbody.appendChild(tr);
  });
  tabla.appendChild(tbody);
}
function ocultarDetalle() {
  const modal_container = document.getElementById("modal_containerDetalle");
  modal_container.classList.remove("show");
}
function mostrarDetalle() {
  const modal_container = document.getElementById("modal_containerDetalle");
  modal_container.classList.add("show");
}

function aceptarPedido(id) {
  fetch(urlPrincipal + `/pedidosPendientes/getPedido/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
}

function mostrar(idPedido) {
  const modal_container = document.getElementById("modal_container");
  modal_container.classList.add("show");
  idPedidoDenegado = idPedido;
}
async function ocultar() {
  if (idPedidoDenegado != 0) {
    const comentario = document.getElementById("comentario").value;
    const reqBody = {
      idpedido: idPedidoDenegado,
      comentario: comentario,
    };
    await fetch(urlPrincipal + "/pedidosPendientes/agregarComentario", {
      method: "PATCH",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const modal_container = document.getElementById("modal_container");
  modal_container.classList.remove("show");
  location.reload();
}
function filtrarNombres() {
  const nombre = document.getElementById("filtroNombre").value;
  if (nombre != "") {
    const filtrado = pedidos.filter(
      (item) => item.nombre.includes(nombre) || item.apellido.includes(nombre)
    );
    const tabla = document.querySelector("#contTabla");
    const childs = tabla.childElementCount;
    for (let index = 0; index < childs; index++) {
      tabla.removeChild(tabla.firstElementChild);
    }
    mostarData(filtrado);
  } else {
    const tabla = document.querySelector("#contTabla");
    const childs = tabla.childElementCount;
    for (let index = 0; index < childs; index++) {
      tabla.removeChild(tabla.firstElementChild);
    }
    mostarData(pedidos);
  }
}

function filtrarPedidos() {
  const nroPedido = document.getElementById("filtroPedido").value;
  if (nroPedido != "") {
    const filtrado = pedidos.filter((item) => item.idpedido == nroPedido);
    const tabla = document.querySelector("#contTabla");
    const childs = tabla.childElementCount;
    for (let index = 0; index < childs; index++) {
      tabla.removeChild(tabla.firstElementChild);
    }
    mostarData(filtrado);
  } else {
    const tabla = document.querySelector("#contTabla");
    const childs = tabla.childElementCount;
    for (let index = 0; index < childs; index++) {
      tabla.removeChild(tabla.firstElementChild);
    }
    mostarData(pedidos);
  }
}

async function cerrarSesion() {
  fetch(urlPrincipal + "/login/prueba/deslog").then(() => {
    window.location.href = urlPrincipal + "/login";
  });
}
