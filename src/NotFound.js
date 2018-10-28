import React from 'react';
import { Link } from 'react-router-dom';
import notFound from './icons/loading.gif';

const NotFound = () => (
    <div id="notfound">
        <div class="notfound">
            <div class="notfound-bg">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h1>oops!</h1>
            <h2>Error 404 : Page Not Found</h2>
            <Link to="/">Return home and try again</Link>
        </div>
    </div>
);
export default NotFound;