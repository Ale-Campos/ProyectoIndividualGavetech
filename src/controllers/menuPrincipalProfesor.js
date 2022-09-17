import { usuarioLogueado } from "./login.controller";
const menuPrincipal = (req, res) => {
  if (usuarioLogueado.esProfesor) {
    res.render("menuProfesor");
  } else {
    res.render("AccesoDenegado");
  }
};

export const menuProfesorMethods = {
  menuPrincipal,
};
