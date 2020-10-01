import React, { useState, useEffect } from 'react';

const Register = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState([])

    const handleSubmit = (event) => {
        fetch('http://localhost:5000/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => setError(result))
            .catch(err => console.error(err));
        event.preventDefault();
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    };

    return (
        <div className="text-center">
            <h1>Register</h1>
            <div className="error">{error.msg}</div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" onChange={handleChange} value={data.username} name="username" placeholder="Username" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" onChange={handleChange} value={data.password} name="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}

export default Register;