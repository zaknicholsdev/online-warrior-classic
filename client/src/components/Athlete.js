import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Like from './Like';
import AthleteComments from './AthleteComments';
import AddComment from './AddComment';

const Athlete = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [athlete, setAthlete] = useState({});
    const [data, setComment] = useState({
        comment: ''
    });
    const [myData, setMyData] = useState({
        comment: ''
    });

    useEffect(() => {
        fetch(`http://localhost:5000/athletes/${id}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setAthlete({ ...result });
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [id]);

    const handleChange = (e) => {
        setComment({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (event) => {
        fetch(`http://localhost:5000/comments/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => setMyData({ ...result }))
            .catch(err => console.error(err));
        event.preventDefault();
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div key={athlete.athlete.athlete_id}>
                <div className="box">
                    <img src={athlete.athlete.image_url} alt="athlete" className="content-img"></img>
                    <Like id={athlete.athlete.athlete_id} hasVoted={!athlete.tOrF ? false : athlete.tOrF.vote}></Like>
                </div>
                <div className="container">
                    <div><strong>{athlete.athlete.name}</strong></div>
                    <div>{athlete.athlete.category}</div>
                    <AddComment comment={data.comment} handleSubmit={handleSubmit} handleChange={handleChange} />
                    <AthleteComments comment={myData} athleteId={athlete.athlete.athlete_id} />
                </div>
            </div>
        );
    };
};

export default Athlete;