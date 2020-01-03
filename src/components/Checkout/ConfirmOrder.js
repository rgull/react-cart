import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { withRouter } from 'react-router';
import './Style.css';

export class ConfirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "Item", field: "name"
        }, {
          headerName: "Quantity", field: "quantity"
        }, {
          headerName: "Price", field: "price"
        },
        {
           field: "address",   
          rowSpan: function() {
            return props.cartProducts.length;
        }
        }
      ],
      rowData: this.props.cartProducts,
      voucher: '',
      grandTotal: ''
    }
    this.state.rowData[0].address = this.props.location.state.address
  }

  handleVoucher = (e) => {
    this.setState({voucher: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push('./payment', this.state.grandTotal)
  }

  handleTotalPrice = () => {
    const {location, cartTotal} = this.props
    var grandPrice;
    if(location.state.expressShipping){
      console.log('Express')
       grandPrice = cartTotal.totalPrice + 4;
    }
    if(this.state.voucher == 'GOKUDAY'){
      grandPrice = cartTotal.totalPrice*0.8;
      console.log('Voucher Correct', grandPrice)
    }
    this.setState({grandTotal: grandPrice? grandPrice.toFixed(2): this.props.cartTotal.totalPrice}, ()=> console.log('Grand Price', this.state.grandTotal))
  }
  render() {
    console.log('Checkout Props', this.props);
    return (
      <div>
         <div className="range-bar">
            <div className="step active"><span>Details</span></div>
            <div className="step active"><span>Order Confirmation</span></div>
            <div className="step"><span>Payment</span></div>
            <div className="step"><span>Order Placed</span></div>
          </div>
      <div className="checkout d-flex flex-column">
        <div className="ag-theme-balham"
          style={{
            height: '200px',
            width: '100%'
          }} >
          <AgGridReact
            columnDefs={this.state.columnDefs} suppressRowTransform={true}
            rowData={this.state.rowData}>
          </AgGridReact>
        </div>
        <hr className="col-12" />
        <div className="d-flex align-items-center mb-1">
          <div className="col-3">
            <input style={{ marginBottom: '0px' }} type="text" value={this.state.voucher} onChange={this.handleVoucher} placeholder="Voucher" />
            <small>Enjoy 20% off using 'GOKUDAY' as voucher</small>
          </div>
          <div className="col-3">
            Subtotal: <strong>${this.props.cartTotal.totalPrice}</strong>
          </div>
          <div className="col-3">Shipping: {this.props.location.state.standardShipping? 'Standard Shipping': 'Express Shipping'}</div>
          <div className="col-3">GrandTotal: <strong>${this.state.grandTotal}</strong></div>
        </div>
        <div className="d-flex justify-content-end col-12">
        <button onClick={this.handleTotalPrice}>Calculate Grand Total</button>
          <button onClick={() => this.props.history.goBack()}>Back</button>
          <button onClick={this.handleSubmit}>Next Step</button>
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cartProducts: state.cart.products,
  cartTotal: state.total.data
});

ConfirmOrder = withRouter(ConfirmOrder)


export default connect(mapStateToProps)(ConfirmOrder)
