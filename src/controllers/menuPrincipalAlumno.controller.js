const menuPrincipal = (req, res) => {
  res.render("MenuAlumno");
};

const misPedidos = async (req, res) => {
  res.render("MisPedidos");

  res.render("AccesoDenegado");
};

export const menuAlumnoMethods = {
  menuPrincipal,
  misPedidos,
};
