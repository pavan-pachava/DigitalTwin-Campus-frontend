import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const HomePage = () => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/pxvan2204/clsvo1csj005801qj2xja7t29',
            accessToken: 'pk.eyJ1IjoicHh2YW4yMjA0IiwiYSI6ImNsc2xsODk1cTBjNzIybG53cmVtZ2hjeWMifQ.HbtiE9XvtXZpNR2CF0YWoA'
        });

        map.on('load', () => {

            const lines = [
                [[78.348587, 17.447792], [78.351097, 17.445673]],
                [[78.348587, 17.447792], [78.347332, 17.446451]],
                // add more lines as needed
            ];

            lines.forEach((coordinates, index) => {
                const id = 'line' + index;

                map.addSource(id, {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': coordinates
                        }
                    }
                });

                map.addLayer({
                    'id': id,
                    'type': 'line',
                    'source': id,
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': 'black',
                        'line-width': 5
                    }
                });

                // Add markers to both ends of the line segment
                new mapboxgl.Marker().setLngLat(coordinates[0]).addTo(map);
                new mapboxgl.Marker().setLngLat(coordinates[1]).addTo(map);
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