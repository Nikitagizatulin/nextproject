const fs = require('fs');
const mongoose = require('mongoose');

const database = process.env.DB_NAME || 'todo';
const auth_source = process.env.DB_AUTH_SOURCE;
let uri = `mongodb://localhost/${database}`;

if (auth_source) {
  uri += `?authSource=${auth_source}`;
}

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
});
const dbs = {
  mongoose,
};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach((file) => {
    const modelName = file.replace('.js', '');
    dbs[modelName] = mongoose.model(modelName, require(`./${file}`)(mongoose));
  });

module.exports = dbs;
