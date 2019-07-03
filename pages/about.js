import Head from 'next/head';
import React from 'react';
import Navbar from 'components/Navbar';
import { Typography, Divider, Row, Col } from 'antd';
import Styles from '../pages_styles/about';
const { Title } = Typography;
export default class About extends React.Component {
    render() {
        return (
            <Styles>
                <Head>
                    <title>Next project: About page</title>
                </Head>
                <Navbar />
                <Title className="about-page_title">Todo project.</Title>
                <Divider />
                <Row>
                    <Col span={18} offset={3}>
                        <Title level={3} className="about-page_subtitle">
                            It&apos;s simple way to stored your tasks. You can
                            add your task, delete and set to completed status.
                            For started to use the application, please log in or
                            sign up.
                        </Title>
                        <Title level={3} className="about-page_subtitle">
                            This project uses the following technologies:
                        </Title>
                        <ul className="technologies-list">
                            <li>
                                Server: Node.js / Express.js / Mongoose /
                                Next.js / Jsonwebtoken / Passport.js
                            </li>
                            <li>
                                Front-end: Ant design / Next.js / React / Redux
                                / Saga request
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col span={18} offset={3}>
                        <p className="paragraph">
                            Also in this application, I use user authentication
                            through cookies, and not through local storage as in
                            a normal spa application
                        </p>
                        <p className="paragraph">
                            This allows us to retrieve and verify the
                            authenticated user both on the back-end and on the
                            front-end sides
                        </p>
                    </Col>
                </Row>
            </Styles>
        );
    }
}
