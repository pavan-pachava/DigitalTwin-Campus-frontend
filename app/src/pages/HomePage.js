import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import NavigationBar from '../Navigation/Navigation';


const HomePage = () => {
    const mapContainerRef = useRef(null);
    const map = useRef(null);
    const markers = useRef([]);

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

    const drawRedLine = (map, coordinates1, coordinates2, lineId) => {
        const lineCoordinates = [coordinates1, coordinates2];

        map.current.addSource(lineId, {
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

        map.current.addLayer({
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

    const drawPinkLine = (map, coordinates1, coordinates2, lineId) => {
        const lineCoordinates = [coordinates1, coordinates2];

        map.current.addSource(lineId, {
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

        map.current.addLayer({
            'id': lineId,
            'type': 'line',
            'source': lineId,
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': 'orange',
                'line-width': 5,
                'line-blur': 1.5
            }
        });
    };

    const addMarker = (lngLat) => {
        // Write an axios post request to send the new marker latitude longitude to the server
        axios.post('http://localhost:8080/api/setPredictionPoints', {
            latitude: lngLat.lat,
            longitude: lngLat.lng
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    
        // Write an axios get request to get the predicted value of the marker from the backend
        axios.get('http://localhost:8080/api/getPredictedVal')
        .then((response) => {
            const predValue = response.data;
            const markerNumber = markers.current.length + 1;
    
            console.log("pred val = ", predValue);
    
            const marker = new mapboxgl.Marker({
                draggable: true
            })
            .setLngLat(lngLat)
            .addTo(map.current);
    
            const nodeLabel = `Virtual Node - ${markerNumber}`;
            let popupContent = `
                <h3>${nodeLabel}</h3>
                <p>Latitude: ${lngLat.lat}</p>
                <p>Longitude: ${lngLat.lng}</p>
                <p>Predicted Water flow rate: ${predValue}</p>
            `;
    
            const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(popupContent)
            .setMaxWidth("300px");
    
            // Add popup to marker
            marker.setPopup(popup);
    
            // Show popup when hovering over the marker
            marker._element.addEventListener('mouseenter', () => {
                marker.togglePopup();
            });
    
            // Hide popup when mouse leaves the marker
            marker._element.addEventListener('mouseleave', () => {
                marker.togglePopup();
            });
    
            markers.current.push({ marker, number: markerNumber });
        })
        .catch((error) => {
            console.log(error);
        });
    };
    



    // Function to remove a specific marker
    const removeMarker = (markerNumber) => {
        const index = markers.current.findIndex(marker => marker.number === markerNumber);
        if (index !== -1) {
            markers.current[index].marker.remove();
            markers.current.splice(index, 1);
            // Update component state after removing marker
            setNodeData({ ...nodeData });
        }
    };



    // axios get request to get the node location from the backend
    axios.get('http://localhost:8080/api/getNodeLocation')
        .then((response) => {
            console.log(response.data);
        }, (error) => {
            console.log(error);
        });


    

    const handleMapClick = (e) => {
        addMarker(e.lngLat); // Add marker on map click
        // Optionally, you can do something with the marker number here
    };

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/pxvan2204/clsvo1csj005801qj2xja7t29',
            accessToken: 'pk.eyJ1IjoicHh2YW4yMjA0IiwiYSI6ImNsc2xsODk1cTBjNzIybG53cmVtZ2hjeWMifQ.HbtiE9XvtXZpNR2CF0YWoA'
        });

        map.current.on('click', handleMapClick);

        map.current.on('load', async () => {

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
            drawPinkLine(map, [78.35016321247491, 17.44725614935155], [78.34980064440764, 17.4469116293489], 'line20-21');
            drawPinkLine(map, [78.34980064440764, 17.4469116293489], [78.34956370897714, 17.44656792211732], 'line21-22');
            drawPinkLine(map, [78.34956370897714, 17.44656792211732], [78.34931944970312, 17.4462383264185], 'line22-23');
            drawPinkLine(map, [78.34931944970312, 17.4462383264185], [78.34916230221518, 17.44799796181944], 'line23-24');
            drawPinkLine(map, [78.34916230221518, 17.44799796181944], [78.34918109914895, 17.44770219232684], 'line24-25');
            drawPinkLine(map, [78.34918109914895, 17.44770219232684], [78.34802284075113, 17.4473223396666], 'line25-26');
            drawPinkLine(map, [78.34802284075113, 17.4473223396666], [78.34720881116223, 17.44643757656301], 'line26-27');
            drawPinkLine(map, [78.34720881116223, 17.44643757656301], [78.34730307981043, 17.44636718517568], 'line27-28');
            drawPinkLine(map, [78.34730307981043, 17.44636718517568], [78.34703792307027, 17.44533783819821], 'line28-29');
            drawPinkLine(map, [78.34703792307027, 17.44533783819821], [78.34669319523402, 17.44563193128936], 'line29-30');
            drawPinkLine(map, [78.34669319523402, 17.44563193128936], [78.34649889436822, 17.44517704565986], 'line30-31');
            drawPinkLine(map, [78.34649889436822, 17.44517704565986], [78.34652744202683, 17.44516754063333], 'line31-32');
            drawPinkLine(map, [78.34652744202683, 17.44516754063333], [78.3465254258933, 17.44520343837285], 'line32-33');
            drawPinkLine(map, [78.3465254258933, 17.44520343837285], [78.34671876296252, 17.4450003113143], 'line33-34');
            drawPinkLine(map, [78.34671876296252, 17.4450003113143], [78.34658384403653, 17.44464351161669], 'line34-35');
            drawPinkLine(map, [78.34658384403653, 17.44464351161669], [78.34728818452135, 17.44449273534782], 'line35-36');
            drawPinkLine(map, [78.34728818452135, 17.44449273534782], [78.34625706807689, 17.44489905957709], 'line36-37');
            drawPinkLine(map, [78.34625706807689, 17.44489905957709], [78.34623788829117, 17.44494037365051], 'line37-38');
            drawPinkLine(map, [78.34623788829117, 17.44494037365051], [78.34550467038528, 17.44492299837197], 'line38-39');
            drawPinkLine(map, [78.34550467038528, 17.44492299837197], [78.34546248141159, 17.44491166934417], 'line39-40');
            drawPinkLine(map, [78.34546248141159, 17.44491166934417], [78.34529939255805, 17.44506504305603], 'line40-41');
            drawPinkLine(map, [78.34529939255805, 17.44506504305603], [78.34623947579716, 17.44487839948707], 'line41-42');

            map.current.on('click', (e) => {
                // if (isInsideLineSegment(e.lngLat)) {
                addMarker(e.lngLat);
                // }
            });


            await updatePopups(map.current, markers, nodeData);

            const intervalId = setInterval(async () => {
                await updatePopups(map.current, markers, nodeData);
            }, 30000);
    
            return () => {
                map.current.off('click', handleMapClick);
                clearInterval(intervalId);
                map.current.remove(); // Remove map instance on unmount
            };

        });

    }, []);

    var nodeDataResponse;
    async function fetchNodeDataAndType() {
        try {
            nodeDataResponse = await axios.get('http://localhost:8080/api/getNodeData');
            setNodeData(nodeDataResponse.data);
            console.log(nodeDataResponse.data);
            return nodeDataResponse.data;
        } catch (error) {
            console.error('Error fetching node data and type:', error);
            return null
        }
    }


    const updatePopups = async (map, markers, nodeData) => {
        try {
            const nodeData = await fetchNodeDataAndType();

            markers.forEach((marker, index) => {
                // Check if marker already exists
                if (!marker.hasOwnProperty('mapMarker')) {
                    // Add marker to map
                    marker.mapMarker = new mapboxgl.Marker().setLngLat(marker.coordinates).addTo(map);
                }
    
                // Dynamically set popup content based on fetched node data
                const nodeDetails = nodeData[marker.label];
                let popupContent = `
                    <h3>${marker.label}</h3>
                    <p>Type: ${nodeTypes[marker.label]}</p>
                    <p>Latitude: ${marker.coordinates[1]}</p>
                    <p>Longitude: ${marker.coordinates[0]}</p>
                    <p>Water flow rate: ${nodeDetails ? nodeDetails[2] : 'Not available currently'}</p>
                `;
    
                // Add popup to marker
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);
    
                // Show popup when hovering over the marker
                marker.mapMarker.getElement().addEventListener('mouseenter', () => {
                    marker.mapMarker.setPopup(popup).togglePopup();
                });
    
                // Hide popup when mouse leaves the marker
                marker.mapMarker.getElement().addEventListener('mouseleave', () => {
                    marker.mapMarker.togglePopup();
                });
            });
        } catch (error) {
            console.error('Error updating popups:', error);
        }
    };
    

    const renderedMarkerList = markers.current.map((markerObj, index) => (
        <div key={index}>
            Marker {markerObj.number}
            <button onClick={() => removeMarker(markerObj.number)}>Remove</button>
        </div>
    ));

    // Render the marker list
    return (
        <div>
            <NavigationBar/>
            <h1 style={{ textAlign: 'center' }}>Digital Twin Water Simulation</h1>
            <div ref={mapContainerRef} style={{ width: '100%', height: '860px' }} />
            {renderedMarkerList}
        </div>
    );
};

export default HomePage;
