import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';
import AddTodoForm from './AddTodoForm';
import * as todoActions from 'store/todos/actions';
import TodoList from './TodoList';

class Todo extends React.Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        addTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        updateTodoStatus: PropTypes.func.isRequired,
        updateTodoValue: PropTypes.func.isRequired,
        fetchTodos: PropTypes.func.isRequired
    };

    UNSAFE_componentWillMount() {
        this.props.fetchTodos();
    }

    render() {
        const {
            todos,
            addTodo,
            deleteTodo,
            updateTodoStatus,
            updateTodoValue
        } = this.props;
        
        return (
            <Row type="flex" justify="center" align="middle">
                <Col
                    xs={{ span: 23 }}
                    sm={{ span: 23 }}
                    md={{ span: 21 }}
                    lg={{ span: 20 }}
                    xl={{ span: 18 }}
                >
                    <AddTodoForm onFormSubmit={addTodo} />
                    <Card title="Todo List">
                        <TodoList
                            todos={todos}
                            onTodoToggle={updateTodoStatus}
                            onTodoUpdate={updateTodoValue}
                            onTodoRemoval={deleteTodo}
                        />
                    </Card>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    todos: state.todos.todoList
});

const mapActionsToProps = { ...todoActions };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Todo);
