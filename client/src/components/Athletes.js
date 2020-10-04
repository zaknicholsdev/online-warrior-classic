import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Athletes = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [thing, setThing] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/athletes', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setIsLoaded(true);
                    setData({ ...result });
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
            <div className="row">
                {data.athletes ? data.athletes.map(athlete => (
                    <div className="column" key={athlete.athlete_id}>
                        <div className="r">
                            <img className="c athlete-main-img" style={{ backgroundImage: `url(${athlete.image_url})` }} />
                            <div className="c">
                                {athlete.name}
                            </div>
                            <i className="far fa-thumbs-up">{athlete.likes}</i>
                            <i className={athlete.liked_athletes > 0 ? 'likes c fas fa-heart' : 'c far fa-heart'}></i>
                            {/* <div className="c">
                                {athlete.category}
                            </div> */}
                            <div className="c">
                                <Link to={`/athlete/${athlete.athlete_id}`}>View Athlete</Link>
                            </div>
                        </div>
                    </div>
                )) : <div>There are no athletes.</div>}
            </div>
        );
    }
};

export default Athletes;