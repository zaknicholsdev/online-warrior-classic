import React, { useState } from 'react';

const Logout = () => {
    const handleClick = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/users/logout', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then(response => response.json())
            .then(console.log('logged out.'))
            .catch(err => console.error(err));
    };

    return (
        <div className="text-center container">
            <h1>Logout</h1>
            <button type="button" className="btn btn-primary" onClick={handleClick}>Logout</button>
        </div>
    )
};

export default Logout;