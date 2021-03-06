import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts } from '../../services/shelf/actions';
import Spinner from '../Spinner';
import ShelfHeader from './ShelfHeader';
import ProductList from './ProductList';
import Page from './page';

import './style.scss';

class Shelf extends Component {
  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
  };

  state = {
    isLoading: false,
  };

  componentWillMount() {
    this.handleFetchProducts();
  }

  handleFetchProducts = () => {
    this.setState({ isLoading: true });
    this.props.fetchProducts('products', () => {
       this.setState({ isLoading: false });
  });
}

  render() {
    const { products, productLength } = this.props;
    const { isLoading } = this.state;

    return (
      <React.Fragment>
        {isLoading && <Spinner />}
        <div className="shelf-container">
          <ShelfHeader productLength={productLength} />
          {products &&<ProductList products={products} />}
          {productLength && <Page products={products} productLength={productLength} />}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.shelf.products,
  productLength: state.shelf.productLength
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(Shelf);
