import { getConnection } from "./../database/database";
import fs from "fs";
import { qrMethods } from "./../qr/Encriptacion-V1";
import path from "path";

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

const addProduct = async (req, res) => {
  try {
    const { idproducto, descripcion, imagen, stock, posicion, categoria_id } =
      req.body;
    if (
      idproducto === undefined ||
      descripcion === undefined ||
      imagen === undefined ||
      stock === undefined ||
      posicion === undefined ||
      categoria_id === undefined
    ) {
      res.status(400).json({ message: "Llenar todos los campos" }); //Error de cliente
    }
    const producto = {
      idproducto,
      descripcion,
      imagen,
      stock,
      posicion,
      categoria_id,
    };
    const connection = await getConnection();
    await connection.query(`insert into producto SET ?`, producto);
    res.send("Producto agregado");
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

const deleteProduct = async (req, res) => {
  try {
    const idproducto = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM producto WHERE ?",
      idproducto
    );
    res.json(result);
  } catch (error) {
    res.status(500); //500 error de servidor
    res.send(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { idproducto } = req.params;
    const { descripcion, imagen, stock, posicion, categoria_id } = req.body;
    if (
      idproducto === undefined ||
      descripcion === undefined ||
      imagen === undefined ||
      stock === undefined ||
      posicion === undefined ||
      categoria_id === undefined
    ) {
      res.status(400).json({ message: "dLlenar todos los campos" }); //Error de cliente
    }
    const producto = {
      idproducto,
      descripcion,
      imagen,
      stock,
      posicion,
      categoria_id,
    };
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE producto SET ? WHERE idproducto = ?",
      [producto, idproducto]
    );
    res.json(result);
  } catch (error) {
    res.status(500); //500 error de servidor
    res.send(error.message);
  }
};

const pruebaIndex = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile(
    __dirname + "./../../public/views/index.html",
    null,
    (err, data) => {
      if (err) throw err;
      res.write(data);
      res.end();
    }
  );
};
const pruebaIndex2 = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile(
    __dirname + "./../../public/views/index2.html",
    null,
    (err, data) => {
      if (err) throw err;
      res.write(data);
      res.end();
    }
  );
};
const home = (req, res) => {
  res.render("home");
};

const sendInfo = async (req, res) => {
  const { idProducto, descripcion, imagen, stock, posicion, categoria_id } =
    req.body;
  const nuevoProducto = {
    idProducto,
    descripcion,
    imagen,
    stock,
    posicion,
    categoria_id,
  };
  console.log(nuevoProducto);
  const connection = await getConnection();
  const result = await connection.query(
    `insert into producto SET ?`,
    nuevoProducto
  );
  res.send("Producto agregado");
};
const enviarStringQr = async (req, res) => {
  const { idProducto, descripcion } = req.body;
  let string = idProducto + descripcion;

  const obj = {
    idProducto,
    descripcion,
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

export const methods = {
  getProducts,
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  pruebaIndex,
  pruebaIndex2,
  home,
  sendInfo,
  enviarStringQr,
};
