const jwt = require('jsonwebtoken')


const validatorJWT = (req, res, next) => {

    const token = req.header('authorization').replace('Bearer ',''); 

    if (!token) {
        return res.status(401).json({ ok: false, msg: 'No se encontro token!' })
    }

    try {

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        req.id = id;

    } catch (error) {
        return res.status(401).json({ opk: false, msg: 'Token no válido!' })
    }

    next();
}

module.exports = { validatorJWT }