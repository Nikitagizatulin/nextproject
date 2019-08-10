import Head from 'next/head';
import React from 'react';
import { Typography, Row, Col } from 'antd';
import Navbar from 'components/Navbar';
import PropTypes from 'prop-types';
import Styles from '../pages_styles/home';
import { fetchStatistic } from '../store/todos/actions';
import { connect } from 'react-redux';

const { Title } = Typography;

class Index extends React.Component {
    static async getInitialProps({ store }) {
        await store.dispatch(fetchStatistic());
        return {};
    }

    static propTypes = {
        countOfUsers: PropTypes.number.isRequired,
        countOfTodos: PropTypes.number.isRequired,
        countOfCompletedTodos: PropTypes.number.isRequired
    };

    render() {
        const {
            countOfUsers,
            countOfTodos,
            countOfCompletedTodos
        } = this.props;
        return (
            <Styles>
                <Head>
                    <title>Next project: Homepage</title>
                </Head>
                <Navbar />
                <Row>
                    <Col span={16} offset={4}>
                        <Title className="title-statistic">
                            Site statistics
                        </Title>
                        <p className="statistic">
                            Number of users on the site:
                            <span className="statisticNumber">
                                {countOfUsers || 0}
                            </span>
                        </p>
                        <p className="statistic">
                            Number of todos on the site:
                            <span className="statisticNumber">
                                {countOfTodos || 0}
                            </span>
                        </p>
                        <p className="statistic">
                            Number of completed todos on the site:
                            <span className="statisticNumber">
                                {countOfCompletedTodos || 0}
                            </span>
                        </p>
                    </Col>
                </Row>
            </Styles>
        );
    }
}

const mapStateToProps = state => ({
    ...state.todos.todoStatistic
});

export default connect(mapStateToProps)(Index);
