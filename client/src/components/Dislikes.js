import React, { useState } from 'react';

const Dislike = ({ dislike, id }) => {
    const [myDislike, setMyDislike] = useState(dislike);
    console.log(myDislike)
    const handleClick = async () => {
        await fetch(`http://localhost:5000/athletes/${id}/dislike`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(...result);
                    setMyDislike(...result)
                },
                (error) => {
                    console.error(error)
                }
            )
            .catch(error => console.error(error))
    };
    return (
        <button onClick={handleClick}>Dislike {myDislike === dislike ? myDislike : myDislike.dislikes}</button>
    )
};

export default Dislike;