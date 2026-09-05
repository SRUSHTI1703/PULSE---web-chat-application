import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { useGetUsers } from '../Services/userService';
import commonUtilities from '../Utilities/common';

const Users = props => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(null);

    const getUsers = useGetUsers();

    useEffect(() => {
        getUsers().then(res => {
            setUsers(res);
        });
    }, [newUser]);

    useEffect(() => {
        const socket = socketIOClient(
            process.env.REACT_APP_API_URL
        );

        socket.on('users', data => {
            setNewUser(data);
        });

        return () => {
            socket.removeListener('users');
        };
    }, []);

    return (
        <div>
            {users &&
                users.map(u => (
                    <div
                        className="chat-list-item"
                        key={u._id}
                        onClick={() => {
                            props.setUser(u);
                            props.setScope(u.name);
                        }}
                    >
                        <div className="avatar-wrapper">
                            <div className="avatar">
                                {commonUtilities.getInitialsFromName(
                                    u.name
                                )}
                            </div>

                            <div className="online-dot" />
                        </div>

                        <div className="chat-list-info">
                            <div className="chat-list-name">
                                {u.name}
                            </div>

                            <div className="chat-list-preview">
                                Available to chat
                            </div>
                        </div>
                    </div>
                ))}

            {(!users || users.length === 0) && (
                <div className="sidebar-empty">
                    No other users found.
                </div>
            )}
        </div>
    );
};

export default Users;