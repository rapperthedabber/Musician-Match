import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_SINGLE_PROFILE } from '../../utils/queries';

export default function ChatRoomBox(profileId, baseChatRoomInfo) {
    let otherProfileId = baseChatRoomInfo.initiatorId !== profileId ? baseChatRoomInfo.initiatorId : baseChatRoomInfo.receiverId;
    let otherProfile = useQuery(QUERY_SINGLE_PROFILE, { variables: {profileId: otherProfileId} });
    console.log(otherProfile);

    return (
        <Link to={`/chat/${baseChatRoomInfo._id}`}>
            <div>
                <div className='Chat'>
                    <h2>{otherProfile.name}</h2>
                    <h10>{baseChatRoomInfo.lastMessage}</h10>
                    <Avatar id="profilePic" src={otherProfile.image} />
                </div>
            </div>
        </Link>
    )
}