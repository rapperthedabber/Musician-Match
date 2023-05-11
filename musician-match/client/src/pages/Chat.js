import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_ME, QUERY_PROFILE_CHATROOMS, QUERY_SINGLE_PROFILE } from '../utils/queries';
import Auth from '../utils/auth';

const Chat = () => {
    const queryRes = useQuery(QUERY_ME);
    const profileId = queryRes?.data?.me?._id;

    const { loading, data } = useQuery(QUERY_PROFILE_CHATROOMS, { variables: { profileId: profileId} });

    const chatRooms = data?.chatRoomsByProfileId;
    const temp = [];
    for (let i = 0; i < chatRooms?.length; i++) {
        const lastMessage = chatRooms[i].lastMessage;
        const otherProfileId = chatRooms[i].initiatorId != profileId ? chatRooms[i].initiatorId : chatRooms[i].receiverId;
        temp.push({
            name: otherProfileId,
            message: lastMessage,
            image: "",
        });
    }

    // maybe return empty array if no profile id
    //const profile = data?.me || data?.profile || {};
    const People = [{
        name: 'Mick Jagger',
        message: 'hi',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mick_Jagger_Deauville_2014.jpg/220px-Mick_Jagger_Deauville_2014.jpg'

    },
    {
        name: 'Elvis Presley',
        message: 'Whats up',
        image: 'https://www.gannett-cdn.com/presto/2021/08/12/PMCA/371d3991-9f87-4267-b38e-c472f6c9316c-Elvis_60s_08.JPG?width=300&height=395&fit=crop&format=pjpg&auto=webp'
    }];

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
        <Link to={`/chat/${People.name}`}>
            <div>
                {temp.map((response) => (

                    <div className='Chat'>
                        <h2>{response.name}</h2>
                        <h10>{response.message}</h10>
                        <Avatar id="profilePic" src={response.image} />
                    </div>

                ))}


            </div>
        </Link>
    );
};

export default Chat;
