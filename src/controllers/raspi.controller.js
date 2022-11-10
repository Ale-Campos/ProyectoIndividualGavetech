
import getConnection from "../database/database.js";

const actualizarStock = async (req,res) => {
    const {idproducto, cantidad} = req.body;
    const connection = await getConnection();
     await connection.query(`
     UPDATE producto
     SET stock_real= ${cantidad}, stock_virtual=${cantidad}
     WHERE idproducto= ${idproducto}
     `);
     res.send("Carga realizada");
}

const getProductos = async (req,res) =>{
    const connection = await getConnection();
    const productos= await connection.query(`
    SELECT * FROM producto;
    `);
    res.json(productos)
}

const actualizarDevolucion = async (req,res) => {
    const  {id_pedido, id_producto, cantidad, comentario} = req.body;
    const connection = await getConnection();
    connection.query(`
    INSERT INTO devolucion (id_pedido, id_producto, cantidad, comentario)
    VALUES (${id_pedido}, ${id_producto}, ${cantidad}, ${comentario})
    `)
    res.send("Devolucion Registrada")
}

export const raspiMethod={
    actualizarStock, getProductos, actualizarDevolucion
}

