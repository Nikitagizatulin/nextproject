import { Todo } from '../models';
export default class TodoController {
    static async index(req, res) {
        try {
            const { user } = req;
            let queryResult = await Todo.find({ user_id: user._id }, null, {
                sort: { createdAt: 'desc' }
            });
            res.json(queryResult);
        } catch ({ errors }) {
            res.status(500).json(errors);
        }
    }

    static async show() {}

    static async store(req, res) {
        try {
            let queryResult = await Todo.create({
                value: req.body.value,
                user_id: req.user.id
            });
            res.send(JSON.stringify(queryResult));
        } catch ({ errors }) {
            res.status(500).json(errors);
        }
    }

    static async put(req, res) {
        try {
            await Todo.findByIdAndUpdate(req.params.id, {
                name: req.body.name
            });
            res.sendStatus(200);
        } catch ({ errors }) {
            res.status(500).json(errors);
        }
    }
    static async toggle_status(req, res) {
        try {
            const { body, user } = req;
            const todo = await Todo.findOne({
                user_id: user._id,
                _id: body.id
            });
            todo.completed = !todo.completed;
            const result = await todo.save();

            res.status(200).send({ id: result._id });
        } catch ({ errors }) {
            res.status(500).json(errors);
        }
    }
    static async destroy(req, res) {
        try {
            const { body, user } = req;
            await Todo.deleteOne({
                _id: body.id,
                user_id: user._id
            });
            res.status(200).send({ id: body.id });
        } catch ({ errors }) {
            res.status(500).json(errors);
        }
    }
}
