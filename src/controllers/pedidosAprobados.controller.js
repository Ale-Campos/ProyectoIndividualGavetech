import { getConnection } from "./../database/database";

const getPedidosAprobados = async (req, res) => {
  const connection = await getConnection();
  const pedidosPendientes = await connection.query(
    `select idpedido,fecha,alumno.nombre, alumno.apellido,aprobado from pedido,alumnocurso inner join alumno where pedido.alumnocurso_id = alumnocurso.idalumnocurso and alumnocurso.alumno_id = alumno.dni and pedido.aprobado=1;`
  );
  console.log(pedidosPendientes);
  res.json(pedidosPendientes);
};

export const pedidosAprobadosMethods = {
  getPedidosAprobados,
};
