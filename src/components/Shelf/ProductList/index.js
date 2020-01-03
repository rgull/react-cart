import React, { Component } from 'react'
import Product from './Product';

const ProductList = ({ products }) => {
  return products.map(p => {
    return <Product product={p} key={p.product_id} />;
  });
};


export default ProductList;
