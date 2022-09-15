import { getConnection } from "../database/database";
import { qrMethods } from "./../qr/Encriptacion-V1";

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
  const getProduct = async (req, res) => {
    try {
      const idproducto = req.params;
      const connection = await getConnection();
      const result = await connection.query(
        "SELECT * FROM producto WHERE ?",
        idproducto
      );
      res.json(result);
    } catch (error) {
      res.status(500); //500 error de servidor
      res.send(error.message);
    }
  };
  const enviarStringQr = async (req, res) => {
    const { idProducto, cantidad } = req.body;
    let string = idProducto + cantidad;
  
    const obj = {
      idProducto,
      cantidad,
    };
  
    const stringEncriptado = qrMethods.encrypt(string);
    const stringDesencriptado = qrMethods.decrypt(stringEncriptado);
    ////CAMBIAR stringDesencriptado por stringEncriptado, es solo de preueba
    qrMethods.QRCode.toDataURL(stringDesencriptado, async (err, data) => {
      if (err) throw err;
      //Recordar siempre trabajar con JSONs
      const urldata = {
        url: data,
      };
      res.json(urldata);
    });
  };

  export const pedidosMethods = {
    getProducts,
    generarPedido,getProduct,enviarStringQr
  }