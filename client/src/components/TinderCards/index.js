
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import TinderCard from 'react-tinder-card'
// import { encode, decode } from 'https://cdn.jsdelivr.net/npm/js-base64@3.7.5/base64.mjs'

import placeholder from '../../assets/placeholder.png'
import Auth from '../../utils/auth'

import { QUERY_PROFILES, QUERY_ME } from '../../utils/queries'

import { ADD_LIKE, ADD_MATCH, ADD_SWIPE, CREATE_CHAT_ROOM } from '../../utils/mutations';



export default function TinderCards() {
  const { data: data1 } = useQuery(QUERY_PROFILES);
  const { data: data2 } = useQuery(QUERY_ME)
  const people = data1?.profiles || [];
  console.log(people)
  const [likeProfile] = useMutation(ADD_LIKE)
  const [match] = useMutation(ADD_MATCH)
  // const [addSwipe] = useMutation(ADD_SWIPE)
  const [createChatRoom] = useMutation(CREATE_CHAT_ROOM)
// console.log(data2?.me.swipedProfiles)
  // const swipedProfiles = data2?.me.swipedProfiles
  // console.log(swipedProfiles)
  // const onSwipe = (direction) => {
  //   console.log('You swiped: ' + direction)
  //   return direction
  // }

  const onSwipeLeft = (myIdentifier) => {
    console.log(myIdentifier)
    // addSwipe({
    //   variables: { profileId: Auth.getProfile().data._id, swipedProfileId: myIdentifier }
    // })
  }

  const onSwipeRight = (myIdentifier, theirLikes) => {
    console.log('right')
    if (theirLikes.includes(Auth.getProfile().data._id)) {
      console.log('Match worked')
      // alert("You Matched!")

      match({
        variables: { profileId: Auth.getProfile().data._id, matchedProfileId: myIdentifier }
      })
      // reverse match
      match({
        variables: { profileId: myIdentifier, matchedProfileId: Auth.getProfile().data._id }
      })

      createChatRoom({
        variables: {initiatorId: Auth.getProfile().data._id, receiverId: myIdentifier, lastMessage: "Time to start jamming"}
      })

    } else {

      likeProfile({
        variables: { profileId: Auth.getProfile().data._id, likedProfileId: myIdentifier }
      })
    }

  //   addSwipe({
  //     variables: { profileId: Auth.getProfile().data._id, swipedProfileId: myIdentifier }
  //   })
   }

  const onCardLeftScreen = (myIdentifier, theirLikes) => {
    console.log(myIdentifier + ' left the screen')
  }

  return (

    <div>
      <h1>Music Cards</h1>
      <div className='tinderContainer'>
        {people.map((person) => (
  
          <TinderCard
            className='swipe'
            key={person._id}
            value={person._id}
            onSwipe={(direction) => direction === 'left' ? onSwipeLeft(person._id) : onSwipeRight(person._id, person.likedProfiles)}
            onCardLeftScreen={() => onCardLeftScreen(person._id, person.likedProfiles)}
            preventSwipe={['up', 'down']}

          >
            <div
              style={{ backgroundImage: `url(${person.url ? person.url : placeholder})` }}
              className='card'>
              <h1 id="name">{person.name}</h1>
              <h4 id="instrument">{person.instrument}</h4>
              <h5 id="tinderBio">{person.bio}</h5>
            </div>
          </TinderCard>
         
        ))}
      </div>
    </div>
  )
}