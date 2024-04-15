import React from 'react';
import { Link } from 'react-router-dom';

const Page2 = () => {
  return (
    <div>
      <h1>Page 2</h1>
      <p>This is Page 2 content.</p>
      <Link to="/">Go back to Home Page</Link>
    </div>
  );
};

export default Page2;