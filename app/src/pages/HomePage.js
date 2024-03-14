import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

const HomePage = () => {
    const mapContainerRef = useRef(null);

<<<<<<< HEAD
    const [nodeData, setNodeData] = useState({});
    const [nodeType, setNodeType] = useState({});

    const nodeTypes = {
        'WM-WF-PH01-00': 'Shenitek',
        'WM-WF-PH03-00': 'Shenitek',
        'WM-WF-PH03-01': 'Shenitek',
        'WM-WF-PH03-02': 'Shenitek',
        'WM-WF-PH03-03': 'Shenitek',
        'WM-WF-VN01-00': 'Shenitek',
        'WM-WF-PH02-70': 'RF',
        'WM-WF-KB04-71': 'RF',
        'WM-WF-KB04-72': 'RF',
        'WM-WF-KB04-73': 'RF',
        'WM-WF-PL00-70': 'RF',
        'WM-WF-PL00-71': 'RF',
        'WM-WF-PR00-70': 'RF',
        'WM-WF-PH04-70': 'RF',
        'WM-WF-PH04-71': 'RF',
        'WM-WF-BB04-70': 'RF',
        'WM-WF-BB04-71': 'RF',
        'WM-WF-VN04-70': 'RF',
        'WM-WF-VN04-71': 'RF',
        'WM-WF-PH04-50': 'Kritsnam',
        'WM-WF-PR00-50': 'Kritsnam',
        'WM-WF-PL00-50': 'Kritsnam',
        'WM-WF-BB04-50': 'Kritsnam'
      };
=======
    const drawRedLine = (map, coordinates1, coordinates2, lineId) => {
        const lineCoordinates = [coordinates1, coordinates2];

        map.addSource(lineId, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': lineCoordinates
                }
            }
        });

        map.addLayer({
            'id': lineId,
            'type': 'line',
            'source': lineId,
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': 'red',
                'line-width': 5,
                'line-blur': 1.5
            }
        });
    };
>>>>>>> d7a14de (added pipes)

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/pxvan2204/clsvo1csj005801qj2xja7t29',
            accessToken: 'pk.eyJ1IjoicHh2YW4yMjA0IiwiYSI6ImNsc2xsODk1cTBjNzIybG53cmVtZ2hjeWMifQ.HbtiE9XvtXZpNR2CF0YWoA'
        });

        map.on('load', () => {

            const markers = [
                { coordinates: [78.351444, 17.445793], label: 'WM-WF-PH01-00' },
                { coordinates: [78.348365, 17.443299], label: 'WM-WF-PH03-00' },
                { coordinates: [78.348365, 17.443299], label: 'WM-WF-PH03-01' },
                { coordinates: [78.348365, 17.443299], label: 'WM-WF-PH03-02' },
                { coordinates: [78.348365, 17.443299], label: 'WM-WF-PH03-03' },
                { coordinates: [78.349937, 17.445369], label: 'WM-WF-VN01-00' },
                { coordinates: [78.349436, 17.446267], label: 'WM-WF-PH02-70' },
                { coordinates: [78.349673, 17.444973], label: 'WM-WF-KB04-71' },
                { coordinates: [78.349719, 17.445046], label: 'WM-WF-KB04-72' },
                { coordinates: [78.349753, 17.445016], label: 'WM-WF-KB04-73' },
                { coordinates: [78.346202, 17.444881], label: 'WM-WF-PL00-70' },
                { coordinates: [78.346202, 17.444881], label: 'WM-WF-PL00-71' },
                { coordinates: [78.347749, 17.447324], label: 'WM-WF-PR00-70' },
                { coordinates: [78.349753, 17.445016], label: 'WM-WF-PH04-70' },
                { coordinates: [78.349753, 17.445016], label: 'WM-WF-PH04-71' },
                { coordinates: [78.348997, 17.445584], label: 'WM-WF-BB04-70' },
                { coordinates: [78.349168, 17.445544], label: 'WM-WF-BB04-71' },
                { coordinates: [78.350403, 17.445518], label: 'WM-WF-VN04-70' },
                { coordinates: [78.3503, 17.445482], label: 'WM-WF-VN04-71' },
                { coordinates: [78.349135, 17.448199], label: 'WM-WF-PH04-50' },
                { coordinates: [78.347695, 17.447334], label: 'WM-WF-PR00-50' },
                { coordinates: [78.346008, 17.444866], label: 'WM-WF-PL00-50' },
                { coordinates: [78.349745, 17.44511], label: 'WM-WF-BB04-50' },
            ];
            

            markers.forEach((marker, index) => {
                // Add marker to map
                const mapMarker = new mapboxgl.Marker().setLngLat(marker.coordinates).addTo(map);

                // Add popup to marker
                const popup = new mapboxgl.Popup({ offset: 25 }).setText(marker.label);
                mapMarker.setPopup(popup);


                // If this is not the last marker, add a line to the next marker
                // if (index < markers.length - 1) {
                //     const lineCoordinates = [marker.coordinates, markers[index + 1].coordinates];

                //     map.addSource('line' + index, {
                //         'type': 'geojson',
                //         'data': {
                //             'type': 'Feature',
                //             'properties': {},
                //             'geometry': {
                //                 'type': 'LineString',
                //                 'coordinates': lineCoordinates
                //             }
                //         }
                //     });

                //     map.addLayer({
                //         'id': 'line' + index,
                //         'type': 'line',
                //         'source': 'line' + index,
                //         'layout': {
                //             'line-join': 'round',
                //             'line-cap': 'round'
                //         },
                //         'paint': {
                //             'line-color': 'black',
                //             'line-width': 5,
                //             'line-blur': 1.5
                //         }
                //     });
                // }
            });

<<<<<<< HEAD
        async function fetchNodeDataAndType() {
            try {
                const nodeDataResponse = await axios.get('http://localhost:8080/api/getNodeData');
                setNodeData(nodeDataResponse.data);
                console.log(nodeDataResponse.data);
            } catch (error) {
                console.error('Error fetching node data and type:', error);
            }
        }
=======
            drawRedLine(map, [78.35161904598921, 17.44560479017388], [78.35162904114092, 17.44561754773665], 'line1-2');
            drawRedLine(map, [78.35162904114092, 17.44561754773665], [78.35093659211216, 17.44650724089774], 'line2-4');
            drawRedLine(map, [78.35161904598921, 17.44560479017388], [78.35106374683362, 17.44587288707581], 'line1-3');
            drawRedLine(map, [78.35106374683362, 17.44587288707581], [78.34889594249334, 17.44765374072153], 'line3-5');
            drawRedLine(map, [78.34889594249334, 17.44765374072153], [78.34916230221518, 17.44799796181944], 'line5-6');
            drawRedLine(map, [78.34889594249334, 17.44765374072153], [78.34855456943406, 17.44789081525911], 'line5-7');
            drawRedLine(map, [78.34855456943406, 17.44789081525911], [78.3481458877794, 17.44745339286092], 'line7-8');
            drawRedLine(map, [78.3481458877794, 17.44745339286092], [78.34782434488129, 17.44769068904917], 'line8-9');
            drawRedLine(map, [78.34782434488129, 17.44769068904917], [78.34768412993049, 17.44755591442254], 'line9-10');
            drawRedLine(map, [78.34859900474223, 17.44403005080462], [78.34883168504915, 17.4438395864977], 'line12-11');
            drawRedLine(map, [78.34883168504915, 17.4438395864977], [78.34863792026871, 17.44362473668902], 'line11-13');
            drawRedLine(map, [78.34863792026871, 17.44362473668902], [78.34885769355928, 17.44329193043446], 'line13-14');
            drawRedLine(map, [78.34885769355928, 17.44329193043446], [78.34877336913988, 17.44319980391064], 'line14-15');
            drawRedLine(map, [78.34877336913988, 17.44319980391064], [78.34888555265366, 17.44310957644382], 'line15-16');
            drawRedLine(map, [78.349733, 17.447004], [78.34937931454236, 17.44629064408088], 'line17-18');
            drawRedLine(map, [78.34937931454236, 17.44629064408088], [78.34932388168806, 17.44619581644029], 'line18-19');
            
        });
>>>>>>> d7a14de (added pipes)

        fetchNodeDataAndType();
        const intervalId = setInterval(fetchNodeDataAndType, 30000);

        return () => {
            clearInterval(intervalId); // Cleanup interval on unmount
            map.remove(); // Remove map instance on unmount
        };
    }, []);

    return (
        <div>
            <div ref={mapContainerRef} style={{ width: '100%', height: '800px' }} />
        </div>
    );
};

export default HomePage;