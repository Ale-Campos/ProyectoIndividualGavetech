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
    const button1 = document.createElement("button");
    button1.id = element.idpedido;
    
    const tagI = document.createElement("i");
    tagI.className = "fa-regular fa-circle-check";


    button1.appendChild(tagI);
    td5.appendChild(button1);
    td1.textContent = element.idpedido;
    td2.textContent = element.fecha;
    td3.textContent = element.nombre;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    
    tr.appendChild(td5);
    tabla.appendChild(tr);
  });
};