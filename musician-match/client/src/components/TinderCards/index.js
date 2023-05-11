
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import TinderCard from 'react-tinder-card'
import { encode, decode } from 'https://cdn.jsdelivr.net/npm/js-base64@3.7.5/base64.mjs'

import placeholder from '../../assets/placeholder.png'
import Auth from '../../utils/auth'

import { QUERY_PROFILES } from '../../utils/queries'
import { ADD_LIKE } from '../../utils/mutations';


export default function TinderCards() {
    const { loading, data } = useQuery(QUERY_PROFILES);
    const people = data?.profiles || [];

    const [likeProfile] = useMutation(ADD_LIKE) 
//     const [person, setperson] =useState([
// {
//      name: 'Freddie Mercury',
//     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg/220px-Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg'
//     },
// {
//     name: 'Mick Jagger',
//     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mick_Jagger_Deauville_2014.jpg/220px-Mick_Jagger_Deauville_2014.jpg'
// }, {
//     name: 'Elvis Presley',
//     url: 'https://www.gannett-cdn.com/presto/2021/08/12/PMCA/371d3991-9f87-4267-b38e-c472f6c9316c-Elvis_60s_08.JPG?width=300&height=395&fit=crop&format=pjpg&auto=webp'
// }
// ,{
//     name: 'Adam Jones',
//     url:"https://cdn.mos.cms.futurecdn.net/uLAV8J7KdcAcktvadEayxd-970-80.jpg.webp"
    
// }])



// const onSwipe = (direction) => {
//     console.log(direction)
//     if (direction === 'right') {
//       console.log('hey', direction)
//       const { data } = likeProfile({
//         variables: { profileId: Auth.getProfile().data._id, likedProfileId: TinderCard.value }
//       })
//     }
//     if (direction === 'left') {
//       console.log('goodbye', direction)
//     }
//   }
const onSwipe = (direction) => {
  console.log('You swiped: ' + direction)
  return direction
}

const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + ' left the screen')
      return likeProfile({
        variables: { profileId: Auth.getProfile().data._id, likedProfileId: myIdentifier }
      })
    }
return(
    
<div>
    <h1>Music Cards</h1>
    <div className='tinderContainer'>
  {people.map((person) => (
    
        <TinderCard
    className='swipe'
    key={person._id}
    value={person._id}
    onSwipe={onSwipe}
    onCardLeftScreen={() => onCardLeftScreen(person._id)}
    preventSwipe={['up', 'down']}
    
    >
        <div 
        style = {{backgroundImage: `url(${person.image ? person.image : placeholder})`}}
        className='card'
        >
   <h1 id="name">{person.name}</h1>
   </div>
   </TinderCard>
   
  ))}
  </div>
</div>
)
  }
// import TinderCard from 'react-tinder-card'



// export default function TinderCards() {
// const onSwipe = (direction) => {
    
//   console.log('You swiped: ' + direction)
// }

// const onCardLeftScreen = (myIdentifier) => {
//   console.log(myIdentifier + ' left the screen')
// }

// return (
//   <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>Hello, World!</TinderCard>
// )

// }
// }