import React, { useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useLoadScript } from '../hooks/useLoadScript';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const LIBRARIES = 'places';

const LocationAutocomplete = ({ register, setValue, setParkProps }: any) => {
    const inputRef = useRef<any>(null);
    const isLoaded = useLoadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=${LIBRARIES}`);

    useEffect(() => {
        if (!isLoaded || !window.google) return;

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ['geocode'],
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            setValue('location', place.formatted_address);
            setParkProps(place)
        });
    }, [isLoaded]);

    return (
        <TextField
            label="Localização"
            id="location"
            sx={{ m: 1, width: '35ch' }}
            variant="standard"
            required
            autoFocus
            inputRef={inputRef}
            {...register('location')}
        />
    );
};

export default LocationAutocomplete;
