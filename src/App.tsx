import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import AirportSelect, { Airport } from './components/AirportSelect';
import calculateDistanceInNmFromCoordinates from './utils/calculateDistanceInNmFromCoordinates';
import MapRoute from './components/MapRoute';

function App(): JSX.Element {
  const selectAirport = {
    label: 'Select airport',
    name: '',
    city: '',
    state: '',
    country_code: 'US',
    lat: 0,
    lng: 0,
    iata_code: '',
    icao_code: '',
  };

  const [firstAirport, setFirstAirport] = useState<Airport>({
    ...selectAirport,
  });
  const [secondAirport, setSecondAirport] = useState<Airport>({
    ...selectAirport,
  });
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (firstAirport.name !== '' && secondAirport.name !== '')
      setDistance(
        calculateDistanceInNmFromCoordinates(
          firstAirport.lat,
          firstAirport.lng,
          secondAirport.lat,
          secondAirport.lng
        )
      );
  }, [firstAirport, secondAirport]);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100vh',
          backgroundColor: '#8AB4F8',
        }}
      >
        <Container
          style={{
            margin: 0,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Paper elevation={14} sx={{ padding: 4, borderRadius: 4 }}>
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
                  Calculate Distance
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
                    defaultAirport={selectAirport}
                  ></AirportSelect>
                </Grid>
                <Grid item xs={8} sm={5} md={5} lg={5} xl={4}>
                  <AirportSelect
                    airport={secondAirport}
                    setAirport={setSecondAirport}
                    id="second-airport-input"
                    label="2nd Airport"
                    defaultAirport={selectAirport}
                  ></AirportSelect>
                </Grid>
              </Grid>

              <Grid item>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: 'normal' }}
                >
                  Distance: {distance.toFixed(2)} NM
                </Typography>
              </Grid>
            </Grid>
            <MapRoute
              originProp={firstAirport.name}
              destinationProp={secondAirport.name}
            ></MapRoute>
          </Paper>
        </Container>
      </div>
    </>
  );
}

export default App;
