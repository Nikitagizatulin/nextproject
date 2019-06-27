import Head from 'next/head';
import React, { Fragment } from 'react';
import Navbar from 'components/Navbar';
import WithAuth from 'components/common_components/WithAuth';
import TodoComponent from 'components/TodoComponent';

class Todo extends React.Component {
    render() {
        return (
            <Fragment>
                <Head>
                    <title>Todo list</title>
                </Head>
                <Navbar />
                <TodoComponent />
            </Fragment>
        );
    }
}

export default WithAuth(Todo);
