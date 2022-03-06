/*
    Route: /api/users
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { validatorParams } = require('./../middlewares/validator-params')
const { validatorJWT } = require('./../middlewares/validator-jwt')

const { getUsers, createUser, updateUser, deleteUser } = require('./../controllers/users.controller');

const router = Router();

router.get('/',validatorJWT, getUsers);

router.post('/', [
    validatorJWT,
    check('nameUser', 'Nombre requerido!').not().isEmpty(),
    check('lastNameUser', 'Apellido requerido!').not().isEmpty(),
    check('typeDocument', 'Tipo Documento requerido!').not().isEmpty(),
    check('numberDocument', 'Numero Documento requerido!').not().isEmpty(),
    check('password', 'Contraseña requerido!').not().isEmpty(),
    validatorParams
], createUser);

router.put('/:id', [
    validatorJWT,
    check('nameUser', 'Nombre requerido!').not().isEmpty(),
    check('lastNameUser', 'Apellido requerido!').not().isEmpty(),
    check('typeDocument', 'Tipo Documento requerido!').not().isEmpty(),
    check('numberDocument', 'Numero Documento requerido!').not().isEmpty(),
    check('role', 'Rol requerido!').not().isEmpty(),
    validatorParams
], updateUser);

router.delete('/:id',validatorJWT, deleteUser);


module.exports = router;