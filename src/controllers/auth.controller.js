const validarAlumno = (req, res, next) => {
  if (
    req.session.usuario &&
    req.session.usuario.estaLogeado &&
    !req.session.usuario.esProfesor
  ) {
    next();
  } else {
    res.render("AccesoDenegado");
  }
};

const validarProfesor = (req, res, next) => {
  if (
    req.session.usuario &&
    req.session.usuario.estaLogeado &&
    req.session.usuario.esProfesor
  ) {
    next();
  } else {
    res.render("AccesoDenegado");
  }
};
const validarLogueo = (req, res, next) => {
  if (req.session.usuario && req.session.usuario.estaLogeado) {
    next();
  } else {
    res.render("AccesoDenegado");
  }
};

export const authController = {
  validarAlumno,
  validarProfesor,
  validarLogueo,
};
