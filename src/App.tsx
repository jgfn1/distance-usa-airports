import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import AirportSelect, { Airport } from './components/AirportSelect';
import calculateDistanceInNmFromCoordinates from './utils/calculateDistanceInNmFromCoordinates';
import MapRoute from './components/MapRoute';

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

  useEffect(() => {
    setDistance(
      calculateDistanceInNmFromCoordinates(
        firstAirport.latitude,
        firstAirport.longitude,
        secondAirport.latitude,
        secondAirport.longitude
      )
    );
  }, [firstAirport, secondAirport]);

  return (
    <>
      <Container
        style={{
          margin: 0,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Paper elevation={10} sx={{ padding: 4 }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ pb: 2 }}
          >
            <Grid item>
              <Typography variant="h5" align="center">
                Select Airports
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
              <Grid item xs={8} sm={5} md={5} lg={5} xl={4}>
                <AirportSelect
                  airport={firstAirport}
                  setAirport={setFirstAirport}
                  id="first-airport-input"
                  label="1st Airport"
                ></AirportSelect>
              </Grid>
              <Grid item xs={8} sm={5} md={5} lg={5} xl={4}>
                <AirportSelect
                  airport={secondAirport}
                  setAirport={setSecondAirport}
                  id="second-airport-input"
                  label="2nd Airport"
                ></AirportSelect>
              </Grid>
            </Grid>

            <Grid item>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: 'normal' }}
              >
                Straight Line Distance: {distance.toFixed(2)} Nautical Miles
              </Typography>
            </Grid>
          </Grid>
          <MapRoute
            originProp={firstAirport.name}
            destinationProp={secondAirport.name}
          ></MapRoute>
        </Paper>
      </Container>
    </>
  );
}

export default App;
