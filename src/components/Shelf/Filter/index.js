import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterProducts } from '../../../services/shelf/actions'
import {fetchProducts} from '../../../services/shelf/actions'

import './style.scss';

class Filter extends Component {
  static propTypes = {
    updateFilters: PropTypes.func.isRequired,
    filters: PropTypes.array
  };

  constructor(props){
    super(props);
    this.state= {
      minPrice: '',
      maxPrice: '',
      filters: false
    }
  }

  handleSubmit = (e) => {
    const {minPrice, maxPrice} = this.state;
    e.preventDefault();
    console.log('State', this.state);
    this.props.filterProducts(minPrice, maxPrice);
    this.setState({filters: true})
  }

  handleFilter = () => {
    this.props.fetchProducts('products', () => {
      this.setState({ filters: false });
 })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {minPrice, maxPrice, filters} = this.state;
    return (
      <div className="filters">
        <h4 className="title">Price Filter:</h4>
        <form onSubmit={this.handleSubmit}>
        <div className="d-flex align-items-center">
        <input type="number" placeholder="Minimum Price" name="minPrice" value={minPrice} onChange={this.handleChange} /> 
        <span className="px-05">-</span>
        <input type="number" placeholder="Maximum Price" name="maxPrice" value={maxPrice} onChange={this.handleChange} />
        </div>
        <button type="submit">Filter</button>
        </form>
        {filters && <div>
          <p>Applied Price Filter:</p>
        <p>{minPrice}-{maxPrice}</p>
        <button onClick={this.handleFilter}>Remove Filter</button>
        </div>}
      </div>
    );
  }
}

export default connect(
  null,
  {  filterProducts, fetchProducts }
)(Filter);
