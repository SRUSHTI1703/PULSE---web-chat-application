import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { useGetConversations } from '../Services/chatService';
import { authenticationService } from '../Services/authenticationService';
import commonUtilities from '../Utilities/common';

const Conversations = props => {
    const [conversations, setConversations] = useState([]);
    const [newConversation, setNewConversation] = useState(null);

    const getConversations = useGetConversations();

    const currentUsername =
        authenticationService.currentUserValue.username;

    const handleRecipient = recipients => {
        for (let i = 0; i < recipients.length; i++) {
            if (
                recipients[i].username !== currentUsername
            ) {
                return recipients[i];
            }
        }

        return null;
    };

    useEffect(() => {
        getConversations().then(res => {
            setConversations(res);
        });
    }, [newConversation]);

    useEffect(() => {
        const socket = socketIOClient(
            process.env.REACT_APP_API_URL
        );

        socket.on('messages', data => {
            setNewConversation(data);
        });

        return () => {
            socket.removeListener('messages');
        };
    }, []);

    return (
        <div>

            {/* GLOBAL CHAT */}
            <div
                className="chat-list-item"
                onClick={() => {
                    props.setUser(null);
                    props.setScope('Global Chat');
                }}
            >
                <div className="avatar global-icon">
                    🌐
                </div>

                <div className="chat-list-info">
                    <div className="chat-list-name">
                        Global Chat
                    </div>

                    <div className="chat-list-preview">
                        Everyone can join this conversation
                    </div>
                </div>
            </div>

            {conversations &&
                conversations.map(c => {
                    const recipient =
                        handleRecipient(c.recipientObj);

                    if (!recipient) {
                        return null;
                    }

                    return (
                        <div
                            className="chat-list-item"
                            key={c._id}
                            onClick={() => {
                                props.setUser(recipient);
                                props.setScope(recipient.name);
                            }}
                        >
                            <div className="avatar-wrapper">
                                <div className="avatar">
                                    {commonUtilities.getInitialsFromName(
                                        recipient.name
                                    )}
                                </div>

                                <div className="online-dot" />
                            </div>

                            <div className="chat-list-info">
                                <div className="chat-list-name">
                                    {recipient.name}
                                </div>

                                <div className="chat-list-preview">
                                    {c.lastMessage || 'Start a conversation'}
                                </div>
                            </div>
                        </div>
                    );
                })}

            {(!conversations ||
                conversations.length === 0) && (
                <div className="sidebar-empty">
                    Your private conversations
                    <br />
                    will appear here.
                </div>
            )}
        </div>
    );
};

export default Conversations;