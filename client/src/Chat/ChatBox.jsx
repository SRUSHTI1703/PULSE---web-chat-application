import React, {
    useState,
    useEffect,
    useRef
} from 'react';

import socketIOClient from 'socket.io-client';

import commonUtilities from '../Utilities/common';

import {
    useGetGlobalMessages,
    useSendGlobalMessage,
    useGetConversationMessages,
    useSendConversationMessage,
} from '../Services/chatService';

import {
    authenticationService
} from '../Services/authenticationService';

const ChatBox = props => {

    const [currentUserId] = useState(
        authenticationService.currentUserValue.userId
    );

    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState(null);

    const getGlobalMessages =
        useGetGlobalMessages();

    const sendGlobalMessage =
        useSendGlobalMessage();

    const getConversationMessages =
        useGetConversationMessages();

    const sendConversationMessage =
        useSendConversationMessage();

    const chatBottom = useRef(null);

    useEffect(() => {
        reloadMessages();
    }, [
        lastMessage,
        props.scope,
        props.user
    ]);

    useEffect(() => {
        const socket = socketIOClient(
            process.env.REACT_APP_API_URL
        );

        socket.on('messages', data => {
            setLastMessage(data);
        });

        return () => {
            socket.removeListener('messages');
        };
    }, []);

    const reloadMessages = () => {

        if (props.scope === 'Global Chat') {

            getGlobalMessages().then(res => {
                setMessages(res);
            });

        } else if (
            props.scope !== null &&
            props.user !== null
        ) {

            getConversationMessages(
                props.user._id
            ).then(res => {
                setMessages(res);
            });

        } else {

            setMessages([]);

        }
    };

    const scrollToBottom = () => {
        if (chatBottom.current) {
            chatBottom.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = e => {

        e.preventDefault();

        if (!newMessage.trim()) {
            return;
        }

        if (props.scope === 'Global Chat') {

            sendGlobalMessage(newMessage).then(() => {
                setNewMessage('');
            });

        } else if (props.user) {

            sendConversationMessage(
                props.user._id,
                newMessage
            ).then(() => {
                setNewMessage('');
            });

        }
    };

    const getInitials = name => {
        return commonUtilities
            .getInitialsFromName(name);
    };

    return (
        <>

            {/* HEADER */}
            <div className="chat-header">

                {props.scope === 'Global Chat' ? (

                    <div>
                        <div className="chat-header-global">
                            <span>Global</span> Chat
                        </div>

                        <div className="chat-header-status">
                            Public conversation
                        </div>
                    </div>

                ) : props.user ? (

                    <div className="chat-header-user">

                        <div className="avatar-wrapper">
                            <div className="avatar large">
                                {getInitials(
                                    props.user.name
                                )}
                            </div>

                            <div className="online-dot" />
                        </div>

                        <div>
                            <div className="chat-header-name">
                                {props.user.name}
                            </div>

                            <div className="chat-header-status">
                                ● Online
                            </div>
                        </div>

                    </div>

                ) : (

                    <div>
                        <div className="chat-header-global">
                            PULSE
                        </div>

                        <div className="chat-header-status">
                            Select a conversation
                        </div>
                    </div>

                )}

            </div>

            {/* EMPTY STATE */}
            {!props.scope ? (

                <div className="chat-empty">
                    <div>
                        <div className="chat-empty-icon">
                            💬
                        </div>

                        <h2>
                            Start a conversation
                        </h2>

                        <p>
                            Choose someone from the sidebar
                            to start chatting.
                        </p>
                    </div>
                </div>

            ) : (

                <>

                    {/* MESSAGES */}
                    <div className="messages-container">

                        {messages &&
                            messages.length > 0 ? (

                            messages.map(m => {

                                const sender =
                                    m.fromObj &&
                                    m.fromObj[0];

                                if (!sender) {
                                    return null;
                                }

                                const mine =
                                    sender._id ===
                                    currentUserId;

                                return (
                                    <div
                                        key={m._id}
                                        className={
                                            mine
                                                ? 'message-row mine'
                                                : 'message-row'
                                        }
                                    >

                                        <div className="message-avatar">
                                            {getInitials(
                                                sender.name
                                            )}
                                        </div>

                                        <div className="message-content">

                                            <div className="message-author">
                                                {mine
                                                    ? 'You'
                                                    : sender.name}
                                            </div>

                                            <div className="message-bubble">
                                                {m.body}
                                            </div>

                                        </div>

                                    </div>
                                );
                            })

                        ) : (

                            <div className="chat-empty">
                                <div>
                                    <div className="chat-empty-icon">
                                        {props.scope === 'Global Chat'
                                            ? '🌐'
                                            : '💬'}
                                    </div>

                                    <h2>
                                        No messages yet
                                    </h2>

                                    <p>
                                        Be the first person
                                        to say something.
                                    </p>
                                </div>
                            </div>

                        )}

                        <div ref={chatBottom} />

                    </div>

                    {/* COMPOSER */}
                    <div className="message-composer">

                        <form
                            className="message-form"
                            onSubmit={handleSubmit}
                        >

                            <input
                                className="message-input"
                                value={newMessage}
                                onChange={e =>
                                    setNewMessage(
                                        e.target.value
                                    )
                                }
                                placeholder={
                                    props.scope === 'Global Chat'
                                        ? 'Message everyone...'
                                        : `Message ${props.scope}...`
                                }
                            />

                            <button
                                className="send-button"
                                type="submit"
                            >
                                ➤
                            </button>

                        </form>

                    </div>

                </>

            )}

        </>
    );
};

export default ChatBox;