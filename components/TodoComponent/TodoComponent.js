import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';
import AddTodoForm from './AddTodoForm';
import * as todoActions from 'store/todos/actions';
import TodoList from './TodoList';

const TodosComponent = ({
    todos,
    addTodo,
    deleteTodo,
    updateTodoStatus,
    updateTodoValue
}) => {
    const handleformSubmit = todo => addTodo(todo);

    const handleTodoRemoval = todo => deleteTodo(todo);

    const handleTodoToggle = todo => updateTodoStatus(todo);

    const handleTodoUpdateValue = todo => updateTodoValue(todo);

    return (
        <Row type="flex" justify="center" align="middle">
            <Col
                xs={{ span: 23 }}
                sm={{ span: 23 }}
                md={{ span: 21 }}
                lg={{ span: 20 }}
                xl={{ span: 18 }}
            >
                <AddTodoForm onFormSubmit={handleformSubmit} />
                <Card title="Todo List">
                    <TodoList
                        todos={todos}
                        onTodoToggle={handleTodoToggle}
                        onTodoUpdate={handleTodoUpdateValue}
                        onTodoRemoval={handleTodoRemoval}
                    />
                </Card>
            </Col>
        </Row>
    );
};

TodosComponent.propTypes = {
    todos: PropTypes.array.isRequired,
    addTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    updateTodoStatus: PropTypes.func.isRequired,
    updateTodoValue: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user.user,
    todos: state.todos.todoList
});

const mapActionsToProps = { ...todoActions };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(TodosComponent);