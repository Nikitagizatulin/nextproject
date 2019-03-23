import Styles from '../pages_styles/main';
import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';

class Index extends React.Component {
    static async getInitialProps(data) {
        console.log(data);
        return {};
    }

    render() {
        return (
            <Styles>
                <Head>
                    <title>Homepage</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1.2, width=device-width"
                    />
                </Head>
                <Navbar />
                <h1>Hello world from next.js</h1>
                <img src="/static/example.jpeg" alt="example image" />
            </Styles>
        );
    }
}

export default Index;
