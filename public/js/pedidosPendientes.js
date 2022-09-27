const urlPrincipal = "http://localhost:4000";
const pedidos = fetch(urlPrincipal + "/pedidosPendientes");

console.log(pedidos);
