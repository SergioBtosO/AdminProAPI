/*

    ruta: api/uploads/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const { validatorJWT } = require('../middlewares/validator-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads.controller');

const router = Router();

router.use( expressFileUpload() );

router.put('/:tipo/:id', validatorJWT , fileUpload );

router.get('/:tipo/:foto', retornaImagen );



module.exports = router;