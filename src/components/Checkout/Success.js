import React, { Component } from 'react'

export class Success extends Component {
  render() {
    return (
      <div>
           <div className="range-bar">
            <div className="step active"><span>Details</span></div>
            <div className="step active"><span>Order Confirmation</span></div>
            <div className="step active"><span>Payment</span></div>
            <div className="step active"><span>Order Placed</span></div>
          </div>
        Order Placed Successfully
      </div>
    )
  }
}

export default Success
