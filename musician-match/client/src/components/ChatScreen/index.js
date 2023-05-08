import React from 'react'
import { useState } from 'react'
import { Avatar } from '@material-ui/core';
export default function ChatScreen(){
    const [message, setMessage] = useState([
        {
            name: 'Mick Jagger',
            image:"",
            message: "What's up"
        },
        {
            name: "Mick Jagger",
            image: '',
            message: 'Yo, howdy!'

        }, 
        {message: 'How is it going',
    },
    ]);
    return(
        <div>
            <h1>Chat Screen</h1>
            {message.map((chat) =>
                chat.name?(
                <div className = "chatScreenMessage"> 
                <Avatar src = {chat.image}></Avatar>
                    <p id ='chatMessage'>{chat.message}</p>

                </div>) :(
                    <div className='myChatScreenMessage'>
                    <p id = 'myMessage'>{chat.message}</p>
                    </div>
                

            )
            )}
            <input
            id ="sendMessage"
            placeholder="message"
            // name="message"
            // type="string"
            // value=''
            // onChange=''
          />
            <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  send
                </button>
        </div>
    )
}