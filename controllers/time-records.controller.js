const { response } = require('express');

const TimeRecord = require('./../models/time-record.model')
const Project = require('./../models/project.model')
const User = require('./../models/user.model')
const CostCenter = require('./../models/cost-center.model')

const getTimeRecords = async (req, res) => {

    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 5;

    const [timeRecords,total] = await Promise.all([
        TimeRecord.find().populate('userReporter', 'name lastName').populate('costCenter', 'code name').skip(from).limit(limit),
        TimeRecord.count()
    ])

    res.json({ ok: true, timeRecords,total });
}

const getTimeRecordsByUserReporter = async (req, res) => {

    const { userReporter } = req.body

    const existUserReporter = await User.findById(userReporter)

    if (!existUserReporter) {
        return res.status(404).json({ ok: false, msg: `Usuario no existe!` })
    }

    const timeRecords = await TimeRecord.find({ userReporter });

    res.json({ ok: true, timeRecords });
}

const createTimeRecord = async (req, res = response) => {


    const { userReporter, project, costCenter, dateStart, dateEnd } = req.body

    try {

        const existUserReporter = await User.findById(userReporter)

        if (!existUserReporter) {
            return res.status(404).json({ ok: false, msg: `Usuario no existe!` })
        }

        const existCostCenter = await CostCenter.findById(costCenter)

        if (!existCostCenter) {
            return res.status(404).json({ ok: false, msg: `Centro de costos no existe!` })
        }

        if (project) {
            const existProject = await User.findById(project)

            if (!existProject) {
                return res.status(404).json({ ok: false, msg: `Proyecto no existe!` })
            }
        }

        if (dateStart > dateEnd) {
            return res.status(400).json({ ok: false, msg: `Error en la fechas ingresadas!` })
        }

        const timeRecord = new TimeRecord(req.body);

        await timeRecord.save();

        res.json({ ok: true, msg: 'Registro de tiempo creado!', timeRecord });

    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}

const updateTimeRecord = async (req, res = response) => {

    const id = req.params.id;

    try {

        const { project, userReporter, costCenter, ...fields } = req.body;

        const dbTimeRecord = await Project.findById(id);

        if (!dbTimeRecord) {
            return res.status(404).json({ ok: false, msg: `No existe el registro con el id: ${id} !` });
        }

        if (userReporter !== dbTimeRecord.userReporter) {
            const existUserReporter = await User.findById(userReporter)

            if (!existUserReporter) {
                return res.status(404).json({ ok: false, msg: `Usuario no existe!` })
            }

            fields.userReporter = userReporter;
        }

        if (costCenter !== dbTimeRecord.costCenter) {
            const existCostCenter = await CostCenter.findById(costCenter)

            if (!existCostCenter) {
                return res.status(404).json({ ok: false, msg: `Centro de costos no existe!` })
            }

            fields.costCenter = costCenter;
        }

        if (project) {

            if (project !== dbTimeRecord.project) {
                const existProject = await Project.findById(project)

                if (!existProject) {
                    return res.status(404).json({ ok: false, msg: `Proyecto no existe!` })
                }
            }
            fields.project = project;
        }

        if (fields.dateStart > fields.dateEnd) {
            return res.status(400).json({ ok: false, msg: `Error en la fechas ingresadas!` })
        }

        const timeRecord = await TimeRecord.findByIdAndUpdate(id, fields, { new: true });

        res.json({ ok: true, msg: 'Registro de tiempo actualizado!', timeRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}

const deleteTimeRecord = async (req, res = response) => {

    const id = req.params.id;

    try {

        const existTimeRecord = await TimeRecord.findById(id)

        if (!existTimeRecord) {
            return res.status(404).json({ ok: false, msg: `No existe proyecto con el id: ${id} !` })
        }

        await TimeRecord.findByIdAndDelete(id);

        res.json({ ok: true, msg: 'Registro de tiempo Eliminado!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}


module.exports = { getTimeRecords, getTimeRecordsByUserReporter, createTimeRecord, updateTimeRecord, deleteTimeRecord }