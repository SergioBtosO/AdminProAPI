const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('./../models/user.model')

const getUsers = async (req, res) => {

    const from = Number(req.query.from) || 0;

    const [ users, total ] = await Promise.all([
        User.find({}, 'name lastName typeDocument numberDocument role img status')
            .skip( from )
            .limit( 5 ),
        User.countDocuments()
    ]);


    res.json({
        ok: true,
        users,
        total
    });


}

const createUser = async (req, res = response) => {

    const { typeDocument, numberDocument, password } = req.body;

    try {

        const existUser = await User.findOne({ numberDocument })

        if (existUser) {
            return res.status(400).json({ ok: false, msg: `Documento ${numberDocument} ya existe!` })
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.json({ ok: true, msg: 'Usuario creado!', user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}

const updateUser = async (req, res = response) => {

    const id = req.params.id;

    try {
        const dbUser = await User.findById(id);

        if (!dbUser) {
            return res.status(404).json({ ok: false, msg: `No existe usuario con el id: ${id} !` });
        }

        const { password, numberDocument, ...fields } = req.body;

        if (dbUser.numberDocument !== numberDocument) {
            const existUser = await User.findOne({ numberDocument })

            if (existUser) {
                return res.status(400).json({ ok: false, msg: `Ya existe un usuario con documento ${numberDocument} !` })
            }
        }

        fields.numberDocument = numberDocument;
        const user = await User.findByIdAndUpdate(id, fields, { new: true });

        res.json({ ok: true, msg: 'User actualizado!', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}

const deleteUser = async (req, res = response) => {

    const id = req.params.id;

    try {

        const existUser = await User.findById(id)

        if (!existUser) {
            return res.status(404).json({ ok: false, msg: `No existe usuario con el id: ${id} !` })
        }

        await User.findByIdAndDelete(id);

        res.json({ ok: true, msg: 'User Eliminado!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}
module.exports = { getUsers, createUser, updateUser, deleteUser }