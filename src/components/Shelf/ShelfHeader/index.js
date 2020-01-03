import React from 'react';
import PropTypes from 'prop-types';

const ShelfHeader = props => {
  return (
    <div className="shelf-container-header">
      <small className="products-found">
        <span>{props.productLength} Product(s) found.</span>
      </small>
    </div>
  );
};

ShelfHeader.propTypes = {
  // productLength: PropTypes.number.isRequired
};

export default ShelfHeader;
