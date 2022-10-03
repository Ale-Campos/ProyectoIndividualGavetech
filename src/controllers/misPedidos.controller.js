import { usuarioLogueado } from "./login.controller";
import { getConnection } from "./../database/database";

const getPedidos = async (req, res) => {
  const connection = await getConnection();
  const idAlumnoCurso = JSON.stringify(
    await connection.query(
      `select idalumnocurso from alumnocurso where alumno_id = ${usuarioLogueado.id} `
    )
  );
  console.log("-----");
  console.log(idAlumnoCurso);
  const objetoIdAlumno = JSON.parse(idAlumnoCurso);
  console.log("-----");
  const pedidos = await connection.query(`SELECT *
        FROM alumnocurso inner join pedido on alumnocurso_id=${objetoIdAlumno[0].idalumnocurso} AND alumnocurso.alumno_id = ${usuarioLogueado.id};`);

  const pedidosArray = JSON.parse(JSON.stringify(pedidos));
  console.log(pedidosArray);
  res.json(pedidosArray);
};

export const misPedidosMethdos = {
  getPedidos,
};