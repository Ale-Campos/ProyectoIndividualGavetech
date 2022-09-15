let selecciones = [];
fetch(window.location + "/list")//MODIFICAR ESTA DIRECCION
  .then((response) => response.json())
  .then((data) => mostarData(data))
  .catch((err) => console.log(err));

  const mostarData = (data) => {
  console.log(data);
  const select2 = document.getElementById("select2");
  for (let index = 0; index < data.length; index++) {
    let option = document.createElement("option");
    option.text = data[index].descripcion;
    option.value = data[index].idproducto;

    select2.appendChild(option);
  }
};
