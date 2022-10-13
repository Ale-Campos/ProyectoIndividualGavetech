const validarAlumno = (req, res, next) => {
  console.log(
    "PASO POR VALIDAR ALUMNO -------------------------------------------------------------------------------------------------------------------------------"
  );
  if (req.session.usuario.estaLogeado && !req.session.usuario.esProfesor) {
    next();
  } else {
    res.render("AccesoDenegado");
  }
};

const validarProfesor = (req, res, next) => {
  console.log(
    "PASO POR VALIDAR PROFESOR -------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(req.session.usuario.estaLogeado);
  console.log(req.session.usuario.esProfesor);
  if (req.session.usuario.estaLogeado && req.session.usuario.esProfesor) {
    next();
  } else {
    res.render("AccesoDenegado");
  }
};

export const authController = {
  validarAlumno,
  validarProfesor,
};
