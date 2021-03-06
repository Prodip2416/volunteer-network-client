import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './EventTask.css';
import NoEvent from './NoEvent';
import UserEvent from './UserEvent';

const EventTask = () => {
    const [event, setEvent] = useState([]);
    const [loggedInUser] = useContext(UserContext);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        fetch('https://volunteer-network-app.herokuapp.com/getEventsByUser?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setEvent(data);
                setIsDeleted(false);
            })
    }, [loggedInUser.email, isDeleted]);

    const handleDelete = (id) => {
        fetch(`https://volunteer-network-app.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then((result => {
                if (result) {
                    setIsDeleted(true);
                }
            }));
    }

    return (
        <div className="">
            <div className="row header event">
                <div className="col-md-5 mt-2 mb-2">
                    <Link to="/">
                        <img src="https://i.ibb.co/7r5h4KD/Group-1329.png" className="ml-5 w-50" alt="img" />
                    </Link>
                </div>
                <div className="col-md-7 text-right mt-3">
                    <ul>
                        <li className="ml-3 mt-2"><Link to="/">Home</Link></li>
                        <li className="ml-3 mt-2"><Link to="/">Donation</Link></li>
                        <li className="ml-3 mt-2"><Link to="/eventTask">Events</Link></li>
                        <li className="ml-3 mt-2"><Link to="/">Blog</Link></li>
                        <li className="ml-5 mt-2">{loggedInUser.displayName}</li>
                    </ul>
                </div>
            </div>
            <section className="event-list">
                <div className="row">
                    {
                        event.length ? event.map(item => <UserEvent key={item._id} task={item} handleDelete={handleDelete} />)
                            : <NoEvent />
                    }
                </div>
            </section>
        </div>
    );
};

export default EventTask;