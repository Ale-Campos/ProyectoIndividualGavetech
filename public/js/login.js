const urlPrincipal = "http://localhost:4000";

function login() {
  const email = document.getElementById("email").value;
  const contraseña = document.getElementById("contraseña").value;
  const log = {
    email: email,
    contraseña: contraseña,
  };

  enviarInfo(log);
}
async function register() {
  redirect(urlPrincipal + "/register");
}
async function enviarInfo(alumno) {
  let responseJson;
  let result;
  let jsonString = JSON.stringify(alumno);

  await fetch(window.location, {
    method: "POST",
    body: JSON.stringify(alumno),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (responseJson = data));
  result = responseJson.result;
  switch (result) {
    case "correcto":
      let url = responseJson.redirect;

      redirect(url);
      break;
    case "incompleto":
      window.alert("Debe completar el formulario");
      break;
    case "inexistente":
      window.alert("No hay ningun usuario con ese mail");
      break;
    case "contraseña invalida":
      window.alert("Contraseña incorrecta");
      break;
  }
}
function redirect(url) {
  window.location.href = url;
}
