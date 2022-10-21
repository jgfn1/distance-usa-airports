import React, { useState } from 'react';
import { Button } from '@mui/material';
import AirportSelect, { Airport } from './components/AirportSelect';

function App(): JSX.Element {
  const [firstAirport, setFirstAirport] = useState<Airport>({
    label: 'Choose airport',
    name: '',
    city: '',
    latitude: 0,
    longitude: 0,
  });
  const [secondAirport, setSecondAirport] = useState<Airport>({
    label: 'Choose airport',
    name: '',
    city: '',
    latitude: 0,
    longitude: 0,
  });
  const [distance, setDistance] = useState(0);

  const calculateDistanceInKmFromCoordinates = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    const c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    const r = 6371;

    // calculate the result
    return c * r;
  };

  const onHandleCalculate = (): void => {
    console.log(
      'SELECTED AIRPORTS:\n',
      firstAirport.label,
      '\n',
      secondAirport.label
    );
    setDistance(
      calculateDistanceInKmFromCoordinates(
        firstAirport.latitude,
        firstAirport.longitude,
        secondAirport.latitude,
        secondAirport.longitude
      ) * 0.539957
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
      <label>Straight Line Distance:</label>
      <span> {distance.toFixed(2)} Nautical Miles</span>
    </>
  );
}

export default App;
