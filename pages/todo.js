import Head from 'next/head';
import React from 'react';
import Navbar from 'components/Navbar';
import WithAuth from 'components/common_components/WithAuth';
import TodoComponent from 'components/TodoComponent';
import Styles from '../pages_styles/home';

const Todo = () => (
    <Styles>
        <Head>
            <title>Todo list</title>
        </Head>
        <Navbar />
        <TodoComponent />
    </Styles>
);

export default WithAuth(Todo);
