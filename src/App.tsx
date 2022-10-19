import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [firstAirport, setFirstAirport] = useState("");
  const [secondAirport, setSecondAirport] = useState("");
  const [distance, setDistance] = useState(0);
  const [airports, setAirports] = useState([]);

  function fileToArray(text: string) {
    const lines = text.split(/\n/); // split on \n
    const header = lines[0].trim().split(/\s+/); // split on whitespace after trimming
    return lines.map(line => {
      const { 1: name, 2: city, 3: country, 4: code, 6: latitude, 7: longitude} = line.replaceAll("\"", "").split(',') 
      return { name, city, country, code, latitude, longitude, nameWithCode: `${name} - ${code}` };
    }).filter(line => line['country'] == 'United States');
  }

  useEffect(() => {
    axios.get("https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat").then(response => {
      const data = fileToArray(response.data);
      console.log("airports: ", data);
    })
  }, [])

  const onHandleCalculate = () => {
    setDistance(distance + 1)
  }

  return (
    <>
      <h1>
        Insert Distance Between USA Airports
      </h1>
      <label>First Airport: </label>
      <input type="text" value={firstAirport} onChange={(e) => setFirstAirport(e.target.value)}/>
      <br />
      <label>Second Airport: </label>
      <input type="text" value={secondAirport} onChange={(e) => setSecondAirport(e.target.value)}/>
      <br />
      <button onClick={onHandleCalculate}>Calculate</button>
      <br />
      <label>Distance:</label>
      <span> {distance}</span>

    </>
  );
}

export default App;
