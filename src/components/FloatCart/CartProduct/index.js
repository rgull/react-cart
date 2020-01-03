import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Thumb from './../../Thumb';

class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false,
      itemQuantity: props.product.quantity
    };
  }
  static propTypes = {
    product: PropTypes.object.isRequired,
    removeProduct: PropTypes.func.isRequired
  };



  handleMouseOver = () => {
    this.setState({ isMouseOver: true });
  };

  handleMouseOut = () => {
    this.setState({ isMouseOver: false });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ itemQuantity: nextProps.product.quantity })
  }

  handleIncrement = () => {
    const { product } = this.props
    let itemQuantity = this.state.itemQuantity + 1;
    this.setState({ itemQuantity: itemQuantity });
    product.quantity = itemQuantity;
    this.props.updateProduct(product)

  }

  handleDecrement = () => {
    const { product } = this.props
    let itemQuantity = this.state.itemQuantity - 1;
    if (itemQuantity > 0) {
      this.setState({ itemQuantity: itemQuantity });
      product.quantity = itemQuantity;
      this.props.updateProduct(product)
    }
  }

  render() {
    const { product, removeProduct } = this.props;
    const classes = ['shelf-item'];

    if (!!this.state.isMouseOver) {
      classes.push('shelf-item--mouseover');
    }

    return (
      <div className={classes.join(' ')}>
        <div
          className="shelf-item__del"
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={() => removeProduct(product)}
        />
        <Thumb
          classes="shelf-item__thumb"
          src={require(`../../../static/products/12064273040195392_2.jpg`)}
          alt={product.name}
        />
        <div className="shelf-item__details">
          <p className="title">{product.color}{product.name}</p>
        </div>
        <div className="shelf-item__details">
          <p className="desc">
            <button onClick={this.handleDecrement}>-</button><span>{this.state.itemQuantity}</span><button onClick={this.handleIncrement}>+</button>
          </p>
        </div>
        <div className="shelf-item__details">
          <p className="desc">
            {product.price}
          </p>
        </div>
        <div className="shelf-item__price">
          {product.size}{product.price}
        </div>
      </div>
    );
  }
}

export default CartProduct;
