import React from 'react';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import InstrumentList from '../components/instrumentList';
import InstrumentForm from '../components/InstrumentForm';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4 className={'font-sans'}>
        Hello
      </h4>
    );
  }

  return (
    <div>
      <h2 className="card-header">
        {profileId ? `${profile.name}'s` : 'Your'} Musician Profile
      </h2>

      {profile.instruments?.length > 0 && (
        <InstrumentList
          instruments={profile.instruments}
          isLoggedInUser={!profileId && true}
        />
      )}

      <div className="my-4 p-4" >
        <InstrumentForm profileId={profile._id} />
      </div>
    </div>
  );
};

export default Profile;
