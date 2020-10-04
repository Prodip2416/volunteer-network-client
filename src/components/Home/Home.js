import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Event from '../Event/Event';
import HomeHeader from './HomeHeader/HomeHeader';


const Home = () => {
    const [event, setEvent] = useState([]);
    const [title, setTitle] = useState('');
    let history = useHistory();

    useEffect(() => {
        fetch('https://volunteer-network-app.herokuapp.com/events')
            .then(res => res.json())
            .then(data => setEvent(data))
    }, []);

    useEffect(() => {
        fetch('https://volunteer-network-app.herokuapp.com/getEventsByTitle?title=' + title, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setEvent(data);
            })
    }, [title]);

    const handleAddEvent = (id) => {
        history.push(`/account/${id}`);
    }

    return (
        <div className="container">
            <HomeHeader handleSearch={(title) => setTitle(title)} />
            <div className="row bg-color">
                {
                    event && event.map(item => <Event key={item._id} task={item} handleAddEvent={handleAddEvent} />)
                }
            </div>
        </div>
    );
};

export default Home;