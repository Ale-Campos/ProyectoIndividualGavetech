
import {getConnection} from "./../database/database";
import path from "path";

////
const register = async (req, res)=>{
//try {
    
    const {dni, nombre, apellido, email} = req;
   // if(dni ===null||nombre === null ||apellido === null, email === null){
        /*res.status(400).json({message: "Todos los campos son requeridos"})
    }*/
    const alumno = {
        dni,
        nombre,
        apellido,
        email
    }
    const connection = await getConnection()
    await connection.query(`insert into alumno SET ?`, alumno);
    res.send("Alumno agregado");
/*} catch (error) {
    res.sendStatus(500);
    res.send(error.message);
}*/
};

const registerView = (req,res) =>{
    res.sendFile(path.resolve(__dirname, "./../../public/views/login.html"));
};


export const methodsAlumnos ={
    register,registerView
};