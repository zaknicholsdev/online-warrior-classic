import React from 'react';

const AddComment = ({ comment, handleChange, handleSubmit }) => {
    return (
        <form className="container" onSubmit={handleSubmit}>
            <label>
                Comment:
                    <input type="text" value={comment} name="comment" onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
};

export default AddComment;