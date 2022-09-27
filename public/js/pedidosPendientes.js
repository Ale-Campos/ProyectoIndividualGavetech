const urlPrincipal = "http://localhost:4000";
let pedidos = null;
fetch(urlPrincipal + "/pedidosPendientes")
  .then((response) => response.json())
  .then((data) => {
    pedidos = data; //ME QUEDE ACA, HAY QUE HACER LA FUNCION PARA QUE INSERTE LAS FILAS
  });
console.log(pedidos);
