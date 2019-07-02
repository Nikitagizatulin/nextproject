import { Todo } from '../models';
import { User } from '../models';

export default {
    async index(req, res) {
        const countOfUsers = await User.count();
        const countOfTodos = await Todo.count();
        const countOfCompletedTodos = await Todo.count({ completed: true });
        res.json({
            countOfUsers,
            countOfTodos,
            countOfCompletedTodos
        });
    }
};
