import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Airport {
  name: string;
  city: string;
  state: string;
  country_code: string;
  iata_code: string;
  icao_code: string;
  lat: number;
  lng: number;
  label: string;
}

interface AirportSelectProps {
  airport: Airport;
  setAirport: Function;
  id: string;
  label: string;
  defaultAirport: Airport;
}

const AirportSelect = ({
  airport,
  setAirport,
  id,
  label,
  defaultAirport,
}: AirportSelectProps): JSX.Element => {
  const [airports, setAirports] = useState([defaultAirport]);

  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/Ricofrede/final-airports/master/finalAirports.json'
      )
      .then(response => {
        let airportsArray = response.data.map((el: Airport) => {
          return {
            ...el,
            label: `${el.name} (${el.iata_code}), ${el.city} - ${el.state}`,
          };
        });
        airportsArray = [...airports, ...airportsArray];
        setAirports([...airportsArray]);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <Autocomplete
        value={airport}
        size="small"
        onChange={(event: any, newValue: Airport | null) => {
          setAirport(newValue ?? defaultAirport);
        }}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        disablePortal
        id={id}
        options={airports}
        renderInput={params => <TextField {...params} label={label} />}
      ></Autocomplete>
    </>
  );
};

export default AirportSelect;
export type { Airport };
