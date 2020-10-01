import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Like from './Like';

const Athlete = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [athlete, setAthlete] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/athletes/${id}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setAthlete({...result});
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
                <div className="box" key={athlete.athlete.athlete_id}>
                    <li>
                        Name: {athlete.athlete.name}
                    </li>
                    <li>
                        <img src={athlete.athlete.image_url}></img>
                    </li>
                    <li>
                        Category: {athlete.athlete.category}
                    </li>
                    <Like like={athlete.likes.likes} id={athlete.athlete.athlete_id} hasVoted={!athlete.tOrF ? false : athlete.tOrF.vote}></Like>
                </div>
        );
    }
};

export default Athlete;