const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    nameUser: {
        type: String,
        required: true,
    },
    lastNameUser: {
        type: String,
        required: true,
    },
    typeDocument: {
        type: String,
        required: true,
    },
    numberDocument: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    }
});

UserSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    object.version = __v;
    return object;
})

module.exports = model('User', UserSchema);