const urlPrincipal = "http://192.168.0.8:4000";
const imgPendiente =
  "https://st2.depositphotos.com/47577860/46188/v/600/depositphotos_461884700-stock-illustration-account-pending-profile-pending-user.jpg";
const imgRechazado = "https://cdn-icons-png.flaticon.com/512/251/251278.png";
let pedidos = [];
fetch(urlPrincipal + "/misPedidos")
  .then((response) => response.json())
  .then((data) => {
    pedidos = data;
    mostarData(pedidos);
  })
  .catch((err) => console.log(err));

const mostarData = (data) => {
  const tabla = document.querySelector("#contTabla");

  data.forEach((element) => {
    console.log(element.idpedido);
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const img = document.createElement("img");
    const anchor = document.createElement("a");

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

    const fecha = element.fecha.split("T");

    td1.textContent = element.idpedido;
    td2.textContent = fecha[0];

    const estado = definirEstado(element);
    td4.textContent = estado;
    switch (estado) {
      case "Aprobado":
        img.src = element.string_qr;
        anchor.href = element.string_qr;
        break;
      case "Pendiente":
        img.src = imgPendiente;
        anchor.href = imgPendiente;

        break;
      default:
        img.src = imgRechazado;
        anchor.href = imgRechazado;
    }
    td3.appendChild(anchor);
    td5.appendChild(anchorDetalle);
    td6.textContent = element.comentario;
    anchor.appendChild(img);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tabla.appendChild(tr);
  });

  console.log(data);
};

function definirEstado(element) {
  let estado = "Rechazado";
  if (element.aprobado == 1) {
    estado = "Aprobado";
  } else if (element.aprobado == 0 && element.rechazado == 0) {
    estado = "Pendiente";
  }
  return estado;
}

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

function filtrarEstado() {
  const estado = document.getElementById("filtroEstado").value;
  let filtrado = [];
  if (estado != "SF") {
    switch (estado) {
      case "Aprobado":
        filtrado = pedidos.filter((item) => item.aprobado == 1);
        break;
      case "Rechazado":
        filtrado = pedidos.filter((item) => item.rechazado == 1);
        break;
      case "Pendiente":
        filtrado = pedidos.filter(
          (item) => item.rechazado == 0 && item.aprobado == 0
        );
        break;
    }
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
