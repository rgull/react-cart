import { FETCH_PRODUCTS, FETCH_REVIEWS, POST_REVIEW, FETCH_PRODUCT, PRODUCT_ATTRIBUTES } from './actionTypes';
import ProductModel from '../../models/product';

const initialState = {
  products: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload.data,
        productLength: action.payload.count
      };
    default:
      return state;
  }
}
