import React, { useState, useEffect } from 'react';

const AthleteComments = ({ athleteId, comment }) => {
    const [comments, setComments] = useState([]);
    console.log('rendering', comment)

    useEffect(() => {
        fetch(`http://localhost:5000/comments/${athleteId}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(result => {
                setComments([...result]);
            })
            .catch(err => console.error(err))
    }, [comment]);

    return (
        <div className="container">
            <div>{comments.length >= 0 ? comments.map(comment => (
                <div className="comment-column space" key={comment.comment_id}>
                    <div><strong>{comment.username}</strong></div>
                    <p className="no-p-margin">{comment.body}</p>
                    <div><i>{comment.created_on}</i></div>
                </div>
            )) : <div>There are no comments.</div>}</div>
        </div>
    )
};

export default AthleteComments;