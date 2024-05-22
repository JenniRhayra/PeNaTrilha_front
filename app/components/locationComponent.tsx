import { useState, useEffect } from 'react';
import MapComponent from './mapComponent';
import { FaLocationDot } from "react-icons/fa6";


interface LocationComponentProps {
  showMap?: boolean;
}

const LocationComponent: React.FC<LocationComponentProps> = ({ showMap = true }) => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      getAddress(location.coords.latitude, location.coords.longitude);
    }
  }, [location]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const getAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await response.json();
      setAddress(`${data.address.city}/ ${data.address.state}`);
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };

  return (
    <div style={{textAlign:'center'}}>
      {!location ? (
        <button onClick={getLocation}>Clique aqui para definir sua localização atual</button>
      ) : (
        <div>
          {address && (
            <div style={{ display: 'inline-flex', alignItems: 'center', color:'#C1C1C1' }}>
              <FaLocationDot style={{ marginRight: '5px' }} />
              <div>{address}</div>
            </div>
          )}
          {showMap && location && (
            <MapComponent latitude={location.coords.latitude} longitude={location.coords.longitude} />
          )}
        </div>
      )}
    </div>
  );
};

export default LocationComponent;
