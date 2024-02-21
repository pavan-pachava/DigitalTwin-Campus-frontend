import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const HomePage = () => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/pxvan2204/clssus7pe00so01qu4dj99619',
            accessToken: 'pk.eyJ1IjoicHh2YW4yMjA0IiwiYSI6ImNsc2xsODk1cTBjNzIybG53cmVtZ2hjeWMifQ.HbtiE9XvtXZpNR2CF0YWoA'
        });

        map.on('load', () => {
            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [
                            [78.348587, 17.447792], // replace with your first coordinate
                            [78.351044, 17.445612]  // replace with your second coordinate
                        ]
                    }
                }
            });

            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#fff',
                    'line-width': 8
                }
            });
        });

        return () => map.remove();
    }, []);

    return (
        <div>
            <div ref={mapContainerRef} style={{ width: '100%', height: '800px' }} />
        </div>
    );
};

export default HomePage;