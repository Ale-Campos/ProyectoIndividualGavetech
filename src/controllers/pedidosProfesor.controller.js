import { getConnection } from "../database/database";
import { usuarioLogueado } from "./login.controller";

const obtenerPedidosPendientes = async (req, res) => {
  const connection = await getConnection();
  const pedidosPendientes = await connection.query(
    `select idpedido,fecha,alumno.nombre,aprobado from pedido,alumnocurso inner join alumno where pedido.alumnocurso_id = alumnocurso.idalumnocurso and alumnocurso.alumno_id = alumno.dni and pedido.aprobado=0 and rechazado=0;`
  );
  console.log(pedidosPendientes);
  res.json(pedidosPendientes);
};
const getPedido = async (req, res) => {
  const idPedido = req.params.id;
  const connection = await getConnection();
  console.log("Id Pedido:" + idPedido);
  await connection.query(`
  UPDATE pedido
  SET aprobado= 1
  WHERE idpedido = ${idPedido}
  `);
  const pedido = await connection.query(
    `select * from pedido where idpedido = ${idPedido}`
  );
  console.log(pedido);
  res.json(pedido);
};

const deletePedido = async (req, res) => {
  const idPedido = req.params.id;
  const connection = await getConnection();

  await connection.query(`
  DELETE FROM pedido
  WHERE idpedido = ${idPedido}
  `);

  res.send("Todo correcto");
};
const agregarComentario = async (req, res) => {
  const { idpedido, comentario } = req.body;
  console.log("Este es el body");
  console.log(req.body);
  const connection = await getConnection();
  await connection.query(`
  UPDATE pedido
  SET comentario = '${comentario}', rechazado =1
  WHERE idpedido = ${idpedido};
  `);
  res.send("Comentario agregado");
};
export const pedidosProfesorMethods = {
  obtenerPedidosPendientes,
  getPedido,
  deletePedido,
  agregarComentario,
};
