
import React, { useCallback, useEffect, useState, } from 'react';
import { Link, Route, Router } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// import { makeStyles } from '@material-ui/core';

import { ADD_ABOUT } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';

import Auth from '../../utils/auth';
import TinderCard from 'react-tinder-card';
import App from '../../App';
import Home from '../../pages/Home';
import TinderCards from '../TinderCards';

const InstrumentForm = ({ profileId }) => {

  const [formState, setFormState] = useState({
    instrument: '',
    age: '',
    bio: '',
    url: ''
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
    // const urlLink = URL.createObjectURL(link)
    // // const url = formState.url
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
        variables: { bio: formState.bio, url: formState.url, instrument: formState.instrument, age: +formState.age, profileId: Auth.getProfile().data._id }, //could def be wrong
      });
    
    } catch (err) {
      console.error(err);
    }
  };
  // const [Home, setHome] = useState(false)

  // function renderCard() {
  //   return (
  //     !formState.age || !formState.instrument ? (

  //       alert('please fill out form')
  //     ) : (
  //       alert('it worked!')



  //     )
  //   )

  // }

  // const [preview, setPreview] = useState();
  // // const classes = useStyles();
  // const handleCreateBase64 =
  //   useCallback(async (e) => {
  //     const file = e.target.files[0];
  //     const base64 = await convertToBase64(file);
  //     setPreview(base64)
  //     e.target.value = ''

  //   }, [])


  // const convertToBase64 = (url) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     if (!url) {
  //       alert('Please select an url')
  //     } else {
  //       fileReader.readAsDataURL(url);
  //       fileReader.onload = () => {
  //         resolve(fileReader.result)
  //       }
  //     }
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     }
  //   }
  //   )
  // }

  console.log(formState)
  // let Navigate = useNavigate()

  return (

    <div >

      <h4>Create User Profile </h4>
      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit} >
          <span id='span' htmlFor = 'url' className={' flex '}>Upload a picture of yourself: </span>
          {/* <input className={'m-2'} type="file" id="myFile" name="filename" onChange={handleCreateBase64} /> */}
          <input id = 'urlLink'type='url' name ='url' value={formState.url} onChange={handleChange
          } ></input>
         {formState.url && <img src={formState.url} id ='previewurl'alt ='Where you should go'/>}
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

            <label>Tell everyone about you!</label>
            <input
            className="form-input"
            placeholder="Ex. I Love Music Match!"
            name="bio"
            type="text"
            value={formState.bio}
            onChange={handleChange}


             />


          <button
            className="btn btn-block btn-info"
            style={{ cursor: 'pointer' }}
            type="submit"
            onClick={handleFormSubmit}
            // onClick={() => !formState.instrument && !formState.age && !formState.bio ? (
            //   alert('please fill out instrument and age')) :
            //   (
            //     Navigate('/')
            //     )}
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