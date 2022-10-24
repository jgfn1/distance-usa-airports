import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import AirportSelect, { Airport } from './components/AirportSelect';
import { Container } from '@mui/system';
import calculateDistanceInNmFromCoordinates from './utils/calculateDistanceInNmFromCoordinates';

function App(): JSX.Element {
  const chooseAirport = {
    label: 'Choose airport',
    name: '',
    city: '',
    latitude: 0,
    longitude: 0,
  };

  const [firstAirport, setFirstAirport] = useState<Airport>(chooseAirport);
  const [secondAirport, setSecondAirport] = useState<Airport>(chooseAirport);
  const [distance, setDistance] = useState(0);

  const onHandleCalculate = (): void => {
    setDistance(
      calculateDistanceInNmFromCoordinates(
        firstAirport.latitude,
        firstAirport.longitude,
        secondAirport.latitude,
        secondAirport.longitude
      )
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
