import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Me = () => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/users/me`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoaded(true);
            })
            .catch(error => console.error(error));
    }, []);

    console.log(data);

    return (
        isLoaded && data.likedAthletes ? <div className="text-center">
            <div>Username: {data.user.username} </div>
            <div>User ID: {data.user.user_id}</div>
            {data.likedAthletes.map(athlete => (
                <div key={athlete.athlete_id}>
                    <div>Name: {athlete.name}</div>
                    <img className='small-img' src={athlete.image_url}></img>
                </div>
            ))}
        </div> : <div>You must not be logged in.</div>
    );
};

export default Me;