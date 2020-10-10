import React from 'react';

const AddComment = ({ comment, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={comment} name="comment" onChange={handleChange} />
            <input type="submit" value="Submit" />
        </form>
    )
};

export default AddComment;