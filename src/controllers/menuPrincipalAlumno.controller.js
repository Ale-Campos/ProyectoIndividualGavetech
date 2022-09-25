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
    // const connection = await getConnection();
    // const idAlumnoCurso = JSON.stringify(
    //   await connection.query(
    //     `select idalumnocurso from alumnocurso where alumno_id = ${usuarioLogueado.id} `
    //   )
    // );
    // console.log("-----");
    // console.log(idAlumnoCurso);
    // const objetoIdAlumno = JSON.parse(idAlumnoCurso);
    // console.log("-----");
    // const pedidos = await connection.query(`SELECT *
    //   FROM alumnocurso inner join pedido on alumnocurso_id=${objetoIdAlumno[0].idalumnocurso};`); //CONSULTA SQL PARA OBTENER EL QR E INSERTARLA EN UNA IMAGEN. ESTA COSNULTA SOLO TRAE EL PRIMER REGISTRO, NO TRAE EL RESTO.

    // const pedidosArray = JSON.parse(JSON.stringify(pedidos)); //Hay que hacer que esto pase el string y que en el js de front lo recorra e imprima las cosas.
    // console.log(pedidosArray);

    res.render("MisPedidos");
  } else {
    res.render("AccesoDenegado");
  }
};

// const getPedidos = async (req, res) => {
//   const connection = await getConnection();
//   const idAlumnoCurso = JSON.stringify(
//     await connection.query(
//       `select idalumnocurso from alumnocurso where alumno_id = ${usuarioLogueado.id} `
//     )
//   );
//   console.log("-----");
//   console.log(idAlumnoCurso);
//   const objetoIdAlumno = JSON.parse(idAlumnoCurso);
//   console.log("-----");
//   const pedidos = await connection.query(`SELECT *
//       FROM alumnocurso inner join pedido on alumnocurso_id=${objetoIdAlumno[0].idalumnocurso};`); //CONSULTA SQL PARA OBTENER EL QR E INSERTARLA EN UNA IMAGEN. ESTA COSNULTA SOLO TRAE EL PRIMER REGISTRO, NO TRAE EL RESTO.

//   const pedidosArray = JSON.parse(JSON.stringify(pedidos)); //Hay que hacer que esto pase el string y que en el js de front lo recorra e imprima las cosas.
//   console.log(pedidosArray);
//   res.json(pedidosArray);
// };

export const menuAlumnoMethods = {
  menuPrincipal,
  misPedidos,
};
