import React, {useState} from 'react'
import TinderCard from 'react-tinder-card'

export default function TinderCards() {
    const [person, setperson] =useState([
{
        name: 'Freddie Mercury',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg/220px-Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg'
    },
{
    name: 'Mick Jagger',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mick_Jagger_Deauville_2014.jpg/220px-Mick_Jagger_Deauville_2014.jpg'
}])
return(
<div>
    <h1>Music Cards</h1>
    <div className='tinderContainer'>
  {person.map((people) => (
    
    <TinderCard
    className='swipe'
    key={person.name}
    preventSwipe={['up', 'down']}>
        <div 
         style = {{backgroundImage: `url(${people.url})`}}
        className='card'>
   <h1 id = "name">{people.name}</h1>
   </div>
   </TinderCard>
   
  ))}
  </div>
</div>
)
}