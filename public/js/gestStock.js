const urlPrincipal = "http://192.168.0.8:4000";

fetch(urlPrincipal + "/gestionarPedidos/obtenerPedidos")
  .then((res) => res.json())
  .then((data) => mostarData(data));

const mostarData = (data) => {
  const tabla = document.querySelector("#contTabla");
  data.forEach((element) => {
    console.log(element.idproducto);
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");

    const img = document.createElement("img");
    img.src = element.imagen;
    td5.appendChild(img);

    td1.textContent = element.stock_real;
    td2.textContent = element.descripcion;
    td3.textContent = element.stock_virtual;
    td4.textContent = element.posicion;
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td1);

    tabla.appendChild(tr);
  });
};

async function cerrarSesion() {
  fetch(urlPrincipal + "/login/prueba/deslog").then(() => {
    window.location.href = urlPrincipal + "/login";
  });
}
