import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
}            from 'react-router-dom';

import { Home }            from './routes/home';
import { AddressLists }    from './routes/address-list';
import { BinaryConverter } from './routes/binary-converter';

import { Navigation } from './navigation';

import './app.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation/>
        <Switch>
          <Route path="/address-lists">
            <AddressLists/>
          </Route>
          <Route path="/binary-converter">
            <BinaryConverter/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
