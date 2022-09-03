async function leerIngresos() {
  const idProducto = document.querySelector("#idProducto").value;
  const descripcion = document.querySelector("#descripcion").value;
  const imagen = document.querySelector("#imagen").value;
  const stock = document.querySelector("#stock").value;
  const posicion = document.querySelector("#posicion").value;
  const categoria_id = document.querySelector("#categoria_id").value;
  let productoNuevo = {
    idProducto,
    descripcion,
    imagen,
    stock,
    posicion,
    categoria_id,
  };

  const response = await fetch("/home/send", {
    method: "POST",
    body: JSON.stringify(productoNuevo),
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log("Response front " + response);
  const result = response.json();
  return result;
}
