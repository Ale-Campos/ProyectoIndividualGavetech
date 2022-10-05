import { getConnection } from "../database/database";

const getCargaComponente = async (req, res) =>{
    res.render("CargarComponente");
};

const cargarComponente = (req,res) =>{
    console.log(req.body);
    const {descripcion, imagen, cantidad, posicion} = req.body;
    const obj = {
        descripcion:descripcion,
        imagen:imagen,
        cantidad:cantidad,
        posicion:posicion
    }
    console.log(obj);
    res.json(obj);
}

export const cargaComponentesMethods = {
    getCargaComponente, cargarComponente
};