import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_SINGLE_PROFILE } from '../../utils/queries';

const ChatRoomBox = ({ chatRoom, otherProfileId }) => {
    const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, { variables: { profileId: otherProfileId } });

    if (loading) {
        return <div>Loading...</div>;
    }

    const otherProfile = data?.profile;

    return (
        <Link to={`/chat/${chatRoom._id}`}>
            <div>
                <div className='Chat'>
                    <h2>{otherProfile.name}</h2>
                    <h10>{chatRoom.lastMessage}</h10>
                    <Avatar id="profilePic" src={otherProfile.url} />
                </div>
            </div>
        </Link>
    )
}

export default ChatRoomBox;