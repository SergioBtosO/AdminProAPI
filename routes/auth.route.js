/*
    Route: /api/login
*/
const { Router } = require('express')
const router = Router();
const { check } = require('express-validator')
const { validatorParams } = require('./../middlewares/validator-params')
const { validatorJWT } = require('../middlewares/validator-jwt');

const { login, renew } = require('./../controllers/auth.controller');

router.post('/', [
    check('numberDocument', 'Numero Documento requerido!').not().isEmpty(),
    check('password', 'Contraseña requerido!').not().isEmpty(),
    validatorParams
], login);

router.get('/renew',
    validatorJWT,
    renew
)

module.exports = router;