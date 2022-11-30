
import getConnection from "../database/database.js";

const actualizarStock = async (req,res) => {
    const {idproducto, cantidad} = req.body;
    console.log("Id Producto: " + idproducto + "Cantidad: " + cantidad);
    const connection = await getConnection();
     await connection.query(`
     UPDATE producto
     SET stock_real= ${cantidad}, stock_virtual=${cantidad}
     WHERE idproducto= ${idproducto}
     `);
     res.send("Strock actualizado");
}

const getProductos = async (req,res) =>{
    const connection = await getConnection();
    const productos= await connection.query(`
    SELECT * FROM producto;
    `);
    res.json(productos)
}

const actualizarDevolucion = async (req,res) => {
    try{
    console.log("Entro al request");
    console.log(req.body);
    const  {id_pedido, id_producto, cantidad, comentario} = req.body;
    const connection = await getConnection();
    await connection.query(`
    INSERT INTO devolucion (id_pedido, id_producto, cantidad, comentario)
    VALUES (${id_pedido}, ${id_producto}, ${cantidad},'${comentario}')
    `)
    res.send("Devolucion Registrada")
    } catch(error){
        res.send("Error en la información suministrada")
    }
}

export const raspiMethod={
    actualizarStock, getProductos, actualizarDevolucion
}

