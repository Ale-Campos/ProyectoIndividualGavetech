import { getConnection } from "../database/database";

const getCargaPedidos = async (req, res) =>{
    res.render("CargarComponente");
};

export const cargaComponentesMethods = {
    getCargaPedidos
};