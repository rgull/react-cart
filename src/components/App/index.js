import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Login from './login';
import Menu from './menu';
import ProductDetails from '../Shelf/ProductList/Product/ProductDetails/ProductDetails';
import FloatCart from '../FloatCart';
import CheckoutInfo from '../Checkout/Checkout';
import ConfirmOrder from '../Checkout/ConfirmOrder';
import Payment from '../Checkout/Payment';
import Success from '../Checkout/Success';

const LoginContainer = () => (
  <div>
    <Route exact path="/" component={Login} />
    <Route exact path="/login" component={Login} />
  </div>
);

const DefaultContainer = () => (
  <div>
    <FloatCart />
    <Route exact path="/menu" component={Menu} />
    <Route exact path="/checkout" component={CheckoutInfo} />
    <Route exact path="/product/:id" component={ProductDetails} />
    <Route exact path="/order-details" component={ConfirmOrder} />
    <Route exact path="/payment" component={Payment} />
    <Route exact path="/order-placed" component={Success} />
  </div>
);

export class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_IoeTmppHpvQPDn1frtVBYwFo">
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={LoginContainer} />
            <Route exact path="/login" component={LoginContainer} />
            <Elements>
            <Route component={DefaultContainer} />
            </Elements>
          </Switch>
        </Router>
      </div>
      </StripeProvider>
    );
  }
}

export default App;
