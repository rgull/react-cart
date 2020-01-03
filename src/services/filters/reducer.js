import { UPDATE_FILTER } from './actionTypes';

const initialState = {
  minPrice: '',
  maxPrice: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER:
      return {
        ...state,
        minPrice: action.minPrice,
        maxPrice: action.maxPrice
      };
    default:
      return state;
  }
}
