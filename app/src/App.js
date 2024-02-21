import React, { useEffect, useState, useRef } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import { MapContainer, TileLayer, Polyline, Marker, Popup, Polygon, Rectangle } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import CustomCircleMarker from './components/CustomCircleMarker';
// import { IoIosWater } from 'react-icons/io';
// import { BsFillBoxFill } from "react-icons/bs";
// import L from 'leaflet';
// import ReactDOMServer from 'react-dom/server';
import {Routes, Route} from "react-router-dom";
// import Swal from 'sweetalert2';
// import axios from 'axios';
import './App.css';

function App(){
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
    </>
  )
}

export default App;