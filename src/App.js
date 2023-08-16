import React, { useState } from 'react';
import './index.css';
import './style.scss'
import Navbar from './components/layout/Navbar';
import SearchTour from './components/modules/SearchTour';
import  Home  from './components/modules/Home';
import  MyTours  from './components/modules/MyTours';
import  AllTours  from './components/modules/AllTours';
import  TourDetails  from './components/modules/TourDetails';
import BookTour from './components/modules/BookTour'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
          <Router>
              <Navbar />
              <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/search" component={SearchTour}></Route>
                  <Route exact path="/tours" component={AllTours}></Route>
                  <Route exact path="/tours/:slug" component={ TourDetails } ></Route>
                  <Route exact path="/my-tours" component={MyTours}></Route>
                  <Route exact path="/book-tour" component={BookTour}></Route>
                  <Route exact path="/update-tour/:slug" component={BookTour}></Route>
              </Switch>
            </Router>
    </div>
  );
};
export default App;