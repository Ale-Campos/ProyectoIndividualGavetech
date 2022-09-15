import { getConnection } from "../database/database";

const generarPedido = (req,res) => {
    res.render("GenerarPedido");
}
const getProducts = async (req, res) => {
    try {
      const connection = await getConnection();
      const result = await connection.query("select * from producto");
      console.log(result);
      res.json(result);
    } catch (error) {
      res.status(500); //500 error de servidor
      res.send(error.message);
    }
  };

  export const pedidosMethods = {
    getProducts,
    generarPedido
  }