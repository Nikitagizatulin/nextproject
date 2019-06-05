const fs = require('fs')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo', {
  useCreateIndex: true,
  useNewUrlParser: true
})
const dbs = {
  mongoose
}

fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    let modelName = file.replace('.js', '')
    dbs[modelName] = mongoose.model(modelName, require(`./${file}`)(mongoose))
  })

module.exports = dbs
