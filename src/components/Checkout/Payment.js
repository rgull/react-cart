import React, { Component } from 'react';
import { withRouter } from 'react-router';
// import StripeCheckout from 'react-stripe-checkout';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements';


const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    },
  };
};


export class Payment extends Component {
  constructor(props){
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch(`http://localhost:9890/api/payment/${this.props.location.state}`, {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id,
    });
    if (response.ok) {
      console.log("Purchase Complete!", response);
      this.props.history.push('./order-placed')
    } else {
      console.log('Purchased Canceled')
    }
  };

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    }
  };


  render() {
    console.log('Cart Total', this.props)
    return (
      <div>
          <div className="range-bar">
            <div className="step active"><span>Details</span></div>
            <div className="step active"><span>Order Confirmation</span></div>
            <div className="step active"><span>Payment</span></div>
            <div className="step"><span>Order Placed</span></div>
          </div>
          <form onSubmit={this.handleSubmit}> 
          <div className="split-form">
          <label>
            Card number
            <CardNumberElement
              {...createOptions()}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Expiration date
            <CardExpiryElement
              {...createOptions()}
              onChange={this.handleChange}
            />
          </label>
          </div>
          <div className="split-form">
          <label>
            CVC
            <CardCVCElement {...createOptions()} onChange={this.handleChange} />
          </label>
          <label>
            Postal code
            <input
              name="name"
              type="text"
              placeholder="94115"
              className="StripeElement"
              required
            />
          </label>
        </div>
        <div className="error" role="alert">
          {this.state.errorMessage}
        </div>
        <button>Pay ${this.props.location.state}</button>
          </form>
              <button onClick={() => this.props.history.goBack()}>Back</button>
      </div>
    )
  }
}

Payment = withRouter(Payment)


export default injectStripe(Payment)
