const urlPrincipal = "http://localhost:4000";


async function cargarComponentes(){
    const descripcion = document.getElementById("descripcion").value;
    const imagen = document.getElementById("imagen").value;
    const cantidad = document.getElementById("cantidad").value;
    const posicion = document.getElementById("gaveta").value;
    
    const json = {
        descripcion: descripcion,
        imagen: imagen,
        cantidad: cantidad,
        posicion: posicion
    }
    
    console.log(json);

    await fetch(urlPrincipal + "/cargaComponentes", {
        method: "POST",
        body:JSON.stringify(json),
        headers: {
            "Content-type":"application/json"
        }

    })
    

}