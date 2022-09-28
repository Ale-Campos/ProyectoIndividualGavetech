const urlPrincipal = "http://localhost:4000";
function generarPedido() {
  window.location.href = urlPrincipal + "/generarPedido";
}
function misPedidos() {
  window.location.href = urlPrincipal + "/menuAlumno/misPedidos";
}

async function cerrarSesion() {
  fetch(urlPrincipal + "/login/prueba/deslog").then(() => {
    window.location.href = urlPrincipal + "/login";
  });
}
