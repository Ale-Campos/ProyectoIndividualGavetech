import { getConnection } from "../database/database";
import { usuarioLogueado } from "./login.controller";

const menuPrincipal = (req, res) => {
  if (usuarioLogueado.estaLogeado && !usuarioLogueado.esProfesor) {
    res.render("MenuAlumno");
  } else {
    res.render("AccesoDenegado");
  }
};

const misPedidos = async (req, res) => {
  if (usuarioLogueado.estaLogeado && !usuarioLogueado.esProfesor) {
    res.render("MisPedidos");
  } else {
    res.render("AccesoDenegado");
  }
};

export const menuAlumnoMethods = {
  menuPrincipal,
  misPedidos,
};
