import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = ({ setIsLoggedIn }) => {
    let history = useHistory();
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        fetch('http://localhost:5000/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.msg === 'You\'re logged in.') {
                    setIsLoggedIn(true);
                    history.replace('/athletes');
                };
                if (result.msg === 'This username has already been taken.') {
                    setError(result.msg);
                };
            })
            .catch(err => console.error(err));
        event.preventDefault();
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="text-center container login-form">
            <h1>Register</h1>
            {error && <div className="error">{error}</div>}
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
    );
};

export default Register;