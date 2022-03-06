/*
    Route: /api/login
*/
const { Router } = require('express')
const router = Router();
const { check } = require('express-validator')
const { validatorParams } = require('./../middlewares/validator-params')

const { login } = require('./../controllers/auth.controller');

router.post('/',[
    check('numberDocument', 'Numero Documento requerido!').not().isEmpty(),
    check('password', 'Contraseña requerido!').not().isEmpty(),
    validatorParams
],login);


module.exports = router;