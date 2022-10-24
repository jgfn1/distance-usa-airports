import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import AirportSelect, { Airport } from './components/AirportSelect';
import { Container } from '@mui/system';

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
      <Container
        style={{
          margin: 0,
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
            <Typography variant="h4" align="center">
              Insert Airports to Calculate Distance
            </Typography>
          </Grid>

          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="space-around"
            spacing={2}
          >
            <Grid item xs={8} md={5} lg={5} xl={4}>
              <AirportSelect
                airport={firstAirport}
                setAirport={setFirstAirport}
                id="first-airport-input"
                label="1st Airport"
              ></AirportSelect>
            </Grid>
            <Grid item xs={8} md={5} lg={5} xl={4}>
              <AirportSelect
                airport={secondAirport}
                setAirport={setSecondAirport}
                id="second-airport-input"
                label="2nd Airport"
              ></AirportSelect>
            </Grid>
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={onHandleCalculate}>
              Calculate
            </Button>
          </Grid>

          <Grid item>
            <label>Straight Line Distance:</label>
            <span> {distance.toFixed(2)} Nautical Miles</span>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
