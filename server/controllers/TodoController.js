import { Todo } from '../models';
export default class TodoController {
    static async index(req, res) {
        const { user } = req;
        let queryResult = await Todo.find({ user_id: user._id }, null, {
            sort: { createdAt: 'desc' }
        });
        res.json(queryResult);
    }

    static async show() {}

    static async store(req, res) {
        let queryResult = await Todo.create({
            value: req.body.value,
            user_id: req.user.id
        });
        res.send(JSON.stringify(queryResult));
    }

    static async put(req, res) {
        Todo.findByIdAndUpdate(req.params.id, { name: req.body.name })
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => {
                res.status(500).send({ error: err });
            });
    }
    static async toggle_status(req, res) {
        const { body, user } = req;
        const todo = await Todo.findOne({ user_id: user._id, _id: body.id });
        todo.completed = !todo.completed;
        const result = await todo.save();

        res.status(200).send({ id: result._id });
    }
    static async destroy(req, res) {
        const { body, user } = req;
        const result = await Todo.deleteOne({
            _id: body.id,
            user_id: user._id
        });

        return result.ok
            ? res.status(200).send({ id: body.id })
            : res.status(500).send({ error: 'server error' });
    }
}
