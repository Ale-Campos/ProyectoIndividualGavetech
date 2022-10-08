const urlPrincipal = "http://localhost:4000";

fetch(urlPrincipal + "/pedidosAprobados")
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
    const td5 = document.createElement("td");
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
    td5.appendChild(anchorDetalle);
    td1.textContent = element.idpedido;
    td2.textContent = fecha[0];
    td3.textContent = element.nombre;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

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
