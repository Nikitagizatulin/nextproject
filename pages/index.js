import Head from 'next/head';
import React from 'react';
import { Typography, Row, Col } from 'antd';
import Navbar from 'components/Navbar';
import PropTypes from 'prop-types';
import axios from 'axios';
import Styles from '../pages_styles/home';

const { Title } = Typography;

class Index extends React.Component {
    static async getInitialProps() {
        let statistic;
        if (process.env.PORT && process.env.APP_NAME) {
            statistic = await axios.get(
                `http://${process.env.APP_NAME}:${process.env.PORT}/api/home`
            );
        } else {
            statistic = await axios.get('/api/home');
        }

        return statistic.data;
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

export default Index;
