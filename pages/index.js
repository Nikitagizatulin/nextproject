import Head from 'next/head';
import React, { Fragment } from 'react';
import Navbar from 'components/Navbar';

class Index extends React.Component {
    render() {
        return (
            <Fragment>
                <Head>
                    <title>Next project: Homepage</title>
                </Head>
                <Navbar />
            </Fragment>
        );
    }
}

export default Index;
