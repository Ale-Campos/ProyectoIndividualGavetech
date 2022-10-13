const menuPrincipal = (req, res) => {
  console.log(req.session.usuario);

  res.render("menuProfesor");
};
const pedidosPendientes = (req, res) => {
  res.render("solicitudesPendientes");
};

const pedidosAprobados = (req, res) => {
  res.render("solicitudesAprobadas");
};

export const menuProfesorMethods = {
  menuPrincipal,
  pedidosPendientes,
  pedidosAprobados,
};
