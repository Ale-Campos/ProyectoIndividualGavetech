 function  agregarAlumno(){
    const dni = document. getElementById("dni").value;
    const nombre = document. getElementById("nombre").value;
    const apellido = document. getElementById("apellido").value;
    const email = document. getElementById("email").value;
    const contraseña = document.getElementById("contraseña").value;

    if(dni ==""||nombre == ""||apellido ==""|| email==""||contraseña==""){
        
    }

    const alumno = {
        dni : dni, nombre: nombre, apellido: apellido, email:email, contraseña : contraseña
    }
    console.log(alumno);
    enviarInfo(alumno);
};

    async function enviarInfo(alumno){
        let jsonString = JSON.stringify(alumno)
        console.log(jsonString);
    await fetch(window.location, {
        method: "POST",
        body: JSON.stringify(alumno),
        headers: {
          "Content-type": "application/json",
        },
      });

}; 