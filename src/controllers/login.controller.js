import { getConnection } from "../database/database";
import path from "path";
import bcryptjs from "bcryptjs";

const login = async (req, res) => {
  console.log(req.body);
  const { email, contraseña } = req.body;
  const connection = await getConnection();
  let alumno = await connection.query(
    `SELECT * FROM alumno WHERE email = '${email}'`
  );
  console.log(alumno);
  console.log("Contraseña: " + alumno[0].contraseña);
  if (await bcryptjs.compare(contraseña, alumno[0].contraseña)) {
    console.log("Las contraseñas coinciden");
  } else {
    console.log("Las contraseñas no coinciden");
  }

  res.redirect("http://localhost:4000/home/");
};
const loginView = (req, res) => {
  res.render("login");
};

const prueba = (req, res) => {
  res.redirect("http://localhost:4000/home/");
};
export const loginMethods = {
  login,
  loginView,
  prueba,
};
