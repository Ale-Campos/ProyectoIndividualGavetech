import { getConnection } from "../database/database";

const getCargaComponente = async (req, res) => {
  res.render("CargarComponente");
};

const cargarComponente = async (req, res) => {
  const connection = await getConnection();
  //La posicion debería ser gestionada por la RasPi
  const { descripcion, imagen, cantidad, posicion, categoria } = req.body;
  await connection.query(
    `
  INSERT INTO producto (descripcion, imagen,stock_virtual,stock_real, posicion, categoria_id) values ('${descripcion}', '${imagen}', ${cantidad}, ${cantidad}, ${posicion},${categoria})`,
    (err, data) => {
      if (err) {
        throw err;
      }
      res.send("Comp. Cargado");
    }
  );
};

const obtenerCategorias = async (req, res) => {
  const connection = await getConnection();
  const categorias = await connection.query(`
  SELECT descripcion, idcategoria 
  FROM categoria
  `);

  console.log(categorias);
  res.json(categorias);
};

export const cargaComponentesMethods = {
  getCargaComponente,
  cargarComponente,
  obtenerCategorias,
};
