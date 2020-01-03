import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { loadCart, removeProduct } from '../../services/cart/actions';
import { updateCart } from '../../services/total/actions';
import CartProduct from './CartProduct';
import './style.scss';

class FloatCart extends Component {
  static propTypes = {
    loadCart: PropTypes.func.isRequired,
    updateCart: PropTypes.func.isRequired,
    cartProducts: PropTypes.array.isRequired,
    newProduct: PropTypes.object,
    removeProduct: PropTypes.func,
    productToRemove: PropTypes.object,
  };

  state = {
    isOpen: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  }

  openFloatCart = () => {
    this.setState({ isOpen: true });
  };

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  };

  addProduct = (product) => {
    const { cartProducts, updateCart } = this.props;
    let productNotInCart = false;
    let checkProduct = true;

    cartProducts.forEach(cp => {
      if (checkProduct) {
        if (cp.product_id == product.product_id) {
          if (cp.color == product.color) {
            if (cp.size == product.size) {
              cp.quantity += product.quantity;
              productNotInCart = false;
              checkProduct = false;
            } else {
              productNotInCart = true;
            }
          } else {
            productNotInCart = true;
          }
        } else {
          productNotInCart = true;
        }
      }
    });

    if (cartProducts.length == 0) {
      productNotInCart = true;
    }
    if (productNotInCart) {
      cartProducts.push(product);
      productNotInCart = false;
      checkProduct = true;
    }

    updateCart(cartProducts);
    this.openFloatCart();
  };

  updateCartItems = () => {
    const { cartProducts, updateCart } = this.props;
    updateCart(cartProducts);
  }

  removeProduct = product => {
    const { cartProducts, updateCart } = this.props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  };

  proceedToCheckout = () => {
    const {
      totalPrice,
      productQuantity,
    } = this.props.cartTotal;

    if (!productQuantity) {
      alert('Add some product in the cart!');
    } else {
      this.props.history.push('./checkout');
      this.setState({isOpen: false})
    }
  };

  handleUpdateProduct = (product) => {
    this.updateCartItems();
  }

  render() {
    const { cartTotal, cartProducts, removeProduct } = this.props;

    const products = cartProducts.map(p => {
      return (
        <CartProduct product={p} removeProduct={removeProduct} key={p.color && p.size ?p.product_id+p.color+p.size:p.product_id}
        updateProduct={this.handleUpdateProduct} />
      );
    });

    let classes = ['float-cart'];

    if (!!this.state.isOpen) {
      classes.push('float-cart--open');
    }

    return (
      <div className={classes.join(' ')}>
        {this.state.isOpen && (
          <div
            onClick={() => this.closeFloatCart()}
            className="float-cart__close-btn"
          >
            X
          </div>
        )}
        {!this.state.isOpen && (
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{cartTotal.productQuantity}</span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="header-title">{cartTotal.productQuantity} Cart</span>
          </div>

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <p className="shelf-empty">
                Add some products in the cart <br />
                :)
              </p>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {cartTotal.totalPrice}
              </p>
              <small className="sub-price__installment">
              </small>
            </div>
            <div onClick={() => this.proceedToCheckout()} className="buy-btn">
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartProducts: state.cart.products,
  newProduct: state.cart.productToAdd,
  productToRemove: state.cart.productToRemove,
  cartTotal: state.total.data
});

FloatCart = withRouter(FloatCart)


export default connect(
  mapStateToProps,
  { loadCart, updateCart, removeProduct }
)(FloatCart);
