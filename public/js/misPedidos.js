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
    const img = document.createElement("img");
    const anchor = document.createElement("a");
    anchor.href = element.string_qr;
    td1.textContent = element.idpedido;
    td2.textContent = element.fecha;
    img.src = element.string_qr;
    anchor.appendChild(img);
    td3.appendChild(anchor);
    td4.textContent = element.aprobado;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tabla.appendChild(tr);
  });

  console.log(data);
};
