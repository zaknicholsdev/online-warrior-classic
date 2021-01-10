import React, { Fragment, useEffect, useState } from 'react';

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
                <i onMouseDown={handleClick} className={myBoolean ? 'fas heart fa-heart' : 'heart far fa-heart'}></i>
            </Fragment>
        )
    };
};

export default Like;