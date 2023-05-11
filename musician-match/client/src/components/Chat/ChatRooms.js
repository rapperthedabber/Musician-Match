import { useQuery } from '@apollo/client'
import { QUERY_PROFILE_CHATROOMS } from '../../utils/queries';
import ChatRoomBox from './ChatRoomBox';

const ChatRoom = ( {profile} ) => {
    const { loading, data } = useQuery(QUERY_PROFILE_CHATROOMS, { variables: { profileId: profile._id } });
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    const chatRooms = data?.chatRoomsByProfileId;

    return (
        <div>
            {chatRooms.map((chatRoom) => {
                return <ChatRoomBox 
                            chatRoom={chatRoom}
                            otherProfileId={chatRoom.initiatorId !== profile._id ? chatRoom.initiatorId : chatRoom.receiverId}
                        />
            })}
        </div>
    )
}

export default ChatRoom;