import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


import { ADD_ABOUT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const InstrumentForm = ({ profileId }) => {
  const [formState, setFormState] = useState({
    instrument: '',
    age: '',
    image: ''
  });

  const [addAbout, { data, error }] = useMutation(ADD_ABOUT);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // const link = event.target[0].files[0]
    // const imageLink = URL.createObjectURL(link)
    // // const image = formState.image
    // const fileReader = new FileReader()
    // fileReader.onload = function() {
    //   // console.log(fileReader.result)
    //   const result = toString(fileReader.result)
    //   return result
    // }
    // const finalImg = fileReader.onload
    // fileReader.readAsDataURL(link)
    // console.log(finalImg)
    try {
      const { data }= await addAbout({
        variables: { image: formState.image, instrument: formState.instrument, age: +formState.age, profileId: Auth.getProfile().data._id }, //could def be wrong
      });
    
    } catch (err) {
      console.error(err);
    }
  };

  console.log(formState)

  function whatever(event) {
    event.preventDefault()
    const link = event.target[0].files[0]
    const imageLink = URL.createObjectURL(link)
    console.dir(imageLink)
    // const image = formState.image
    const fileReader = new FileReader()
    fileReader.onload = function() {
      console.log(fileReader.result)
    } 
    fileReader.readAsDataURL(link)
  }
  return (

    <div >

      <h4>Endorse some more instruments below.</h4>

      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit} >
          <span id='span'>Link to a picture of yourself</span>
          <input 
            className="form-input" 
            type="url" 
            id="uploadImage" 
            name="image" 
            value={formState.image}
            onChange={handleChange}
            // onChange={(event) => {
              // setFormState({ image: URL.createObjectURL(event.target.files[0])})
         />
            
          <input type=""></input>
          <span className={'flex space-x-4 '}> what instrument do you play?</span>
          <select name="instrument" id="instrumentId" value={formState.instrument}
            onChange={handleChange} >
            <option value="null">Choose instrument</option>
            <option value="Guitar">Guitar </option>
            <option value="Bass">Bass</option>
            <option value="Drummer">Drummer</option>
            <option value='Vocalist'>Vocalist</option>
          </select>
          <input
            className="form-input"
            placeholder="age"
            name="age"
            type="number"
            value={formState.age}
            onChange={handleChange}
          />


          <button
            className="btn btn-block btn-info"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>

          {/* <div className="col-12 col-lg-9">
            <input
              placeholder="Endorse some instruments..."
              value={instrument}
              className="form-input w-100"
              onChange={(event) => setInstrument(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Endorse instrument
            </button>
          </div> */}
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>

      ) : (
        <p>
          You need to be logged in to endorse instruments. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>

  );
};

export default InstrumentForm;
