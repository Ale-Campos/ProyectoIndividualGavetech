import { getConnection } from "../database/database";

const menuPrincipal = (req, res) => {
  res.render("MenuAlumno");
};
const generarPedido = (req, res) => {
  res.render("GenerarPedido");
};

export const menuAlumnoMethods = {
  menuPrincipal,
  generarPedido,
};
