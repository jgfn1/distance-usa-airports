import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [firstAirport, setFirstAirport] = useState('');
  const [secondAirport, setSecondAirport] = useState('');
  const [distance, setDistance] = useState(0);
  const [airports, setAirports] = useState<Airport[]>();

  type Airport = {
    name: string;
    city: string;
    country: string;
    code: string;
    latitude: number;
    longitude: number;
    nameWithCode: string;
  };

  function datToArray(text: string) {
    const lines = text.split(/\n/); // split on \n
    return lines
      .map(line => {
        const {
          1: name,
          2: city,
          3: country,
          4: code,
          6: latitude,
          7: longitude,
        } = line.replaceAll('"', '').split(',');
        return {
          name,
          city,
          country,
          code,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          nameWithCode: `${name} - ${code}`,
        } as Airport;
      })
      .filter(line => line['country'] === 'United States');
  }

  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat'
      )
      .then(response => {
        setAirports(datToArray(response.data));
      });
  }, []);

  const onHandleCalculate = () => {
    setDistance(distance + 1);
    console.log('airports: ', airports);
  };

  return (
    <>
      <h1>Insert Distance Between USA Airports</h1>
      <label>First Airport: </label>
      <input
        type="text"
        value={firstAirport}
        onChange={e => setFirstAirport(e.target.value)}
      />
      <br />
      <label>Second Airport: </label>
      <input
        type="text"
        value={secondAirport}
        onChange={e => setSecondAirport(e.target.value)}
      />
      <br />
      <button onClick={onHandleCalculate}>Calculate</button>
      <br />
      <label>Distance:</label>
      <span> {distance}</span>
    </>
  );
}

export default App;
