import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../Navigation/Navigation';
import './VisualizationPage.css';

const VisualizationPage = () => {
  return (
    <div>
      <NavigationBar/>
      <div class="grid-container">
        <iframe class="grid-item" src="https://observablehq.com/embed/9d61e82843510c67@342?cells=viewof+order%2Cchart"></iframe>
        <iframe class="grid-item" src="https://observablehq.com/embed/9028b36f97072070@852?cells=chart"></iframe>
        <iframe class="grid-item" src="https://observablehq.com/embed/0c9817b6a1d34857@419?cells=chart"></iframe>
        <iframe class="grid-item" src="https://observablehq.com/embed/b2220684852140c7@120?cells=chart"></iframe>
      </div>
      <Link to="/">
          <button style={{ display: 'block', margin: 'auto', marginTop: '30px', padding: '10px' }}>Go to Home Page</button>
      </Link>
    </div>

    
  );
};

export default VisualizationPage;
