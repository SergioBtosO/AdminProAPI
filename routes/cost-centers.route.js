/*
    Route: /api/cost-centers
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { validatorParams } = require('./../middlewares/validator-params')
const { validatorJWT } = require('./../middlewares/validator-jwt')

const {  getCostCenters, createCostCenter, updateCostCenter, deleteCostCenter  } = require('./../controllers/cost-centers.controller');

const router = Router();

router.get('/',validatorJWT, getCostCenters);

router.post('/', [
    validatorJWT,
    check('name', 'Nombre requerido!').not().isEmpty(),
    check('code', 'Codigo requerido!').not().isEmpty(),
    validatorParams
], createCostCenter);

router.put('/:id', [
    validatorJWT,
    check('name', 'Nombre requerido!').not().isEmpty(),
    check('code', 'Codigo requerido!').not().isEmpty(),
    validatorParams
], updateCostCenter);

router.delete('/:id',validatorJWT, deleteCostCenter);


module.exports = router;