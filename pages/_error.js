import Head from 'next/head';
import Navbar from 'components/NavbarComponent/Navbar';
import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import ErrorStyles from '../pages_styles/ErrorStyles';

const { Title } = Typography;

class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode };
    }
    static propTypes = {
        statusCode: PropTypes.number,
        title: PropTypes.string
    };
    static defaultProps = {
        statusCode: 500,
        title: 'Error'
    };
    render() {
        const { statusCode, title } = this.props;
        return (
            <ErrorStyles>
                <Head>
                    <title>Next project: Page not found</title>
                </Head>
                <Navbar />
                <div className="error-block">
                    <img
                        src="/static/images/error-image.jpg"
                        alt="error"
                        className="error-image"
                    />
                    <Title type="danger">
                        Error code:
                        {statusCode}
                    </Title>
                    {title && (
                        <Title type="danger" level={3}>
                            {title}
                        </Title>
                    )}
                </div>
            </ErrorStyles>
        );
    }
}

export default Error;
