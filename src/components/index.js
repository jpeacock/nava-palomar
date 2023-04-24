import React from 'react';
import {
  Route,
  Routes,
  BrowserRouter as Router
} from "react-router-dom";

import Listing from './listing';

const Pages = () => {
    return(
      <Router>
        <Routes>
          <Route path="/" element={<Listing />}></Route>
        </Routes>
      </Router>
    );
    
};
export default Pages;