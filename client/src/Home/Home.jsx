import React, { useState, useEffect } from 'react';

import Login from './Login';
import Register from './Register';

import history from '../Utilities/history';
import { authenticationService } from '../Services/authenticationService';

const Home = () => {
    const [page, setPage] = useState('login');

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            history.push('/chat');
        }
    }, []);

    const handleClick = location => {
        setPage(location);
    };

    return (
        <div className="auth-page">
            <div className="auth-brand">
                <div className="brand-logo">
                    PULSE<span>.</span>
                </div>

                <div className="brand-content">
                    <div className="brand-eyebrow">
                        Modern communication
                    </div>

                    <h1 className="brand-title">
                        Conversations that
                        <br />
                        feel <span>instant.</span>
                    </h1>

                    <p className="brand-description">
                        Connect with people, share ideas and stay
                        in the conversation. Simple messaging,
                        redesigned for the modern web.
                    </p>

                    <div className="feature-list">
                        <div className="feature-item">
                            <div className="feature-dot" />
                            Real-time messaging
                        </div>

                        <div className="feature-item">
                            <div className="feature-dot" />
                            Private conversations
                        </div>

                        <div className="feature-item">
                            <div className="feature-dot" />
                            Global chat
                        </div>
                    </div>
                </div>
            </div>

            <div className="auth-panel">
                {page === 'login' ? (
                    <Login handleClick={handleClick} />
                ) : (
                    <Register handleClick={handleClick} />
                )}
            </div>
        </div>
    );
};

export default Home;