const { response } = require('express');

const Project = require('./../models/project.model')
const User = require('./../models/user.model')

const getProjects = async (req, res) => {

    const projects = await Project.find();

    res.json({ ok: true, projects });
}

const createProject = async (req, res = response) => {

    const { code, userAprover } = req.body;

    try {

        const existProject = await Project.findOne({ code })

        if (existProject) {
            return res.status(400).json({ ok: false, msg: `Código ${code} ya existe!` })
        }

        if (userAprover) {
            const existUserAprover = await User.findById(userAprover)

            if (!existUserAprover) {
                return res.status(400).json({ ok: false, msg: `Usuario Aprovador ${code} no existe!` })
            }
        }


        const project = new Project(req.body);

        await project.save();

        res.json({ ok: true, msg: 'Proyecto creado!', project });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}

const updateProject = async (req, res = response) => {

    const id = req.params.id;

    try {
        const dbProject = await Project.findById(id);

        if (!dbProject) {
            return res.status(404).json({ ok: false, msg: `No existe proyecto con el id: ${id} !` });
        }

        const { code, userAprover, ...fields } = req.body;

        if (dbProject.code !== code) {
            const existProject = await Project.findOne({ code })

            if (existProject) {
                return res.status(400).json({ ok: false, msg: `Ya existe un proyecto con código ${code} !` })
            }
        }

        if (userAprover) {
            if (dbProject.userAprover != userAprover) {
                const existUserAprover = await User.findById(userAprover)

                if (!existUserAprover) {
                    return res.status(400).json({ ok: false, msg: `Usuario Aprobador no existe!` })
                }
            }
            fields.userAprover = userAprover;
        }

        fields.code = code;
        const project = await Project.findByIdAndUpdate(id, fields, { new: true });

        res.json({ ok: true, msg: 'Proyecto actualizado!', project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}

const deleteProject = async (req, res = response) => {

    const id = req.params.id;

    try {

        const existProject = await Project.findById(id)

        if (!existProject) {
            return res.status(404).json({ ok: false, msg: `No existe proyecto con el id: ${id} !` })
        }

        await Project.findByIdAndDelete(id);

        res.json({ ok: true, msg: 'Project Eliminado!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}


module.exports = { getProjects, createProject, updateProject, deleteProject }