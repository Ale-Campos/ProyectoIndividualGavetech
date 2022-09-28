const urlPrincipal = "http://localhost:4000";
let pedidos = null;
fetch(urlPrincipal + "/pedidosPendientes")
  .then((response) => response.json())
  .then((data) => mostarData(data))
  .catch((err) => console.log(err));
//<button><i class="fa-solid fa-circle-xmark"></i></button>
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
    const button1 = document.createElement("button");
    button1.id = element.idpedido;
    button1.addEventListener("click", () => {
      aceptarPedido(button1.id);
    });
    const button2 = document.createElement("button");
    button2.id = element.idpedido;
    button2.addEventListener("click", () => {
      denegarPedido(button1.id);
    });
    const tagIDenied = document.createElement("i");
    const tagIAccept = document.createElement("i");
    tagIDenied.className = "fa-solid fa-circle-xmark";
    tagIAccept.className = "fa-solid fa-square-check";

    button1.appendChild(tagIAccept);
    button2.appendChild(tagIDenied);
    td5.appendChild(button1);
    td5.appendChild(button2);
    td1.textContent = element.idpedido;
    td2.textContent = element.fecha;
    td3.textContent = element.nombre;
    td4.textContent = element.aprobado;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tabla.appendChild(tr);
  });
};

function aceptarPedido(id) {
  fetch(urlPrincipal + `/pedidosPendientes/getPedido/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
}

async function denegarPedido(id) {
  fetch(urlPrincipal + `/pedidosPendientes/deletePedido/${id}`, {
    method: "DELETE",
  }).then(() => {
    location.reload();
  });
}
