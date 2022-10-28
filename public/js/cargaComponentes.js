const urlPrincipal = "http://localhost:4000";

fetch(window.location + "/obtenerCategorias")
  .then((response) => response.json())
  .then((data) => cagrarSelect2(data))
  .catch((err) => console.log(err));

const cagrarSelect2 = (data) => {
  console.log(data);
  const select2 = document.getElementById("select2");
  for (let index = 0; index < data.length; index++) {
    let option = document.createElement("option");
    option.text = data[index].descripcion;

    option.value = data[index].idcategoria;
    select2.appendChild(option);
    console.log(data[index].idcategoria);
  }
};

async function cargarComponentes() {
  const descripcion = document.getElementById("descripcion").value;
  const imagen = document.getElementById("imagen").value;
  const cantidad = document.getElementById("cantidad").value;
  const posicion = document.getElementById("gaveta").value;
  const categoria = document.getElementById("select2").value;
  if (
    descripcion === "" ||
    imagen === "" ||
    cantidad === "" ||
    posicion === ""
  ) {
    window.alert("Todos los campos son obligatorios");
    return;
  }
  if (categoria == "SC") {
    window.alert("Categoría inválida");
    return;
  }
  const json = {
    descripcion: descripcion,
    imagen: imagen,
    cantidad: cantidad,
    posicion: posicion,
    categoria: categoria,
  };

  console.log(json);

  await fetch(urlPrincipal + "/cargaComponentes", {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-type": "application/json",
    },
  });
}

async function cerrarSesion() {
  fetch(urlPrincipal + "/login/prueba/deslog").then(() => {
    window.location.href = urlPrincipal + "/login";
  });
}
