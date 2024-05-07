import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


interface MapProps {
    latitude: number;
    longitude: number;
}

const MapComponent: React.FC<MapProps> = ({ latitude, longitude }) => {
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) {
        mapRef.current = L.map('map').setView([latitude, longitude], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);
        }
    }, [latitude, longitude]);

    useEffect(() => {
        if (mapRef.current) {
            const customIcon = L.icon({
            iconUrl: './images/pino-de-localizacao.png', // Use o ícone personalizado aqui
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });        
    
        L.marker([latitude, longitude]).addTo(mapRef.current)
            .bindPopup('Você está aqui!')
            .openPopup();
        }
    }, [latitude, longitude]);

    return <div id="map" style={{ height: '200px' }}></div>;
};

export default MapComponent;
