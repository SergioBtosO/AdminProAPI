const { Schema, model } = require('mongoose');

const TimeRecordSchema = Schema({

    userReporter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dateReported: {
        type: Date,
        required: true,
        default: new Date(),
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    costCenter: {
        type: Schema.Types.ObjectId,
        ref: 'CostCenter',
        required: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    observations: {
        type: String,
    }
});

TimeRecordSchema.method('toJSON', function () {
    const { __v, _id, password, dateReported, ...object } = this.toObject();

    object.id = _id;
    object.version = __v;
    return object;
})

module.exports = model('TimeRecord', TimeRecordSchema);