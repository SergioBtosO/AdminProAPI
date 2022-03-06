const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('./../models/user.model');
const { generarJWT } = require('./../helpers/jwt.helper');

const login = async (req, res = response) => {

    const { numberDocument, password } = req.body;

    try {

        const user = await User.findOne({ numberDocument });

        if (!(user && bcrypt.compareSync(password, user.password))) {
            return res.status(404).json({ ok: false, msg: `Datos ingresados no son válidos!` })
        }

        const token = await generarJWT(user.id);

        res.json({ ok: true, msg: 'Usuario inicio sesion!', user, accessToken: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}

module.exports = { login }
