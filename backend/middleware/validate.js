const { check, validationResult } = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'login': {
      return [
        check('email', 'El correo electrónico es obligatorio').not().isEmpty(),
        check('email', 'El correo electrónico no es válido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
      ];
    }
    case 'register': {
      return [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo electrónico es obligatorio').not().isEmpty(),
        check('email', 'El correo electrónico no es válido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
      ];
    }
    default:
      return [];
  }
};

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validate, validateResult };