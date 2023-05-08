import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
export default function renderChats(){
    const People = [{
        name: 'Mick Jagger',
        message: 'hi',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mick_Jagger_Deauville_2014.jpg/220px-Mick_Jagger_Deauville_2014.jpg'
        
    }, 
{name: 'Elvis Presley',
message: 'Whats up',
image: 'https://www.gannett-cdn.com/presto/2021/08/12/PMCA/371d3991-9f87-4267-b38e-c472f6c9316c-Elvis_60s_08.JPG?width=300&height=395&fit=crop&format=pjpg&auto=webp'}]

return(
<Link to ={`/chat/${People.name}`}>
<div>
{People.map((response)=>(

<div className= 'Chat'>
<h2>{response.name}</h2>
<h10>{response.message}</h10>
<Avatar id= "profilePic" src = {response.image}/>
 </div>
    
))}


</div>
</Link>
)
}