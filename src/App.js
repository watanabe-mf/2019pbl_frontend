import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import AdminLayout from './layouts/AdminLayout';

import Top from './containers/Top';
import NotFound from './containers/NotFound';

library.add(faCircleNotch);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/admin' component={ AdminLayout } />
      <Route path='/' component={ Top } />
      <Route component={ NotFound } />
    </Switch>
  </BrowserRouter>
);

export default App;