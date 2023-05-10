
import React, { useCallback, useEffect, useState, } from 'react';
import { Link, Route, Router } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// import { makeStyles } from '@material-ui/core';

import { ADD_ABOUT } from '../../utils/mutations';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Auth from '../../utils/auth';
import TinderCard from 'react-tinder-card';
import App from '../../App';
import Home from '../../pages/Home';
import TinderCards from '../TinderCards';

const InstrumentForm = ({ profileId }) => {

  const [formState, setFormState] = useState({
    instrument: '',
    age: ''
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
    console.log(Auth.getProfile().data._id)
    try {
      const { data } = await addAbout({
        variables: { instrument: formState.instrument, age: +formState.age, profileId: Auth.getProfile().data._id }, //could def be wrong
      });

    } catch (err) {
      console.error(err);
    }
  };
  // const [Home, setHome] = useState(false)

  function renderCard() {
    return (
      !formState.age || !formState.instrument ? (

        alert('please fill out form')
      ) : (
        alert('it worked!')



      )
    )

  }

  const [preview, setPreview] = useState();
  // const classes = useStyles();
  const handleCreateBase64 =
    useCallback(async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setPreview(base64)
      e.target.value = ''

    }, [])


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (!file) {
        alert('Please select an image')
      } else {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result)
        }
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    }
    )
  }

  console.log(formState)
  let Navigate = useNavigate()

  return (

    <div >

      <h4>Create User Profile </h4>
      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit} >
          <span id='span' className={' flex '}>Upload a picture of yourself: </span>
          {/* <input className={'m-2'} type="file" id="myFile" name="filename" onChange={handleCreateBase64} /> */}
          <input onChange={handleCreateBase64}></input>
          <img id="previewImage" alt='No Photo' src={preview} />
          <span className={'flex space-x-4 mt-5 font-mono'}> what instrument do you play?</span>
          <select name="instrument" id="instrumentId" value={formState.instrument}
            onChange={handleChange} required>
            <option value='option' >---Choose instrument---</option>
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


            required />


          <button
            className="btn btn-block btn-info"
            style={{ cursor: 'pointer' }}
            type="submit"
            // onClick={renderCard}
            onClick={() => !formState.instrument && !formState.age ? (
              alert('please fill out instrument and age')) :
              (
                Navigate('/')
                )}>
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