/*
    Route: /api/time-records
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { validatorParams } = require('./../middlewares/validator-params')
const { validatorJWT } = require('./../middlewares/validator-jwt')

const router = Router();

const { getTimeRecords,getTimeRecordsByUserReporter, createTimeRecord, updateTimeRecord, deleteTimeRecord } = require('./../controllers/time-records.controller');


router.get('/',validatorJWT, getTimeRecords);

router.get('/:userReporter',validatorJWT, getTimeRecordsByUserReporter);

router.post('/', [
    validatorJWT,
    check('dateStart', 'Fecha Inicial requerida!').not().isEmpty(),
    check('dateEnd', 'Fecha Final requerida!').not().isEmpty(),
    check('userReporter', 'Usuario reportador requerido!').not().isEmpty(),
    check('userReporter', 'Id Usuario reportador no válido!').isMongoId(),
    check('costCenter', 'Centro de costo requerido!').not().isEmpty(),
    check('costCenter', 'Id Centro de costo no válido!').isMongoId(),
    check('project', 'Id Proyecto no válido!').optional().isMongoId(),
    validatorParams
], createTimeRecord);

router.put('/:id', [
    validatorJWT,
    check('dateStart', 'Fecha Inicial requerida!').not().isEmpty(),
    check('dateEnd', 'Fecha Final requerida!').not().isEmpty(),
    check('userReporter', 'Usuario reportador requerido!').not().isEmpty(),
    check('userReporter', 'Id Usuario reportador no válido!').isMongoId(),
    check('costCenter', 'Centro de costo requerido!').not().isEmpty(),
    check('costCenter', 'Id Centro de costo no válido!').isMongoId(),
    check('project', 'Id Proyecto no válido!').optional().isMongoId(),
    validatorParams
], updateTimeRecord);

router.delete('/:id',validatorJWT, deleteTimeRecord);


module.exports = router;