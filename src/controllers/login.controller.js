import { getConnection } from "../database/database";
import path from "path";
import bcryptjs from "bcryptjs";

const login = async (req, res) => {
  const { email, contraseña } = req.body;
  if (email == "" || contraseña == "") {
    console.log("Formulario incompleto");
    res.json({
      result: "incompleto",
      redirect: "",
    });
  } else {
    const connection = await getConnection();
    let alumno = await connection.query(
      `SELECT * FROM alumno WHERE email = '${email}'`
    );
    if (alumno.length === 0) {
      console.log("No hay alumnos con ese mail");
      res.json({
        result: "inexistente",
        redirect: "",
      });
    } else {
      console.log("Contraseña: " + alumno[0].contraseña);
      if (await bcryptjs.compare(contraseña, alumno[0].contraseña)) {
        console.log("Las contraseñas coinciden");
        res.json({
          result: "correcto",
          redirect: "http://localhost:4000/home/",
        });
      } else {
        console.log("Las contraseñas no coinciden");
        res.json({
          result: "contraseña invalida",
          redirect: "",
        });
      }
    }
  }
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
