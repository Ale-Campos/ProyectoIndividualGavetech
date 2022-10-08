const urlPrincipal = "http://localhost:4000";
let pedidos;
fetch(urlPrincipal + "/misPedidos")
  .then((response) => response.json())
  .then((data) => mostarData(data))
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
    anchor.href = element.string_qr;
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

    const fecha = element.fecha.split("T");

    td1.textContent = element.idpedido;
    td2.textContent = fecha[0];
    td3.appendChild(anchor);
    td4.textContent = definirEstado(element);
    td5.appendChild(anchorDetalle);
    td6.textContent = element.comentario;
    img.src = element.string_qr;
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
