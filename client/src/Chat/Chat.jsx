import React, { useState } from 'react';

import Header from '../Layout/Header';
import ChatBox from './ChatBox';
import Conversations from './Conversations';
import Users from './Users';

import { authenticationService } from '../Services/authenticationService';

const Chat = () => {
    const [scope, setScope] = useState('Global Chat');
    const [tab, setTab] = useState(0);
    const [user, setUser] = useState(null);

    const currentUser =
        authenticationService.currentUserValue;

    return (
        <div className="chat-app">

            {/* SIDEBAR */}
            <aside className="chat-sidebar">

                <div className="sidebar-header">

                    <div className="sidebar-brand">
                        <div className="sidebar-logo">
                            PULSE<span>.</span>
                        </div>

                        <Header />
                    </div>

                    <div className="sidebar-user">
                        <div className="avatar">
                            {currentUser.name
                                .split(' ')
                                .map(part => part[0])
                                .join('')
                                .substring(0, 2)
                                .toUpperCase()}
                        </div>

                        <div className="sidebar-user-info">
                            <div className="sidebar-user-name">
                                {currentUser.name}
                            </div>

                            <div className="sidebar-user-status">
                                ● Online
                            </div>
                        </div>
                    </div>

                    <div
                        className="sidebar-search"
                        style={{ marginTop: 18 }}
                    >
                        <span className="sidebar-search-icon">
                            ⌕
                        </span>

                        <input
                            placeholder="Search conversations..."
                            disabled
                        />
                    </div>
                </div>

                <div className="sidebar-tabs">
                    <button
                        className={
                            tab === 0
                                ? 'sidebar-tab active'
                                : 'sidebar-tab'
                        }
                        onClick={() => setTab(0)}
                    >
                        CHATS
                    </button>

                    <button
                        className={
                            tab === 1
                                ? 'sidebar-tab active'
                                : 'sidebar-tab'
                        }
                        onClick={() => setTab(1)}
                    >
                        USERS
                    </button>
                </div>

                <div className="sidebar-content">
                    {tab === 0 ? (
                        <Conversations
                            setUser={setUser}
                            setScope={setScope}
                        />
                    ) : (
                        <Users
                            setUser={setUser}
                            setScope={setScope}
                        />
                    )}
                </div>
            </aside>

            {/* MAIN CHAT */}
            <main className="chat-main">
                <ChatBox
                    scope={scope}
                    user={user}
                />
            </main>
        </div>
    );
};

export default Chat;