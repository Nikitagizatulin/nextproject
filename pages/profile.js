import Head from 'next/head';
import React from 'react';
import Navbar from 'components/Navbar';
import Styles from '../pages_styles/profile';
import WithAuth from 'components/common_components/WithAuth';
import ProfileComponent from 'components/ProfileComponent';

class Profile extends React.Component {
    render() {
        return (
            <Styles>
                <Head>
                    <title>Next project: Profile page</title>
                </Head>
                <Navbar />
                <ProfileComponent />
            </Styles>
        );
    }
}

export default WithAuth(Profile);
