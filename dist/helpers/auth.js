//creacion para que notas no se vea siempre y las notas sean personales al autenticar
const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('error_msg', 'Not Authorized');
  res.redirect('/users/signin');
};

module.exports = helpers;