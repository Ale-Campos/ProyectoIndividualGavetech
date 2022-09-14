import { getConnection } from "../database/database";
import path from "path";
import bcryptjs from "bcryptjs";

const register = async (req, res) => {
  const { dni, nombre, apellido, email, contraseña } = req.body;
  let contraseñaHash = await bcryptjs.hash(contraseña, 8);
  console.log(req.body);
  const alumno = {
    dni: dni,
    nombre: nombre,
    apellido: apellido,
    email: email,
    contraseña: contraseñaHash,
  };
  const connection = await getConnection();
  await connection.query(`insert into alumno SET ?`, alumno, (err, data) => {
    if (err) {
      console.log("Hay un error");
      console.log(err);
      res.json({
        result: "existente",
        redirect: "",
      });
    } else {
      res.json({
        result: "correcto",
        redirect: "http://localhost:4000/login/",
      });
    }
  });
};

const registerView = (req, res) => {
  res.sendFile(path.resolve(__dirname, "./../../public/views/register.html"));
};

export const methodsAlumnos = {
  register,
  registerView,
};
