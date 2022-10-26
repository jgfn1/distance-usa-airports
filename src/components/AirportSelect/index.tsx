import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Airport {
  name: string;
  city: string;
  code?: string;
  icaoCode?: string;
  latitude: number;
  longitude: number;
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

  function datToArray(text: string): Airport[] {
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
          label:
            code !== '\\N'
              ? `${city} - ${name} (${code})`
              : `${city} - ${name} (${icaoCode})`,
        };
      });
  }

  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat'
      )
      .then(response => {
        const airportsArray = datToArray(response.data);
        setAirports([
          ...airports,
          ...airportsArray.slice(Math.floor(airportsArray.length / 2)),
          ...airportsArray.slice(0, Math.floor(airportsArray.length / 2)),
        ]);
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
