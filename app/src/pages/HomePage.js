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
                [[78.351444, 17.445793], [78.351444, 17.445793]],
                [[78.348365, 17.443299], [78.348365, 17.443299]],
                [[78.348365, 17.443299], [78.348365, 17.443299]],
                [[78.348365, 17.443299], [78.348365, 17.443299]],
                [[78.348365, 17.443299], [78.348365, 17.443299]],
                [[78.349937, 17.445369], [78.349937, 17.445369]],
                [[78.349436, 17.446267], [78.349436, 17.446267]],
                [[78.349673, 17.444973], [78.349673, 17.444973]],
                [[78.349719, 17.445046], [78.349719, 17.445046]],
                [[78.349753, 17.445016], [78.349753, 17.445016]],
                [[78.346202, 17.444881], [78.346202, 17.444881]],
                [[78.346202, 17.444881], [78.346202, 17.444881]],
                [[78.347749, 17.447324], [78.347749, 17.447324]],
                [[78.349753, 17.445016], [78.349753, 17.445016]],
                [[78.349753, 17.445016], [78.349753, 17.445016]],
                [[78.348997, 17.445584], [78.348997, 17.445584]],
                [[78.349168, 17.445544], [78.349168, 17.445544]],
                [[78.350403, 17.445518], [78.350403, 17.445518]],
                [[78.3503, 17.445482], [78.3503, 17.445482]],
                [[78.349135, 17.448199], [78.349135, 17.448199]],
                [[78.347695, 17.447334], [78.347695, 17.447334]],
                [[78.346008, 17.444866], [78.346008, 17.444866]],
                [[78.349745, 17.44511], [78.349745, 17.44511]]
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