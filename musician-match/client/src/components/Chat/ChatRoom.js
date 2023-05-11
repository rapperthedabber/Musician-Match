import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { QUERY_MESSAGES_BY_CHATROOM, QUERY_ME } from '../../utils/queries';
import Message from './Message';


const ChatRoom = () => {
    const { chatRoomId } = useParams();
    const messagesQuery = useQuery(QUERY_MESSAGES_BY_CHATROOM, { variables: { chatRoomId: chatRoomId } });
    const meQuery = useQuery(QUERY_ME);

    if (messagesQuery.loading || meQuery.loading) {
        return <div>Loading...</div>;
    }

    const messages = messagesQuery.data?.chatMessagesByChatRoomId;
    const profile = meQuery.data?.me;

    return (
        <div>
            <h1>Chat Room</h1>
            {messages.map((message) => {
                return <Message
                    message={message}
                    profile={profile}
                />
            })}
            <div>
            <input id="sendMessage" placeholder="message"
            // name="newMessage"
            // type="string"
            // value=''
            // onChange=''
            />
            <button className="btn btn-block btn-info" style={{ cursor: 'pointer' }} type="submit">
                SEND
            </button>
            </div>
        </div>
    )
}

export default ChatRoom;