import React, { Fragment, useEffect, useState } from 'react';

const Like = ({ like, id, hasVoted }) => {
    const [myLike, setMyLike] = useState(like);
    const [athlete, setAthlete] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [myBoolean, setMyBoolean] = useState(hasVoted);

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
    }, []);

    const handleClick = async () => {
        await fetch(`http://localhost:5000/athletes/${id}/like`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setMyLike({ ...result })
                    setMyBoolean(!myBoolean)
                },
                (error) => {
                    console.error(error)
                }
            )
        // .catch(error => console.error(error))
    };
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Fragment>
                <button onClick={handleClick} className={myBoolean ? 'like' : 'nothing'}>Like {myLike === like ? myLike : myLike.likes}</button>
            </Fragment>
        )
    }
};

export default Like;