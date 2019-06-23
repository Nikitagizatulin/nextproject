import Head from 'next/head';
import React from 'react';
import Navbar from 'components/Navbar';
import Styles from '../pages_styles/home';

export default class About extends React.Component {
    render() {
        return (
            <Styles>
                <Head>
                    <title>Next project: About page</title>
                </Head>
                <Navbar />
                <h1>This test project for Rezet company.</h1>
            </Styles>
        );
    }
}
