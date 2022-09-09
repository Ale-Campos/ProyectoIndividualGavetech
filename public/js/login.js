/*async function  agregarAlumno(){
    const dni = document.querySelector("#dni").value;
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const email = document.querySelector("#email").value;

    const alumno = {
        dni, nombre, apellido, email
    }
    await fetch(window.location + "register/send", {
        method: "POST",
        body: JSON.stringify(alumno),
        headers: {
          "Content-type": "application/json",
        },
      });

} */