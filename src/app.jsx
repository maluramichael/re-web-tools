import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
}            from 'react-router-dom';

import CssBaseline      from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme            from './theme';

import { Home }             from './routes/home';
import { AddressList }      from './routes/address-list';
import { BinaryConverter }  from './routes/binary-converter';
import { GenericConverter } from './routes/generic-converter';

import { Navigation } from './navigation';

import './app.scss';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <CssBaseline/>
        <div className="app">
          <Navigation/>
          <div className="container">
            <Switch>
              <Route path="/address-list">
                <AddressList/>
              </Route>
              <Route path="/binary-converter">
                <BinaryConverter/>
              </Route>
              <Route path="/generic-converter">
                <GenericConverter/>
              </Route>
              <Route path="/">
                <Home/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
