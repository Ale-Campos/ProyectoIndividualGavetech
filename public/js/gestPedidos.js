const urlPrincipal = "http://localhost:4000";

fetch(urlPrincipal + "/gestionarPedidos/obtenerPedidos").then(res =>res.json()).then(data => mostarData(data));


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
      const td6 = document.createElement("td");
      const button1 = document.createElement("button");
      button1.id = element.idproducto;
     
      const tagI = document.createElement("i");
      tagI.className = "fa-solid fa-pen-to-square";
      const img = document.createElement("img");
      img.src=element.imagen;
      td6.appendChild(img);
      button1.appendChild(tagI);
     
      td5.appendChild(button1);
      td1.textContent = element.idproducto;
      td2.textContent = element.descripcion;
      td3.textContent = element.stock;
      td4.textContent = element.posicion;
      tr.appendChild(td4);
      tr.appendChild(td6);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td1);
      tr.appendChild(td5);
      tabla.appendChild(tr);
    });
  };