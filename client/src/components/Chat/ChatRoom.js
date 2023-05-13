import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery, useSubscription ,useMutation } from '@apollo/client'
import { QUERY_MESSAGES_BY_CHATROOM, QUERY_ME } from '../../utils/queries';
import { SEND_NEW_MESSAGE, UPDATE_CHAT_ROOM } from '../../utils/mutations';
import { NEW_MESSAGES } from '../../utils/subscriptions';
import Message from './Message';



const ChatRoom = () => {
    const [newMessages, setNewMessagesState] = useState([]);
    const { chatRoomId } = useParams();
    const meQuery = useQuery(QUERY_ME);
    const messagesQuery = useQuery(QUERY_MESSAGES_BY_CHATROOM, { variables: { chatRoomId: chatRoomId } });
    const newMessagesSubscription = useSubscription(NEW_MESSAGES, { variables: { chatRoomId: chatRoomId } })
    const [sendNewMessage, { messageData, messageError }] = useMutation(SEND_NEW_MESSAGE);
    const [updateChatRoom, { roomData, roomError }] = useMutation(UPDATE_CHAT_ROOM);

    if (messagesQuery.loading || meQuery.loading) {
        return <div>Loading...</div>;
    }

    const messages = messagesQuery.data?.chatMessagesByChatRoomId;
    const profile = meQuery.data?.me;
    console.log(newMessagesSubscription);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newMessage = document.getElementById('newMessage').value;
        if (newMessage.trim() === '') {
            alert(`Message must not be empty`);
        }
        try {
            const { data }= await sendNewMessage({
              variables: { chatRoomId: chatRoomId, senderId: profile?._id, message: newMessage },
              onCompleted: (data) => {
               try {
                const { data }= updateChatRoom({
                    variables: { chatRoomId: chatRoomId, lastMessage: newMessage },
                })
               } catch (err) {

               }
              },
            });
          
          } catch (err) {
            console.error(err);
          }
    };

    return (
        <div>
            <h1>Chat Room</h1>
            {messages?.map((message) => {
                return <Message
                    key={message._id}
                    message={message}
                    profile={profile}
                />
            })}
            <div>
            <form onSubmit={handleSubmit} >
                <input id="newMessage" placeholder="message" name="newMessage" type="string" />
                <button className="btn btn-block btn-info" style={{ cursor: 'pointer' }} type="submit"
                 >
                    SEND
                </button>
            </form>
            </div>
        </div>
    )
}

export default ChatRoom;