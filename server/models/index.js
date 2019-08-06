const fs = require('fs');
const mongoose = require('mongoose');
// use require instead of import because 'mongoose' does not provide an export name
const database = process.env.DB_NAME || 'todo';
const authSource = process.env.DB_AUTH_SOURCE;
let uri = `mongodb://localhost/${database}`;
let options = {
    useCreateIndex: true,
    useNewUrlParser: true
};

if (authSource) {
    uri += `?authSource=${authSource}`;
}
if (process.env.DB_USER && process.env.DB_PASS) {
    options.user = process.env.DB_USER;
    options.pass = process.env.DB_PASS;
}

mongoose.connect(uri, options);
const dbs = {
    mongoose
};

fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => {
        const modelName = file.replace('.js', '');
        dbs[modelName] = mongoose.model(
            modelName,
            require(`./${file}`)(mongoose)
        );
    });

module.exports = dbs;
