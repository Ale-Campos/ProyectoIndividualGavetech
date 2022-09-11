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
async function enviarInfo(alumno) {
  let jsonString = JSON.stringify(alumno);
  console.log(jsonString);
  await fetch(window.location + "verify", {
    method: "POST",
    body: JSON.stringify(alumno),
    headers: {
      "Content-type": "application/json",
    },
  });
}
