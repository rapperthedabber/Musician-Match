import Avatar from '@material-ui/core/Avatar'
import React from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_SINGLE_PROFILE } from '../../utils/queries';


const Message = ( {message, profile} ) => {
    const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, { variables: { profileId: message.senderId } });

    if (loading) {
        return <div>Loading...</div>;
    }

    const senderProfile = data?.profile;
    const isMyMessage = profile._id === message.senderId;
    console.log(isMyMessage)

    return (
        <div>
            { isMyMessage ? (
                 <div className='myChatScreenMessage'>
                    <p id = 'myMessage'>{message.message}</p>
                 </div>
            ) : (
                <div className = "chatScreenMessage"> 
                    <Avatar src = {senderProfile.url}></Avatar>
                    <p id ='chatMessage'>{message.message}</p>
                </div>
            )
            }
        </div>
    )
}

export default Message;