
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
    age: '',
<<<<<<< HEAD
    image: ''
=======
    url: '',
    bio: ''
>>>>>>> 993e2042d8418609455baaad11503f96c2bc5451
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
<<<<<<< HEAD
      const { data }= await addAbout({
        variables: { image: formState.image, instrument: formState.instrument, age: +formState.age, profileId: Auth.getProfile().data._id }, //could def be wrong
      });
    
=======
      const { data } = await addAbout({
        variables: { instrument: formState.instrument, age: +formState.age, profileId: Auth.getProfile().data._id }, //could def be wrong
      });

>>>>>>> 993e2042d8418609455baaad11503f96c2bc5451
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


  const convertToBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (!url) {
        alert('Please select an image')
      } else {
        fileReader.readAsDataURL(url);
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
<<<<<<< HEAD

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
=======
  let Navigate = useNavigate()

>>>>>>> 993e2042d8418609455baaad11503f96c2bc5451
  return (

    <div >

      <h4>Create User Profile </h4>
      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit} >
<<<<<<< HEAD
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
=======
          <span id='span' htmlFor = 'url' className={' flex '}>Upload a picture of yourself: </span>
          {/* <input className={'m-2'} type="file" id="myFile" name="filename" onChange={handleCreateBase64} /> */}
          <input id = 'imageLink'type='url' name ='url' onChange={handleChange
          } ></input>
         {formState.url && <img src = {formState.url} id ='previewImage'alt ='no Photo'/>}
          <span className={'flex space-x-4 mt-5 font-mono'}> what instrument do you play?</span>
          <select name="instrument" id="instrumentId" value={formState.instrument}
            onChange={handleChange} required>
            <option value='option' >---Choose instrument---</option>
>>>>>>> 993e2042d8418609455baaad11503f96c2bc5451
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
            <input id= 'bio' placeholder='ex. I love Music Match!'></input>


          <button
            className="btn btn-block btn-info"
            style={{ cursor: 'pointer' }}
            type="submit"
            // onClick={renderCard}
            onClick={() => !formState.instrument && !formState.age && !formState.bio ? (
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