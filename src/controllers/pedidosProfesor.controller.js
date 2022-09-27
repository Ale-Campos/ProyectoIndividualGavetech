import { getConnection } from "../database/database";
import { usuarioLogueado } from "./login.controller";

const obtenerPedidosPendientes = async (req, res) => {
  const connection = await getConnection();
  const pedidosPendientes = await connection.query(
    `select idpedido,fecha,alumno.nombre,aprobado from pedido,alumnocurso inner join alumno where pedido.alumnocurso_id = alumnocurso.idalumnocurso and alumnocurso.alumno_id = alumno.dni;`
  );
  console.log(pedidosPendientes);
  res.json(pedidosPendientes);
};

export const pedidosProfesorMethods = {
  obtenerPedidosPendientes,
};
