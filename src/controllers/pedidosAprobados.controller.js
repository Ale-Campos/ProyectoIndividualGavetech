import { getConnection } from "./../database/database";

const getPedidosAprobados = async (req, res) => {
  const connection = await getConnection();
  const pedidosPendientes = await connection.query(
    `select idpedido,fecha,alumno.nombre, alumno.apellido,aprobado from pedido,alumnocurso inner join alumno where pedido.alumnocurso_id = alumnocurso.idalumnocurso and alumnocurso.alumno_id = alumno.dni and pedido.aprobado=1;`
  );
  console.log(pedidosPendientes);
  res.json(pedidosPendientes);
};

const getDevoluciones = async (req, res) => {
  const idpedido = req.params.idpedido;
  const connection = await getConnection();
  const devoluciones = await connection.query(`
  SELECT descripcion, cantidad FROM devolucion INNER JOIN producto WHERE devolucion.id_pedido = ${idpedido} AND producto.idproducto = devolucion.id_producto
  
  `);
  console.log(devoluciones);
  res.json(devoluciones);
};

export const pedidosAprobadosMethods = {
  getPedidosAprobados,
  getDevoluciones,
};
