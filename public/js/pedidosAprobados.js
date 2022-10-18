const urlPrincipal = "http://localhost:4000";
let pedidos = [];
fetch(urlPrincipal + "/pedidosAprobados")
  .then((response) => response.json())
  .then((data) => {
    pedidos = data;
    mostarData(pedidos);
  })
  .catch((err) => console.log(err));
const mostarData = (pedidos) => {
  const tabla = document.querySelector("#contTabla");
  pedidos.forEach((element) => {
    console.log(element.idpedido);
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const anchorDetalle = document.createElement("a");
    anchorDetalle.textContent = "Detalles";
    anchorDetalle.className = "button";
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
    //DEVOLUCIONES
    const anchorDevolucion = document.createElement("a");
    anchorDevolucion.textContent = "Devolucion";
    anchorDevolucion.className = "button";

    anchorDevolucion.addEventListener("click", async () => {
      await fetch(
        urlPrincipal +
          `/pedidosAprobados/obtenerDevoluciones/${element.idpedido}`
      )
        .then((response) => response.json())
        .then((data) => {
          agregarDevoluciones(data);
        });
      //PopUp
      mostrarDevoluciones();
    });
    const fecha = element.fecha.split("T");
    td5.appendChild(anchorDetalle);
    td6.appendChild(anchorDevolucion);
    td1.textContent = element.idpedido;
    td2.textContent = fecha[0];
    td3.textContent = `${element.nombre} ${element.apellido}`;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tr.appendChild(td5);
    tr.appendChild(td6);
    tabla.appendChild(tr);
  });
};

function agregarDetalles(pedidos) {
  const tabla = document.getElementById("tabla");
  const tbody = document.createElement("tbody");
  tabla.removeChild(tabla.lastElementChild);
  pedidos.forEach((item) => {
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
function agregarDevoluciones(devoluciones) {
  const tabla = document.getElementById("tablaDevoluciones");
  const tbody = document.createElement("tbody");
  tabla.removeChild(tabla.lastElementChild);
  devoluciones.forEach((item) => {
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
function mostrarDevoluciones() {
  const modal_container = document.getElementById(
    "modal_containerDevoluciones"
  );
  modal_container.classList.add("show");
}
function ocultarDevoluciones() {
  const modal_container = document.getElementById(
    "modal_containerDevoluciones"
  );
  modal_container.classList.remove("show");
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
