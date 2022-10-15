import { getConnection } from "../database/database";
import { usuarioLogueado } from "./login.controller";

const obtenerPedidosPendientes = async (req, res) => {
  const connection = await getConnection();
  const pedidosPendientes = await connection.query(
    `select idpedido,fecha,alumno.nombre, alumno.apellido,aprobado from pedido,alumnocurso inner join alumno where pedido.alumnocurso_id = alumnocurso.idalumnocurso and alumnocurso.alumno_id = alumno.dni and pedido.aprobado=0 and rechazado=0;`
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

  const connection = await getConnection();
  await connection.query(`
  UPDATE pedido
  SET comentario = '${comentario}', rechazado =1
  WHERE idpedido = ${idpedido};
  `);
  await restaurarStock(idpedido);
  res.send("Comentario agregado");
};
async function restaurarStock(idPedido) {
  const connection = await getConnection();
  let itemsPedidos = await connection.query(
    `
  SELECT producto_id, cantidad 
  FROM itempedido
  WHERE itempedido.pedido_id = ${idPedido}
  `
  );
  const json = JSON.parse(JSON.stringify(itemsPedidos));
  console.log(json[0]);
  json.forEach(async (item) => {
    console.log("ID ITEM PEDIDO: " + item.producto_id);
    let cantidadActual = await connection.query(`
      SELECT stock_virtual
      FROM producto
      WHERE idproducto = ${item.producto_id};
      `);
    cantidadActual = cantidadActual[0].stock_virtual;
    const cantActualizada = cantidadActual + item.cantidad;

    await connection.query(`
    UPDATE producto
    SET stock_virtual = ${cantActualizada}
    WHERE idproducto = ${item.producto_id}
    `);
  });
}
const obtenerItemsPedidos = async (req, res) => {
  const idpedido = req.params.idpedido;
  const connection = await getConnection();

  const itemsPedidos = await connection.query(`
  SELECT cantidad, descripcion
  FROM itempedido INNER JOIN producto
  WHERE itempedido.producto_id = producto.idproducto AND pedido_id=${idpedido};
  `);

  res.json(itemsPedidos);
};

export const pedidosProfesorMethods = {
  obtenerPedidosPendientes,
  getPedido,
  deletePedido,
  agregarComentario,
  obtenerItemsPedidos,
};
