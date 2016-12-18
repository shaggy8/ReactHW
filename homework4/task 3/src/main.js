import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import IndexPage from './components/IndexPage.jsx';
import Home from './components/Home.jsx';
import Goods from './components/Goods.jsx';
import Product from './components/Product.jsx';
import Cart from './components/Cart.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={IndexPage}>
      <Route path="/home" component={Home} />
      <Route path="/goods" component={Goods} />
      <Route path="/goods/:id" component={Product} />
      <Route path="/cart" component={Cart} />
    </Route>
  </Router>,
  document.getElementById('main-container')
);