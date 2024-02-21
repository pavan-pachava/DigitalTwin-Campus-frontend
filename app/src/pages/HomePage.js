import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'your_access_token_here'; // replace with your Mapbox access token

const HomePage = () => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/pxvan2204/clssus7pe00so01qu4dj99619',
        });

        // Clean up on unmount
        return () => map.remove();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <h1>Home Page</h1>
            <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
        </div>
    );
};

export default HomePage;