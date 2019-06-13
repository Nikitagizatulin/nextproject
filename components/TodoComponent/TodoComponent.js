import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'antd';
import AddTodoForm from './AddTodoForm';
import * as todoActions from 'store/todos/actions';
// import TodoList from 'components/Todos/TodoList';

class TodosContainer extends React.Component {
    static propTypes = {};

    static defaultProps = {

    };

    handleformSubmit() {}

    render() {
        return (
            <Row type="flex" justify="center" align="middle">
                <Col
                    xs={{ span: 23 }}
                    sm={{ span: 23 }}
                    md={{ span: 21 }}
                    lg={{ span: 20 }}
                    xl={{ span: 18 }}
                >
                    <AddTodoForm onFormSubmit={this.handleformSubmit} />
                    <Card title="Todo List">
                        {/* <TodoList
                        todos={todos}
                        onTodoToggle={handleTodoToggle}
                        onTodoRemoval={handleTodoRemoval}
                    /> */}
                    </Card>
                </Col>
            </Row>
        );
    }
}

TodosContainer.propTypes = {};

const mapStateToProps = state => ({
    user: state.user
});
const mapActionsToProps = { ...todoActions };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(TodosContainer);
