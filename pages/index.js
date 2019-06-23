import Head from 'next/head';
import React from 'react';
import { Typography, Divider } from 'antd';
import Navbar from 'components/Navbar';
import Styles from '../pages_styles/home';

const { Title } = Typography;
class Index extends React.Component {
    render() {
        return (
            <Styles>
                <Head>
                    <title>Next project: Homepage</title>
                </Head>
                <Navbar />
                <Title className="home-page_title">Too project.</Title>
                <Divider />
                <Title level={2} className="home-page_subtitle">
                    {`It's simple way to stored your tasks. You can edit your
                    task, delete and set to completed status. For started to use
                    the application, please log in or sign up.`}
                </Title>
            </Styles>
        );
    }
}

export default Index;
