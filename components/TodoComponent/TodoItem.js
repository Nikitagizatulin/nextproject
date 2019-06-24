import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Tooltip, Tag, Icon, List, Button } from 'antd';
import styled from 'styled-components';

const Styles = styled.div`
    .todo-form {
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 5px;
        .icon {
            color: rgba(0, 0, 0, 0.25);
        }
    }
    .list-item {
        display: flex;
        justify-content: space-between;
    }

    .todo-item {
        .todo-tag {
            margin-left: 10px;
        }
        .todo-name {
            display: inline-block;
            text-transform: capitalize;
        }
    }
`;

const TodoItem = ({ todo, onTodoRemoval, onTodoToggle }) => {
    return (
        <Styles key={todo._id}>
            <List.Item
                actions={[
                    <Tooltip title="Remove Todo" key="tooltip">
                        <Button
                            type="danger"
                            onClick={() => onTodoRemoval(todo._id)}
                        >
                            <Icon type="delete" />
                        </Button>
                    </Tooltip>
                ]}
                className="list-item"
            >
                <div className="todo-item">
                    <Tooltip
                        title={
                            todo.completed
                                ? 'Mark as uncompleted'
                                : 'Mark as completed'
                        }
                    >
                        <Checkbox
                            defaultChecked={todo.completed}
                            onChange={() => onTodoToggle(todo._id)}
                        />
                    </Tooltip>

                    <Tag
                        color={todo.completed ? 'green' : 'volcano'}
                        className="todo-tag"
                    >
                        {todo.completed ? <Icon type="check" /> : '-'}
                    </Tag>

                    <div className="todo-name">
                        {todo.completed ? <del>{todo.value}</del> : todo.value}
                    </div>
                </div>
            </List.Item>
        </Styles>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onTodoRemoval: PropTypes.func.isRequired,
    onTodoToggle: PropTypes.func.isRequired
};

export default TodoItem;
