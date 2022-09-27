import { usuarioLogueado } from "./login.controller";
const menuPrincipal = (req, res) => {
  if (usuarioLogueado.esProfesor) {
    res.render("menuProfesor");
  } else {
    res.render("AccesoDenegado");
  }
};
const pedidosPendientes = (req, res) => {
  res.render("solicitudesPendientes");
};

export const menuProfesorMethods = {
  menuPrincipal,
  pedidosPendientes,
};
