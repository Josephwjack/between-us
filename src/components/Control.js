import React, { useEffect, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
// import Geocode, { fromAddress } from 'react-geocode';
import Form from './Form';
import Result from './Result';
import db  from '../firebase.js';
import { collection, addDoc, doc, onSnapshot} from 'firebase/firestore';




function GetLocation() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(true);
  const [showResult, setResult] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  
  async function GetData(){
    
    const url1 = (`https://maps.googleapis.com/maps/api/geocode/json?address=seattle&key=${process.env.REACT_APP_API_KEY}`)
    const url2 = (`https://maps.googleapis.com/maps/api/geocode/json?address=new+york&key=${process.env.REACT_APP_API_KEY}`)
    
    const responses = await Promise.all([fetch(url1), fetch(url2)])
    
    const data1 = await responses[0].json();
    const data2 = await responses[1].json();

    const firstSet = data1.results.map( ele => {
      return {lat: ele.geometry.location.lat, lng: ele.geometry.location.lng}
    });
    const secondSet = data2.results.map( ele => {
      return {lat: ele.geometry.location.lat, lng: ele.geometry.location.lng}
    });
    
    const lat3 = (firstSet[0].lat + secondSet[0].lat) / 2;
    const lng3 = (firstSet[0].lng + secondSet[0].lng) / 2;
    console.log(lat3);
    let resultCoordinates = {lat3, lng3};
    console.log(resultCoordinates);
    Object.values(resultCoordinates);

    setResult(resultCoordinates);
    
    
    
    
  }
  const makeApiCall = async (call) => {
    GetData();
    let response;
    try {
      response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?,
      location=${call.lat3}%${call.lng3}
      &radius=1500
      &key${process.env.REACT_APP_API_KEY}
      `)
    } catch(error){
      console.log(error, "fetch error");
    } let data;
    try {
      data = await response.json();
    } catch(error){
      console.log(error, "response error");
    }
    let venueList = data.results.map(e => {
      return {name: e.name, rating: e.rating, vicinity: e.vicinity, location: e.geometry.location}
    });
    setResult(venueList);
    setIsLoaded(true);
  
  }
  


  
  
  
  // const handleFindingResultCoordinates = (latLng1, latLng2) => {
  //   let lat3 = (latLng1.lat + latLng2.lat) / 2
  //   let lng3 = (latLng1.lng + latLng2.lng) / 2
  //   const finalCoords = (lat3, lng3)
  //   console.log(finalCoords);
  //   setIsLoaded(true);
    
    
  // }

  
  
  
  
  let currentlyVisibleState = null;
  // if (error) {
  //   return <h1>Error: </h1>;

  // } else if (!isLoaded) {
  //   return <h1>...LOADING...</h1>;
  // } if (formVisibleOnPage) {
  //   currentlyVisibleState = <Form onFormSubmission={formSubmissionHandler}/>
  // } else if (!!showResult) {
  //   currentlyVisibleState = <Result resultLocation={showResult}/>
  // }
  
  
    return (
      <React.Fragment>
        
        <h1>Return</h1>
        {currentlyVisibleState}
      </React.Fragment>
    )
  
 }


  

  

 
    
  

export default GetLocation;