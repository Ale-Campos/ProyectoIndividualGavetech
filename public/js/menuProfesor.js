const urlPrincipal = "http://localhost:4000";

async function solicitudesPendientes() {
  window.location.href = window.location + "solicitudesPendientes";
}

async function cerrarSesion() {
  fetch(urlPrincipal + "/login/prueba/deslog").then(() => {
    window.location.href = urlPrincipal + "/login";
  });
}

async function solicitudesAprobadas() {
  window.location.href = window.location + "solicitudesAprobadas";
}

async function gestPedidos() {
  window.location.href = urlPrincipal + "/gestionarPedidos";
}

async function cargaComponentes(){
  window.location.href = urlPrincipal + "/cargaComponentes";
}