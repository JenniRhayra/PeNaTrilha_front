'use client'

import {
    useLoadScript,
    GoogleMap,
    MarkerF,
    CircleF,
} from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useMemo, useState, useEffect } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import styles from './google_maps.module.css';
import { FaLocationDot } from 'react-icons/fa6';

interface GoogleMapsProps {
    showMap?: boolean;
}

const GoogleMaps: NextPage<GoogleMapsProps> = ({ showMap = false}) => {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [loading, setLoading] = useState(true);

    const libraries = useMemo(() => ['places'], []);
    const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: false,
        }),
        []
    );

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries as any,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLng(position.coords.longitude);
                    setLoading(false);
                },
                (error) => {
                    console.error(error);
                    setLoading(false);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    }, []);

    if (!isLoaded || loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.homeWrapper}>
            <div className={styles.sidebar}>
                <PlacesAutocomplete
                    onAddressSelect={(address) => {
                        getGeocode({ address: address }).then((results) => {
                            const { lat, lng } = getLatLng(results[0]);
                            setLat(lat);
                            setLng(lng);
                        });
                    }}
                />
            </div>
            {showMap && (
                <GoogleMap
                    options={mapOptions}
                    zoom={14}
                    center={mapCenter}
                    mapTypeId={google.maps.MapTypeId.ROADMAP}
                    mapContainerStyle={{ width: '100%', height: '150px' }}
                    onLoad={(map) => console.log('Map Loaded')}
                >
                    <MarkerF
                        position={mapCenter}
                        onLoad={() => console.log('Marker Loaded')}
                    />

                    {[400, 1000].map((radius, idx) => (
                        <CircleF
                            key={idx}
                            center={mapCenter}
                            radius={radius}
                            onLoad={() => console.log('Circle Load...')}
                            options={{
                                fillColor: radius > 400 ? 'red' : 'green',
                                strokeColor: radius > 400 ? 'red' : 'green',
                                strokeOpacity: 0.8,
                            }}
                        />
                    ))}
                </GoogleMap>
            )}
        </div>
    );
};

const PlacesAutocomplete = ({
    onAddressSelect,
}: {
    onAddressSelect?: (address: string) => void;
}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: { componentRestrictions: { country: 'br' } },
        debounce: 300,
        cache: 86400,
    });

    const renderSuggestions = () => {
        return data.map((suggestion: any) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
                description,
            } = suggestion;

            return (
                <li
                    key={place_id}
                    onClick={() => {
                        setValue(description, false);
                        clearSuggestions();
                        onAddressSelect && onAddressSelect(description);
                    }}
                >
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });
    };

    return (
        <div className={styles.autocompleteWrapper}>
            <div className={styles.inputContainer}>
                <FaLocationDot className={styles.locationIcon} />
                <input
                    value={value}
                    className={styles.autocompleteInput}
                    disabled={!ready}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Sorocaba/SP"
                />
            </div>
            {status === 'OK' && (
                <ul className={styles.suggestionWrapper}>{renderSuggestions()}</ul>
            )}
        </div>
    );
};

export default GoogleMaps;
