import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      instrument
      url
      age
      bio
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      instrument
      url
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      instrument
      url
    }
  }
`;

export const QUERY_PROFILE_CHATROOMS = gql`
  query profileChatRooms($profileId: ID!) {
    chatRoomsByProfileId(profileId: $profileId) {
      _id
      initiatorId
      receiverId
      lastMessage
    }
  }
`;
