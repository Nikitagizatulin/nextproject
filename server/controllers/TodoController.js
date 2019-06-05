import { Todo } from '../models'
export default {

  async index(req, res) {
    let queryResult = await Todo.find()
    res.json(queryResult)
  },

  async show(req, res) {
    let queryResult = await Todo.findById(req.params.id)
    res.send(JSON.stringify(queryResult))
  },

  async store(req, res) {
    let queryResult = await Todo.create(req.body)
    res.send(JSON.stringify(queryResult))
  },

  async put(req, res) {
    Todo.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name })
      .then(() => {
        res.sendStatus(200)
      })
      .catch(err => {
        res.status(500).send({ error: err })
      })
  },
  async destroy(req, res) {
    Todo.findByIdAndRemove(req.params.id)
      .then(() => {
        res.sendStatus(200)
      })
      .catch(err => {
        res.status(500).send({ error: err })
      })
  }
}
