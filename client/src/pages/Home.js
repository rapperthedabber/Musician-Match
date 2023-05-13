import React from 'react';
import { useQuery } from '@apollo/client';

import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  return (
    <main>
      <div className="Mybackground">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" id="music"><path d="M88.3 11.5c-.5-.4-1.1-.5-1.7-.4l-48 10c-.9.2-1.6 1-1.6 2v40.8c-2.7-3-6.6-4.8-11-4.8-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15V38.6l44-9.2v24.4c-2.7-3-6.7-4.8-11-4.8-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15V13c0-.6-.3-1.2-.7-1.5zM26 85c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11zm48-10c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11zm11-49.6l-44 9.2v-9.9l44-9.2v9.9z"></path><path fill="#00F" d="M664-650v1684h-1784V-650H664m8-8h-1800v1700H672V-658z"></path></svg>
            </div>
          ) : (
            <ProfileList
              profiles={profiles}
              title="Here's the current roster of friends..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
