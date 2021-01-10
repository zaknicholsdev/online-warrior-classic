import React, { useState, useRef, Fragment } from 'react';

const Vote = ({ vote, id }) => {
    const [myVote, setMyVote] = useState(vote);
    console.log(myVote)
    const handleClick = async () => {
        await fetch(`http://localhost:5000/athletes/${id}/vote`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vote: false })
        })
            .then(res => res.json())
            .then(result => {
                setMyVote({ ...result })
            })
            .catch(error => console.error(error))
    };

    return (
        <Fragment>
            <button onClick={handleClick} className={myVote.update ? 'like' : null}>Like {myVote === vote ? myVote : myVote.likes}</button>
            <button onClick={handleClick} className={myVote.update ? 'dislike' : null}>Dislike {myVote === vote ? myVote : myVote.dislikes}</button>
        </Fragment>
    );
};

export default Vote;