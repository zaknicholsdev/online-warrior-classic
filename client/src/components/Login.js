import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    let history = useHistory();

    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState([])

    const handleClick = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setIsLoggedIn(true);
                    history.replace('/athletes');
                } else {
                    setError(result);
                }
            })
            .catch(err => console.error(err));
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    };

    return (
        <div className="text-center container login-form">
            <h1>Login</h1>
            <div className="error">{error.msg}</div>
            <form>
                <div className="form-group">
                    <input type="text" className="form-control" onChange={handleChange} value={data.username} name="username" placeholder="Username" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" onChange={handleChange} value={data.password} name="password" placeholder="Password" />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Login</button>
            </form>
        </div>
    )
}

export default Login;