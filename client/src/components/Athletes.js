import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Athletes = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

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
    } else if (data?.msg === 'No token. Authorization denied') {
        return (
            <div>You're not logged in.</div>
        )
    } else {
        return (
            // <div className="row">
            //     {data.athletes ? data.athletes.map(athlete => (
            //         <div className="column" key={athlete.athlete_id}>
            //             <div className="r">
            //                 <img className="c athlete-main-img" style={{ backgroundImage: `url(${athlete.image_url})` }} />
            //                 <div className="c">
            //                     {athlete.name}
            //                 </div>
            //                 <i className="far fa-thumbs-up">{athlete.likes}</i>
            //                 <i className={athlete.liked_athletes > 0 ? 'likes c fas fa-heart' : 'c far fa-heart'}></i>
            //                 {/* <div className="c">
            //                     {athlete.category}
            //                 </div> */}
            //                 <div className="c">
            //                     <Link to={`/athlete/${athlete.athlete_id}`}>View</Link>
            //                 </div>
            //             </div>
            //         </div>
            //     )) : <div>There are no athletes.</div>}
            // </div>
            <table>
                <caption>Athletes</caption>
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Total Likes</th>
                        <th scope="col">You liked</th>
                        <th scope="col">Visit athlete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.athletes ? data.athletes.map(athlete => (
                        <tr key={athlete.athlete_id}>
                            <td data-label="Image" >
                                <img className="c athlete-main-img" style={{ backgroundImage: `url(${athlete.image_url})` }} />
                            </td>
                            <td data-label="Name">{athlete.name}</td>
                            <td data-label="Total Likes">{athlete.likes}</td>
                            <td data-label="Has Liked">
                                <i className={athlete.liked_athletes > 0 ? 'likes fas fa-heart' : 'far fa-heart'}></i>
                            </td>
                            <td data-label="View Athlete">
                                <Link to={`/athlete/${athlete.athlete_id}`}>View</Link>
                            </td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
        );
    }
};

export default Athletes;