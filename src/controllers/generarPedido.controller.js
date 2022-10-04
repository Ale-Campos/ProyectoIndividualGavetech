import { getConnection } from "../database/database";
import { qrMethods } from "./../qr/Encriptacion-V1";
import { usuarioLogueado } from "./login.controller";

const generarPedido = (req, res) => {
  if (usuarioLogueado.estaLogeado) {
    res.render("GenerarPedido");
  } else {
    res.render("AccesoDenegado");
  }
};
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
  const connection = await getConnection();
  let string = idProducto + "/" + cantidad + `/${usuarioLogueado.nombre}`;

  const obj = {
    idProducto,
    cantidad,
  };

  for (let index = 0; index < idProducto.length; index++) {
    acutalizarStock(idProducto[index], cantidad[index]);
  }

  console.log(obj);

  const stringEncriptado = qrMethods.encrypt(string);
  const stringDesencriptado = qrMethods.decrypt(stringEncriptado);
  ////CAMBIAR stringDesencriptado por stringEncriptado, es solo de preueba
  qrMethods.QRCode.toDataURL(stringDesencriptado, async (err, data) => {
    if (err) throw err;

    const idAlumnoCurso = JSON.stringify(
      await connection.query(
        `select idalumnocurso from alumnocurso where alumno_id = ${usuarioLogueado.id} `
      )
    );
    console.log(idAlumnoCurso);
    const objetoIdAlumno = JSON.parse(idAlumnoCurso);
    var date;
    date = new Date();
    date =
      date.getUTCFullYear() +
      "-" +
      ("00" + (date.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getUTCDate()).slice(-2) +
      " " +
      ("00" + date.getUTCHours()).slice(-2) +
      ":" +
      ("00" + date.getUTCMinutes()).slice(-2) +
      ":" +
      ("00" + date.getUTCSeconds()).slice(-2);
    console.log(date);
    await connection.query(
      `insert into pedido (alumnocurso_id,fecha,string_qr) values (${objetoIdAlumno[0].idalumnocurso}, '${date}','${data}')`
    );
    const urlDb = await connection.query(`SELECT string_qr 
    FROM alumnocurso inner join pedido on alumnocurso_id=${objetoIdAlumno[0].idalumnocurso};`); //CONSULTA SQL PARA OBTENER EL QR E INSERTARLA EN UNA IMAGEN. ESTA COSNULTA SOLO TRAE EL PRIMER REGISTRO, NO TRAE EL RESTO.

    const urlObj = JSON.parse(JSON.stringify(urlDb))[0].string_qr; //Hay que hacer que esto pase el string y que en el js de front lo recorra e imprima las cosas.
    console.log(urlObj);
    const urldata = {
      url: urlObj,
    };
    res.json(urldata);
  });
};

async function acutalizarStock(idProducto, cantidad) {
  const connection = await getConnection();
  connection.query(`


  UPDATE producto
  SET stock_virtual = stock_virtual - ${cantidad}
  WHERE idproducto = ${idProducto}`);
}

export const pedidosMethods = {
  getProducts,
  generarPedido,
  getProduct,
  enviarStringQr,
};
