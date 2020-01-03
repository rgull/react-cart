import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import Thumb from '../../../Thumb';
import { addProduct } from '../../../../services/cart/actions';


export class Product extends Component {

  handleClick = (product) => {
    this.props.history.push(`./product/${product.product_id}`)
  }

  render() {
    const { product, addProduct } = this.props;
    product.quantity = 1;

    return (
      <div className="shelf-item">
        <div className="blog" onClick={this.handleClick.bind(this, product)} data-sku={product.product_id}>

          <Thumb
            classes="shelf-item__thumb"
            src={require(`../../../../static/products/12064273040195392_2.jpg`)}
            alt={product.name}
          />
          <p className="shelf-item__title">
            {product.name}
          </p>
          <div className="shelf-item__price">
            <div className="val">
              {`$ ${product.discounted_price}`}
              <small style={{ textDecoration: "line-through" }}>{product.price}</small>
            </div>
            <small>{product.description}</small>
          </div>
          </div>
          <button className="shelf-item__buy-btn shelf-item" onClick={() => addProduct(product)}>Add to cart</button>
      </div>
    )
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

Product = withRouter(Product)

export default connect(
  null,
  { addProduct }
)(Product);
