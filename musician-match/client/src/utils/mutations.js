import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_ABOUT = gql`
  mutation addAbout($profileId: ID!, $instrument: String!, $age: Int!, $url: String!, $bio: String!) {
    addAbout(profileId: $profileId, instrument: $instrument, age: $age, url: $url, bio: $bio) {
        _id
        instrument
        age
        url
        bio

    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_LIKE = gql`
  mutation likeProfile($profileId: ID!, $likedProfileId: ID!) {
    likeProfile(profileId: $profileId, likedProfileId: $likedProfileId) {
     _id
    }
  }
`;

export const REMOVE_INSTRUMENT = gql`
  mutation removeAbout($About: String!) {
    removeAbout(About: $About) {
      _id
      name
      Abouts
    }
  }
`;

export const SEND_NEW_MESSAGE = gql`
  mutation sendNewMessage($chatRoomId: ID!, $senderId: ID!, $message: String!) {
    createChatMessage(chatRoomId: $chatRoomId, senderId: $senderId, message: $message) {
      _id
      chatRoomId
      senderId
      message
    }
  }
`;

export const UPDATE_CHAT_ROOM = gql`
  mutation updateChatRoom($chatRoomId: ID!, $lastMessage: String!) {
    updateChatRoom(chatRoomId: $chatRoomId, lastMessage: $lastMessage) {
      _id
      initiatorId
      receiverId
      lastMessage
    }
  }
`;
