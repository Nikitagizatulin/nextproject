import { Todo } from '../models';
import { User } from '../models';

export default class HomeController {
    static async index(req, res) {
        const countOfUsers = await User.countDocuments();
        const countOfTodos = await Todo.countDocuments();
        const countOfCompletedTodos = await Todo.countDocuments({
            completed: true
        });
        res.json({
            countOfUsers,
            countOfTodos,
            countOfCompletedTodos
        });
    }
}
