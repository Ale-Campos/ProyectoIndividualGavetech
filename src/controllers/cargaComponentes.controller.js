import getConnection  from "../database/database.js";

const getCargaComponente = async (req, res) => {
  res.render("CargarComponente");
};

const cargarComponente = async (req, res) => {
  const connection = await getConnection();
  //La posicion debería ser gestionada por la RasPi
  const { descripcion, imagen, posicion, categoria } = req.body;

  await connection.query(
    `
  INSERT INTO producto (descripcion, imagen, posicion, categoria_id) values ('${descripcion}', '${imagen}', ${posicion},${categoria})`,
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
