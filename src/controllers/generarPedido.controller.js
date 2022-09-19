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
  let string = idProducto + cantidad + `/${usuarioLogueado.nombre}`;

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
    
    const idAlumnoCurso= JSON.stringify(await connection.query(`select idalumnocurso from alumnocurso where alumno_id = ${usuarioLogueado.id} `))
    console.log(idAlumnoCurso);
    const objetoIdAlumno = JSON.parse(idAlumnoCurso);
    var date;
date = new Date();
date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
console.log(date);
    await connection.query(`insert into pedido (alumnocurso_id,fecha,string_qr) values (${objetoIdAlumno[0].idalumnocurso}, '${date}','${data}')`)
    const urlDb = await connection.query(`SELECT string_qr 
    FROM alumnocurso inner join pedido on alumnocurso_id=${objetoIdAlumno[0].idalumnocurso};`);//CONSULTA SQL PARA OBTENER EL QR E INSERTARLA EN UNA IMAGEN
    
    const urlObj = JSON.parse(JSON.stringify(urlDb))[0].string_qr;
    console.log(urlObj);
    const urldata = {
      url: urlObj,
    };
    res.json(urldata);
  });
};

export const pedidosMethods = {
  getProducts,
  generarPedido,
  getProduct,
  enviarStringQr,
};
