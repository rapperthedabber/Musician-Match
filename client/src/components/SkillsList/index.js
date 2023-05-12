import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_INSTRUMENT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const InstrumentList = ({ instruments, isLoggedInUser = false }) => {
  const [removeInstrument, { error }] = useMutation(REMOVE_INSTRUMENT, {
    update(cache, { data: { removeInstrument } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeInstrument },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveInstrument = async (instrument) => {
    try {
      const { data } = await removeInstrument({
        variables: { instrument },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!instruments.length) {
    return <h3>No instruments Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {instruments &&
          instruments.map((instrument) => (
            <div key={instrument} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{instrument}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveInstrument(instrument)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default InstrumentList;
