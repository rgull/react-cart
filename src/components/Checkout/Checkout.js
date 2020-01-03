import React, { Component } from 'react';
import { withRouter } from 'react-router';

export class CheckoutInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      standardShipping: true,
      expressShipping: false,
      billing: true,
      error: {}
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleExpressShipping = (e) => {
    this.setState({expressShipping: true, standardShipping: false})
  }

  handleStandardShipping = (e) => {
    this.setState({standardShipping: true, expressShipping: false})
  }

  handleSubmit = (e) => {
    console.log('Submitted', this.state);
    e.preventDefault();
    const error = this.validate();
    this.setState({error})
    if (!error) {
      this.props.history.push('./order-details', this.state);
    }
  }

  validate = () => {
    const error = {};
    for (var key in this.state) {
        if (!this.state[key] && this.isRequiredField(key) && this.state[key].length<1) {
            error[key] = `${key} Required`;
        }
    }
    console.log('Number of Errors', Object.keys(error).length)

    return Object.keys(error).length === 0 ? null : error;
}

isRequiredField(name){
  if (name != "standardShipping" && name!="expressShipping") {
      return true;
  } else {
      return false;
  }
}

  render() {
    const { billing, firstName, lastName, address, city, state, zipCode, error, standardShipping, expressShipping } = this.state
    return (
      <div>
        
          <div className="range-bar">
            <div className="step active"><span>Details</span></div>
            <div className="step"><span>Order Confirmation</span></div>
            <div className="step"><span>Payment</span></div>
            <div className="step"><span>Order Placed</span></div>
          </div>
        
<div className="checkout">
        <form className="d-flex flex-wrap align-items-center" onSubmit={this.handleSubmit}>
          <div className="col-4">
            <label>First Name</label>
          </div>
          <div className="col-6">
            <input type="text" name="firstName" value={firstName} onChange={this.handleChange} />
            {error.firstName && <div className="alert alert-danger">{error.firstName.toUpperCase()}</div>}
          </div>
          <div className="col-4">
            <label>Last Name</label>
          </div>
          <div className="col-6">
            <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
            {error.lastName && <div className="alert alert-danger">{error.lastName.toUpperCase()}</div>}

          </div>
          <div className="col-4">
            <label>Address</label>
          </div>
          <div className="col-6">
            <input type="text" name="address" value={address} onChange={this.handleChange} />
            {error.address && <div className="alert alert-danger">{error.address.toUpperCase()}</div>}

          </div>
          <div className="col-4">
            <label>City</label>
          </div>
          <div className="col-6">
            <input type="text" name="city" value={city} onChange={this.handleChange} />
            {error.city && <div className="alert alert-danger">{error.city.toUpperCase()}</div>}

          </div>
          <div className="col-4">
            <label>State</label>
          </div>
          <div className="col-6">
            <input type="text" name="state" value={state} onChange={this.handleChange} />
            {error.state && <div className="alert alert-danger">{error.state.toUpperCase()}</div>}

          </div>
          <div className="col-4">
            <label>ZIP Code</label>
          </div>
          <div className="col-6">
            <input type="text" name="zipCode" value={zipCode} onChange={this.handleChange} />
            {error.zipCode && <div className="alert alert-danger">{error.zipCode.toUpperCase()}</div>}

          </div>
          <div className="col-4 align-items-start">
            <label>Country: Great Britian</label>
          </div>
          <div className="col-6">
            <label className="container">My billing information is same as my delivery information.
            <input type="checkbox" checked={billing} />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="col-12">
            <h2>Delivery Options</h2>
          </div>

          <div className="col-4">
          <label className="container">Standard Shipping 
              <input name="shipping" type="radio" checked={standardShipping} onChange={this.handleStandardShipping}  />
              <span className="checkmark"></span>
            </label>

            <label className="container">Express Shipping <small>(Costs Extra $4)</small>
              <input name="shipping" type="radio" checked={expressShipping} onChange={this.handleExpressShipping} />
              <span className="checkmark"></span>
            </label>

          </div>
          <div className="col-6">
            <button onClick={() => this.props.history.goBack()}>Back</button>
            <button type="submit" onClick={this.handleSubmit}>Next Step</button>
          </div>
        </form>
        </div>
      </div>
    )
  }
}

CheckoutInfo = withRouter(CheckoutInfo)


export default CheckoutInfo
