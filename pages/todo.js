import Head from 'next/head';
import React from 'react';
import Navbar from 'components/Navbar';
import WithAuth from 'components/common_components/WithAuth';
import TodoComponent from 'components/TodoComponent';
import Styles from '../pages_styles/home';
import { fetchTodos } from '../store/todos/actions';

class Todo extends React.Component {
    static async getInitialProps({ store }) {
        // const res = store.dispatch(fetchTodos());
        const { user } = await store.getState();
        store.dispatch(fetchTodos( user.user._id));
        return {};
    }

    render() {
        return (
            <Styles>
                <Head>
                    <title>Todo list</title>
                </Head>
                <Navbar />
                <TodoComponent />
            </Styles>
        );
    }
}

export default WithAuth(Todo);
