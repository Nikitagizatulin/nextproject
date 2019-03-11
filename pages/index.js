import Styles from '../pages_styles/main';
import Link from 'next/link';
import Head from 'next/head';
import React from 'react';

const Index = () => (
    <Styles>
        <Head>
            <title>Homepage</title>
            <meta name="viewport" content="initial-scale=1.2, width=device-width" />
        </Head>
        <h1>Hello world from next.js</h1>
        <img src="/static/example.jpeg" alt="example image" />
        <Link href="/about">
            <a title="About NextJS">About This Project</a>
        </Link>
    </Styles>
);

// class Index extends React.Component {
//     static async getInitialProps(data) {
//         console.log(data);
//         const userAgent = data.req
//             ? data.req.headers['user-agent']
//             : navigator.userAgent;
//         return { userAgent };
//     }

//     render() {
//         return <div>Hello World {this.props.userAgent}</div>;
//     }
// }

export default Index;
