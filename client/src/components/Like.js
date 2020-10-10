import React, { Fragment, useEffect, useState, useRef } from 'react';

const Like = ({ id, hasVoted }) => {
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
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    const handleClick = () => {
        fetch(`http://localhost:5000/athletes/${id}/like`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(() => {
                setMyBoolean(!myBoolean)
            },
                (error) => {
                    console.error(error)
                }
            )
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Fragment>
                <div onClick={handleClick} className={myBoolean ? 'like fas heart fa-heart' : 'like heart far fa-heart'}></div>
            </Fragment>
        )
    };
};

export default Like;