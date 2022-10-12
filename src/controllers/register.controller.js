import { getConnection } from "../database/database";
import path from "path";
import bcryptjs from "bcryptjs";
import config from "./../config";

const register = async (req, res) => {
  const { dni, nombre, apellido, email, contraseña, curso } = req.body;
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
  const cursoBuscado = await connection.query(
    `select id_curso from curso where id_curso = '${curso}'`
  );
  if (cursoBuscado.length != 0) {
    await connection.query(
      `insert into alumno SET ?`,
      alumno,
      async (err, data) => {
        if (err) {
          console.log("Hay un error");
          console.log(err);
          res.json({
            result: "existente",
            redirect: "",
          });
        } else {
          await connection.query(
            `insert into alumnocurso (curso_id,alumno_id) values ('${curso}', ${dni})`,
            (err, data) => {
              if (err) {
                console.log(err);
                console.log("Error de Curso");
                res.json({
                  result: "existente",
                  redirect: "",
                });
              } else {
                res.json({
                  result: "correcto",
                  redirect: config.url + "/login/",
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.json({
      result: "existente",
      redirect: "",
    });
  }
};

const registerView = (req, res) => {
  res.sendFile(path.resolve(__dirname, "./../../public/views/register.html"));
};

export const methodsAlumnos = {
  register,
  registerView,
};
