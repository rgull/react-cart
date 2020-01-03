import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../../../../services/cart/actions';
import PropTypes from 'prop-types';
import ProductReviews from './Reviews';
import NewReview from './AddReview';
import Rating from './Rating';
import Attributes from './Attributes';
import { productsAPI } from '../../../../../services/util'


export class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      itemQuantity: 1,
      id: this.props.match.params.id,
      color: '',
      size: '',
    }
    console.log('State', this.state)
  }

  componentWillMount = () => {
    // fetch(productsAPI+'products/'+this.state.id).then(response => response.json()).then(data=> data[0]).then(data=> this.setState({product: data}))
    fetch('https://backendapi.turing.com/products/' + this.state.id).then(response => response.json()).then(data => this.setState({ product: data }, () => console.log('Product', this.state.product)))
  }

  handleAddQuantity = () => {
    let itemQuantity = this.state.itemQuantity + 1;
    this.setState({ itemQuantity: itemQuantity }, () => { console.log('Quantity', this.state.itemQuantity) });
  }

  handleRemoveQuantity = () => {
    var itemQuantity = this.state.itemQuantity - 1;
    if (itemQuantity > 0) {
      this.setState({ itemQuantity: itemQuantity }, () => { console.log('Quantity', this.state.itemQuantity) });
    }

  }

  addProduct = (product) => {
    const { color, size, itemQuantity } = this.state;

    product.quantity = itemQuantity;
    product.size = size;
    product.color = color;
    this.props.addProduct(product);
  }

  handleSelectedColor = (color) => {
    this.setState({ color: color.value })
  }

  handleSelectedSize = (size) => {
    this.setState({ size: size.value })
  }

  render() {
    const { product } = this.state;
    console.log('State in Render', this.state)
    return (
      <div className="detail-page">
        <div className="d-flex row">
          <div className="col-6">
            <img alt="shirt" src="https://cdn.shopify.com/s/files/1/0896/8970/products/Image_15__1482817589_49.248.188.49-min_1024x1024.jpg?v=1522406381" />
          </div>
          <div className="col-6">
            <p>Breadcrumb</p>
            <Rating /><br></br>

            <p>{product.name}</p>
            <p>{product.price}</p>
              <Attributes productId={this.state.id} selectedColor={this.handleSelectedColor}
                selectedSize={this.handleSelectedSize} />
            <div className="quantity">
            <button onClick={this.handleRemoveQuantity}>-</button>
            <span>{this.state.itemQuantity}</span>  
            <button onClick={this.handleAddQuantity}>+</button>
            </div>
            <br />
            <div className="checkout-btn d-flex align-items-center">
              <button classNam="btn-pink" onClick={this.addProduct.bind(this, product)}>Add to Cart</button>
              <a href="">Add to Wishlist</a>
            </div>
          </div>
        </div>
        <div className="view-cont">
        
    <h2>Product Reviews Custom Component</h2>
        
          
          <ProductReviews productId={this.state.id} />
        

        
        <div>
          <h2>Add Review Custom Component</h2>
          <NewReview productId={this.state.id} />
        </div>
        <div>
          <p>You may like these products</p>
        </div>
        </div>
      </div>
    )
  }
}

ProductDetails.propTypes = {
  addProduct: PropTypes.func.isRequired,
  fetchProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cartProducts: state.cart.products,
})

export default connect(mapStateToProps, { addProduct })(ProductDetails)
