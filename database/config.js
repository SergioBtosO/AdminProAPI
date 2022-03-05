const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CDN);
        console.log('DB Online!');
    } catch (error) {
        console.log(error);
        throw new Error('DB connection Fail!')
    }

}

module.exports = {dbConnection}