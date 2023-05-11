import Avatar from '@material-ui/core/Avatar'
import { Link, useParams} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_PROFILE_CHATROOMS } from '../../utils/queries';

export default function RenderChats() {
    const People = [{
        name: 'Mick Jagger',
        message: 'hi',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mick_Jagger_Deauville_2014.jpg/220px-Mick_Jagger_Deauville_2014.jpg'

    },
    {
        name: 'Elvis Presley',
        message: 'Whats up',
        image: 'https://www.gannett-cdn.com/presto/2021/08/12/PMCA/371d3991-9f87-4267-b38e-c472f6c9316c-Elvis_60s_08.JPG?width=300&height=395&fit=crop&format=pjpg&auto=webp'
    }]

    const { profileId } = useParams();
    const chatRooms = useQuery(QUERY_PROFILE_CHATROOMS, {variables: { profileId: profileId }} );
    console.log(chatRooms)


    return (
        <Link to={`/chat/${People.name}`}>
            <div>
                {People.map((response) => (

                    <div className='Chat'>
                        <h2>{response.name}</h2>
                        <h10>{response.message}</h10>
                        <Avatar id="profilePic" src={response.image} />
                    </div>

                ))}


            </div>
        </Link>
    )
}