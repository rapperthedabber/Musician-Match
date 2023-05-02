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

export const ADD_INSTRUMENT = gql`
  mutation addInstrument($profileId: ID!, $instrument: String!) {
    addinstrument(profileId: $profileId, instrument: $instrument) {
      _id
      name
      instruments
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
  mutation removeInstrument($instrument: String!) {
    removeInstrument(instrument: $instrument) {
      _id
      name
      instruments
    }
  }
`;
