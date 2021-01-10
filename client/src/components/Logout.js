import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
    let history = useHistory();
    const handleClick = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/users/logout', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then(() => {
                setIsLoggedIn(false);
                history.replace('/login')
            })
            .catch(err => console.error(err));
    };

    return (
        <Fragment>
            <a href="/" style={{ color: 'white' }} onClick={handleClick}>Logout</a>
        </Fragment>
    )
};

export default Logout;