import TinderCard from "../TinderCards";
import { useMutation, useQuery } from '@apollo/client';
import { Link, Routes } from 'react-router-dom';

import placeholder from '../../assets/placeholder.png'
import Auth from '../../utils/auth'

import { QUERY_PROFILES, QUERY_ME } from '../../utils/queries'

import React, { useState } from 'react'


import axios from "axios";
import { ADD_LIKE, ADD_MATCH, CREATE_CHAT_ROOM } from '../../utils/mutations';


export default  function TinderCard2(){
    const { data: data2 } = useQuery(QUERY_ME)
    console.log(data2)
    const Me = data2?.me|| [];
  console.log(Me)
    
      
    

//     const { data: data1 } = useQuery(QUERY_PROFILES);
// const { data: data2 } = useQuery(QUERY_ME);
// const people = data1?.profiles || [];
    return(
     <>
     <div>
        
        <h1>My Profile</h1>
        <div id = "pictureBorder">
        <span>Profile Picture:</span>
      <Link to = '/me' > <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      className={'flex float-right'}
     
    >
      <path d="M12.854.146a.5.5 0 00-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 000-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 016 13.5V13h-.5a.5.5 0 01-.5-.5V12h-.5a.5.5 0 01-.5-.5V11h-.5a.5.5 0 01-.5-.5V10h-.5a.499.499 0 01-.175-.032l-.179.178a.5.5 0 00-.11.168l-2 5a.5.5 0 00.65.65l5-2a.5.5 0 00.168-.11l.178-.178z" />
    </svg>
    </Link>
   
    
        <img id = 'MeImage'src= {Me.url}></img>
        </div>
        <div id = "pictureBorder">
        <Link to = '/me'>
        
        <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      className={'flex float-right'}
     
    >
      <path d="M12.854.146a.5.5 0 00-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 000-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 016 13.5V13h-.5a.5.5 0 01-.5-.5V12h-.5a.5.5 0 01-.5-.5V11h-.5a.5.5 0 01-.5-.5V10h-.5a.499.499 0 01-.175-.032l-.179.178a.5.5 0 00-.11.168l-2 5a.5.5 0 00.65.65l5-2a.5.5 0 00.168-.11l.178-.178z" />
    </svg>
    </Link>
  
 
    <span>Name:</span>
        <h2>{Me.name}</h2>
        </div>
        <div id ={'pictureBorder'}>
        <Link to = '/me'>
        <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      className={'flex float-right'}
     
    >
      <path d="M12.854.146a.5.5 0 00-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 000-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 016 13.5V13h-.5a.5.5 0 01-.5-.5V12h-.5a.5.5 0 01-.5-.5V11h-.5a.5.5 0 01-.5-.5V10h-.5a.499.499 0 01-.175-.032l-.179.178a.5.5 0 00-.11.168l-2 5a.5.5 0 00.65.65l5-2a.5.5 0 00.168-.11l.178-.178z" />
    </svg>
   
   
    </Link>
    
 
  
    <span>Instruments:</span>
        <h3>{Me.instrument}</h3>
        </div>
        <div id = {'pictureBorder'}>
        <Link to = '/me'>
        <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      className={'flex float-right'}
     
    >
      <path d="M12.854.146a.5.5 0 00-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 000-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.5h.5a.5.5 0 01.5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 016 13.5V13h-.5a.5.5 0 01-.5-.5V12h-.5a.5.5 0 01-.5-.5V11h-.5a.5.5 0 01-.5-.5V10h-.5a.499.499 0 01-.175-.032l-.179.178a.5.5 0 00-.11.168l-2 5a.5.5 0 00.65.65l5-2a.5.5 0 00.168-.11l.178-.178z" />
    </svg>
    </Link>
    
    
    
    
    <span>Bio:</span>
        <h2>{Me.bio}</h2>
       


      </div>
      </div>
     
      
      </>)
    
}



