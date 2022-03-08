/*
    Route: /api/projects
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { validatorParams } = require('./../middlewares/validator-params')
const { validatorJWT } = require('./../middlewares/validator-jwt')

const { getProjects, createProject, updateProject, deleteProject } = require('./../controllers/projects.controller');

const router = Router();

router.get('/', validatorJWT, getProjects);

router.post('/', [
    validatorJWT,
    check('name', 'Nombre requerido!').not().isEmpty(),
    check('code', 'Codigo requerido!').not().isEmpty(),
    check('userAprover', 'Id Usuario aprobador no válido!').optional().isMongoId(),
    validatorParams
], createProject);

router.put('/:id', [
    validatorJWT,
    check('name', 'Nombre requerido!').not().isEmpty(),
    check('code', 'Codigo requerido!').not().isEmpty(),
    check('userAprover', 'Id Usuario aprobador no válido!').optional().isMongoId(),
    validatorParams
], updateProject);

router.delete('/:id', validatorJWT, deleteProject);



module.exports = router;