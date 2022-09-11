const urlPrincipal = "http://localhost:4000";
function login() {
  const email = document.getElementById("email").value;
  const contraseña = document.getElementById("contraseña").value;
  console.log(email);
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
  console.log(jsonString);
  await fetch(window.location, {
    method: "POST",
    body: JSON.stringify(alumno),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (responseJson = data));
  console.log(responseJson);
  result = responseJson.result;
  let url = responseJson.redirect;
  if (result) {
    redirect(url);
  } else {
    window.alert(
      "Usuario o contraseña inexistente, ingrese nuevamente o regístrese"
    );
    let contenedor = document.getElementById("botonRegister");
    let boton = document.createElement("button");
    boton.textContent = "Registrate";
    contenedor.appendChild(boton);
  }
}
function redirect(url) {
  window.location.href = url;
}
