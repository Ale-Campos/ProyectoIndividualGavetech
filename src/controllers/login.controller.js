import getConnection from "../database/database.js";
import path from "path";
import bcryptjs from "bcryptjs";
import config from "./../config.js";

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
    let profesor = await connection.query(
      `SELECT * FROM profesor WHERE email = '${email}'`
    );
    if (alumno.length != 0) {
      if (await bcryptjs.compare(contraseña, alumno[0].contraseña)) {
        req.session.usuario = {
          id: alumno[0].dni,
          nombre: alumno[0].nombre,
          apellido: alumno[0].apellido,
          estaLogeado: true,
          esProfesor: false,
        };
        console.log(req.session.usuario);
        console.log("REDIRECCIONO");
        res.json({
          result: "correcto",
          redirect: config.url + "/menuAlumno/",
        });
        console.log("Es alumno");
      } else {
        console.log("Las contraseñas no coinciden");
        res.json({
          result: "contraseña invalida",
          redirect: "",
        });
      }
    } else if (profesor.length != 0) {
      if (await bcryptjs.compare(contraseña, profesor[0].contraseña)) {
        console.log("Las contraseñas coinciden");

        req.session.usuario = {
          id: profesor[0].dni,
          nombre: profesor[0].nombre,
          apellido: profesor[0].apellido,
          estaLogeado: true,
          esProfesor: true,
        };
        console.log("Es profesor");
        res.json({
          result: "correcto",
          redirect: config.url + "/menuProfesor/",
        });
      } else {
        console.log("Es profe pero las contraseñas no coinciden");
        res.json({
          result: "contraseña invalida",
          redirect: "",
        });
      }
    } else {
      console.log("No existe");
      res.json({
        result: "inexistente",
        redirect: "",
      });
    }
  }
};
const loginView = (req, res) => {
  req.session.usuario = {
    id: null,
    nombre: null,
    apellido: null,
    estaLogeado: false,
    esProfesor: false,
  };
  console.log(req.session.usuario);
  res.render("login");
};

const prueba = (req, res) => {
  // res.json(usuario);
};
const pruebaDeslog = (req, res) => {
  req.session.usuario = {
    id: null,
    nombre: null,
    apellido: null,
    estaLogeado: false,
    esProfesor: false,
  };
  res.json(req.session.usuario);
};

export const loginMethods = {
  login,
  loginView,
  prueba,
  pruebaDeslog,
};
