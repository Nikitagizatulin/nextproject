import React from 'react';
import Link from 'next/link';

export default class NavBar extends React.Component {
    render() {
        return (
            <nav>
                <div>
                    <Link href="about">
                        <a title="About Next JS">About Next JS</a>
                    </Link>
                    <Link href="/">
                        <a title="Our API">API</a>
                    </Link>
                </div>
            </nav>
        );
    }
}
