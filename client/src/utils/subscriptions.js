import { gql } from '@apollo/client';

export const NEW_MESSAGES = gql`
    subscription NewMessage($chatRoomId: ID!) {
    newMessage(chatRoomId: $chatRoomId) {
      _id
      chatRoomId
      senderId
      message
    }
  }
`;