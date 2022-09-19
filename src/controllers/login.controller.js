import { getConnection } from "../database/database";
import path from "path";
import bcryptjs from "bcryptjs";
let usuario = {
  id: null,
  nombre: null,
  apellido: null,
  estaLogeado: false,
  esProfesor: false,
};
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
        console.log("Las contraseñas coinciden");
        usuario.estaLogeado = true;
        usuario.id = alumno[0].dni;
        usuario.nombre = alumno[0].nombre;
        usuario.apellido = alumno[0].apellido;
        res.json({
          result: "correcto",
          redirect: "http://localhost:4000/menuAlumno/",
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
        usuario.estaLogeado = true;
        usuario.esProfesor = true;
        usuario.id = profesor[0].dni;
        usuario.nombre = profesor[0].nombre;
        usuario.apellido = profesor[0].apellido;
        console.log("Es profesor");
        res.json({
          result: "correcto",
          redirect: "http://localhost:4000/menuProfesor/",
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
  res.render("login");
};

const prueba = (req, res) => {
  res.json(usuario);
};
const pruebaDeslog = (req, res) => {
  usuario.id=0;
  usuario.esProfesor = false;
  usuario.estaLogeado = false;
  usuario.dni = null;
  usuario.nombre = null;
  usuario.apellido = null;
  res.json(usuario);
};
export const usuarioLogueado = usuario;
export const loginMethods = {
  login,
  loginView,
  prueba,
  pruebaDeslog,
};
