import React, { useEffect, useMemo, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

interface mapProps {
  destinationProp: string;
  originProp: string;
}

const MapRoute = ({ destinationProp, originProp }: mapProps): JSX.Element => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBcEkM5j2QL31AZ5iI1xt515jctY4JEsZs',
  });

  useEffect(() => {
    console.log('RENDERED!');
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map originProp={originProp} destinationProp={destinationProp}></Map>
    </>
  );
};

function Map({ destinationProp, originProp }: mapProps): JSX.Element {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [directionsResponse, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  function directionsCallback(
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ): void {
    console.log(result, status);
    if (status === google.maps.DirectionsStatus.OK) setDirections(result);
  }

  return (
    <>
      <GoogleMap
        id="map-google"
        zoom={10}
        center={center}
        mapContainerStyle={{ width: '100%', height: '100vh' }}
      >
        <DirectionsService
          options={{
            destination: destinationProp,
            origin: originProp,
            travelMode: google.maps.TravelMode.DRIVING,
          }}
          callback={directionsCallback}
        />
        {directionsResponse !== null && (
          <DirectionsRenderer options={{ directions: directionsResponse }} />
        )}
      </GoogleMap>
    </>
  );
}

export default MapRoute;
