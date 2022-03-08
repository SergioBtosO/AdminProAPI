const { Schema, model } = require('mongoose');

const CostCenterSchema = Schema({

    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
});

CostCenterSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    object.version = __v;
    return object;
})

module.exports = model('CostCenter', CostCenterSchema);