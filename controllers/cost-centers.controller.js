const { response } = require('express');

const CostCenter = require('./../models/cost-center.model')

const getCostCenters = async (req, res) => {

    const from = Number(req.query.from) || 0;

    const costCenter = await CostCenter.find();

    const [ costCenters, total ] = await Promise.all([
        CostCenter.find({}, 'code name description status id')
            .skip( from )
            .limit( 5 ),
            CostCenter.countDocuments()
    ]);

    res.json({ ok: true, costCenters,total });
}

const createCostCenter = async (req, res = response) => {

    const { code } = req.body;

    try {

        const existCostCenter = await CostCenter.findOne({ code })

        if (existCostCenter) {
            return res.status(400).json({ ok: false, msg: `Código ${code} ya existe!` })
        }

        const costCenter = new CostCenter(req.body);

        await costCenter.save();

        res.json({ ok: true, msg: 'Centro Costo creado!', costCenter });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}

const updateCostCenter = async (req, res = response) => {

    const id = req.params.id;

    try {
        const dbCostCenter = await CostCenter.findById(id);

        if (!dbCostCenter) {
            return res.status(404).json({ ok: false, msg: `No existe centro de costo con el id: ${id} !` });
        }

        const { code, ...fields } = req.body;

        if (dbCostCenter.code !== code) {
            const existCostCenter = await CostCenter.findOne({ code })

            if (existCostCenter) {
                return res.status(400).json({ ok: false, msg: `Ya existe un centro de costo con código ${code} !` })
            }
        }

        fields.code = code;
        const costCenter = await CostCenter.findByIdAndUpdate(id, fields, { new: true });

        res.json({ ok: true, msg: 'Centro Costo actualizado!', costCenter });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}

const deleteCostCenter = async (req, res = response) => {

    const id = req.params.id;

    try {

        const existCostCenter = await CostCenter.findById(id)

        if (!existCostCenter) {
            return res.status(404).json({ ok: false, msg: `No existe centro de costo con el id: ${id} !` })
        }

        await CostCenter.findByIdAndDelete(id);

        res.json({ ok: true, msg: 'Centro Costo Eliminado!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error no controlado!" });
    }
}


module.exports = { getCostCenters, createCostCenter, updateCostCenter, deleteCostCenter }