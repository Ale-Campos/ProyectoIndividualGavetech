import getConnection from "./../database/database.js";

const obtenerStock = async (req,res) =>{
const connection = await getConnection();
const productos = await connection.query(`SELECT * from producto`);
console.log(productos);
res.json(productos);
};

const gestPedidos = (req,res) =>{
    res.render("gestStock");
};

export const gestPedidosMethods ={
    obtenerStock,gestPedidos
};