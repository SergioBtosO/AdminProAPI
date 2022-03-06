const jwt = require('jsonwebtoken');

const generarJWT = (id) => {

    return new Promise((resolve, reject) => {
        const payload = {
            id
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '30m'
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject("No se generó el TOKEN")
            } else{
                resolve(token);
            }

        });
    });
}

module.exports = {
    generarJWT,
 }