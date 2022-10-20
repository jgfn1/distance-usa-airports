import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';

function App() {
  type Airport = {
    name: string;
    city: string;
    code?: string;
    icaoCode?: string;
    latitude: number;
    longitude: number;
    label: string;
  };

  const [firstAirport, setFirstAirport] = useState({} as Airport);
  const [secondAirport, setSecondAirport] = useState({} as Airport);
  const [distance, setDistance] = useState(0);
  const [airports, setAirports] = useState([] as Airport[]);

  function datToArray(text: string) {
    const lines = text.split(/\n/); // split on \n
    return lines
      .filter(line => line.includes('United States'))
      .map(line => {
        const {
          1: name,
          2: city,
          4: code,
          5: icaoCode,
          6: latitude,
          7: longitude,
        } = line.replaceAll('"', '').split(',');
        return {
          name,
          city,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          label: code !== '\\N' ? `${name} - ${code}` : `${name} - ${icaoCode}`,
        } as Airport;
      });
  }

  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat'
      )
      .then(response => {
        const airportsArray = datToArray(response.data);
        setAirports(airportsArray);
        setFirstAirport(airportsArray[0]);
        setSecondAirport(airportsArray[0]);
      });
  }, []);

  const onHandleCalculate = () => {
    setDistance(distance + 1);
    console.log('airports: ', airports);
  };

  return (
    <>
      <h1>Insert USA Airports to Calculate Distance</h1>
      <Autocomplete
        value={firstAirport}
        onChange={(event: any, newValue: Airport | null) => {
          setFirstAirport(newValue || airports[0]);
        }}
        disablePortal
        id="first-airport-input"
        options={airports}
        sx={{ width: 400 }}
        renderInput={params => <TextField {...params} label="1st Airport" />}
      ></Autocomplete>
      <br />
      <Autocomplete
        value={secondAirport}
        onChange={(event: any, newValue: Airport | null) => {
          setSecondAirport(newValue || airports[0]);
        }}
        disablePortal
        id="second-airport-input"
        options={airports}
        sx={{ width: 400 }}
        renderInput={params => <TextField {...params} label="2nd Airport" />}
      ></Autocomplete>
      <br />
      <br />
      <button onClick={onHandleCalculate}>Calculate</button>
      <br />
      <br />
      <label>Distance:</label>
      <span> {distance}</span>
    </>
  );
}

export default App;
