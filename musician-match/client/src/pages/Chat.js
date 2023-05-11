import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_PROFILE_CHATROOMS } from '../utils/queries';
import Auth from '../utils/auth';
import ChatRoomBox from '../components/Chat/ChatRoomBox';

const Chat = () => {
    const queryRes = useQuery(QUERY_ME);
    const profileId = queryRes?.data?.me?._id;
    console.log(profileId)

    const { loading, data } = useQuery(QUERY_PROFILE_CHATROOMS, { variables: { profileId: profileId } });

    let chatRooms = []
    chatRooms = data?.chatRoomsByProfileId;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Auth.loggedIn()) {
        return (
            <h4 className={'font-sans'}>
                You need to be Logged in to view
            </h4>
        );
    }

    return (
        <div>
            {chatRooms.map((chatRoom) => (
                <div>
                    <ChatRoomBox
                        profileId={profileId}
                        baseChatRoomInfo={chatRoom}
                    />
                </div>
            ))}
        </div>
    );
};

export default Chat;
