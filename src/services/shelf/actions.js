import { FETCH_PRODUCTS } from './actionTypes';
import { productsAPI } from '../util';

const compare = {
  lowestprice: (a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  },
  highestprice: (a, b) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;
    return 0;
  }
};

export const fetchProducts = (params, callback) => dispatch => {
  fetch(productsAPI+params).then(response => response.json())
  .then(data=> {
    console.log('Data', data);

    if (callback) {
      callback();
    }

    data.data = data.data.slice(0,20);

    return dispatch({
      type: FETCH_PRODUCTS,
      payload: data
    });
  }).catch(err => {
      console.log('Could not fetch products. Try again later.', err);
    });
};

export const filterProducts = (min, max) => dispatch => {
  console.log('Min, Max', min, max);
  fetch(productsAPI+'/products/filter/'+min + '/'+max).then(response => response.json())
  .then(data => {
    console.log('Filtered Products', data);
    return dispatch({
      type: FETCH_PRODUCTS,
      payload: data
    })
  })
}

export const pageChanged = (params, page) => dispatch => {
  fetch(productsAPI+params+page).then(response=> response.json())
  .then(data=> {
    console.log('Data', data)
    return dispatch({
      type: FETCH_PRODUCTS,
      payload: data
    });
  }).catch(err => {
      console.log('Could not fetch products. Try again later.', err);
  });
}

