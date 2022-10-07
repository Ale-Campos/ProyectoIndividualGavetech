import { getConnection } from "../database/database";

const getCargaComponente = async (req, res) => {
  res.render("CargarComponente");
};

const cargarComponente = async (req, res) => {
  const connection = await getConnection();
  const { descripcion, imagen, cantidad, posicion } = req.body;
  await connection.query(
    `
  INSERT INTO producto (descripcion, imagen,stock_virtual,stock_real, posicion, categoria_id) values ('${descripcion}', '${imagen}', ${cantidad}, ${cantidad}, ${posicion},1)`,
    (err, data) => {
      if (err) {
        throw err;
      }
      res.json(data);
    }
  );
};

export const cargaComponentesMethods = {
  getCargaComponente,
  cargarComponente,
};
