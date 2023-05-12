import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import ChatRooms from '../components/Chat/ChatRooms';

const Chat = () => {
    const  {loading, data } = useQuery(QUERY_ME);


    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const profile = data?.me;
    
    if (!Auth.loggedIn()) {
        return (
            <h4 className={'font-sans'}>
                You need to be Logged in to view
            </h4>
        );
    }

    return (
        <div>
            <ChatRooms profile={profile}/>
        </div>
    );
};

export default Chat;
