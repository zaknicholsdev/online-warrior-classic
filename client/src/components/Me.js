import React, { useEffect, useState } from 'react';

const Me = () => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/users/me`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoaded(true);
            })
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', file);

        const options = {
            method: 'POST',
            credentials: 'include',
            body: formData
        };
        
        fetch('http://localhost:5000/users/upload', options)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
            });
    };

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        isLoaded && data.likedAthletes ? <div className="text-center">
            <div>Username: {data.user.username} </div>
            <div>User ID: {data.user.user_id}</div>
            {data.likedAthletes.map(athlete => (
                <div key={athlete.athlete_id}>
                    <div>Name: {athlete.name}</div>
                    <img alt='athlete' className='small-img' src={athlete.image_url}></img>
                </div>
            ))}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange={handleChange} />
                <button type="submit">Upload</button>
            </form>
        </div> : <div>You must not be logged in.</div>
    );
};

export default Me;