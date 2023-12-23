import React, { useRef, useEffect } from 'react';
import './Map.css';

const Map = props => {

    const mapRef = useRef();

    const { center, zoom } = props;

    useEffect(() => {
        
        // const map = new window.google.maps.Map(mapRef.current, {
        //     center: center,
        //     zoom: zoom
        // });
        // new window.google.maps.Marker({ position: center, map: map });

        const map = new window.Microsoft.Maps.Map(mapRef.current, {
            center: new window.Microsoft.Maps.Location(center.lat, center.lng),
            zoom: zoom
        });
    
        const mapCenter = map.getCenter();
        const pin = new window.Microsoft.Maps.Pushpin(mapCenter);
        map.entities.push(pin);

    }, [center, zoom])

    return (
        <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
        ></div>
    )
}

export default Map