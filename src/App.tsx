import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Autocomplete, Button, TextField } from '@mui/material';
import AirportSelect, { Airport } from './components/AirportSelect';

function App() {
  const [firstAirport, setFirstAirport] = useState({
    label: 'Choose airport',
  } as Airport);
  const [secondAirport, setSecondAirport] = useState({
    label: 'Choose airport',
  } as Airport);
  const [distance, setDistance] = useState(0);

  const onHandleCalculate = () => {
    console.log(
      'SELECTED AIRPORTS:\n',
      firstAirport.label,
      '\n',
      secondAirport.label
    );
  };

  return (
    <>
      <h1>Insert USA Airports to Calculate Distance</h1>
      <AirportSelect
        airport={firstAirport}
        setAirport={setFirstAirport}
        id="first-airport-input"
        label="1st Airport"
      ></AirportSelect>
      <br />
      <AirportSelect
        airport={secondAirport}
        setAirport={setSecondAirport}
        id="second-airport-input"
        label="2nd Airport"
      ></AirportSelect>
      <br />
      <Button variant="contained" onClick={onHandleCalculate}>
        Calculate
      </Button>
      <br />
      <br />
      <label>Distance:</label>
      <span> {distance}</span>
    </>
  );
}

export default App;
