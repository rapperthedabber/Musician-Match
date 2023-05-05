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
  mutation addAbout($profileId: ID!, $instrument: String!, $age: Int!) {
    addAbout(profileId: $profileId, instrument: $instrument, age: $age) {
      _id
      name
      Abouts
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

export const REMOVE_INSTRUMENT = gql`
  mutation removeAbout($About: String!) {
    removeAbout(About: $About) {
      _id
      name
      Abouts
    }
  }
`;
