import { getConnection } from "../database/database";
import path from "path";
import bcryptjs from "bcryptjs";

const register = async (req, res) => {
  const { dni, nombre, apellido, email, contraseña } = req.body;
  let contraseñaHash = await bcryptjs.hash(contraseña, 8);

  const alumno = {
    dni: dni,
    nombre: nombre,
    apellido: apellido,
    email: email,
    contraseña: contraseñaHash,
  };
  const connection = await getConnection();
  await connection.query(`insert into alumno SET ?`, alumno);
  res.send("Todo correcto");
};

const registerView = (req, res) => {
  res.sendFile(path.resolve(__dirname, "./../../public/views/register.html"));
};

export const methodsAlumnos = {
  register,
  registerView,
};
