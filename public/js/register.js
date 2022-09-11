function agregarAlumno() {
  const dni = document.querySelector("#dni").value;
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const email = document.querySelector("#email").value;
  const contraseña = document.querySelector("#contraseña").value;
  console.log(nombre);
  if (
    dni === "" ||
    nombre === "" ||
    apellido === "" ||
    email === "" ||
    contraseña === ""
  ) {
    window.alert("Todos los campos son requeridos");
  } else {
    const alumno = {
      dni: dni,
      nombre: nombre,
      apellido: apellido,
      email: email,
      contraseña: contraseña,
    };
    console.log(alumno);
    enviarInfo(alumno);
  }
}

async function enviarInfo(alumno) {
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
    .then((response) => response.json())
    .then((data) => (result = data));
  console.log(result);
  if (result.result == "correcto") {
    window.alert("todo correct");
    window.location.href = result.redirect;
  } else {
    window.alert("Coso existente");
  }
}
