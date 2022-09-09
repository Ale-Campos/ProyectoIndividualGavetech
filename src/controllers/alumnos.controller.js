
import {getConnection} from "./../database/database";
import path from "path";


const register = async (req, res)=>{

    
    const {dni, nombre, apellido, email, contraseña} = req.body;
   
    const alumno = {
        dni:dni,
        nombre:nombre,
        apellido:apellido,
        email: email,
        contraseña: contraseña
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
    res.sendFile(path.resolve(__dirname, "./../../public/views/register.html"));
};


export const methodsAlumnos ={
    register,registerView
};