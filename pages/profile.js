import Head from 'next/head';
import React from 'react';
import Navbar from 'components/NavbarComponent/Navbar';
import ProfileStyles from '../pages_styles/ProfileStyles';
import WithAuth from 'components/common_components/WithAuth';
import ProfileComponent from 'components/ProfileComponent/Profile';

class Profile extends React.Component {
    render() {
        return (
            <ProfileStyles>
                <Head>
                    <title>Next project: Profile page</title>
                </Head>
                <Navbar />
                <ProfileComponent />
            </ProfileStyles>
        );
    }
}

export default WithAuth(Profile);
