import { UPDATE_FILTER } from './actionTypes';

export const updateFilters = (min, max) => ({
  type: UPDATE_FILTER,
  minPrice: min,
  maxPrice: max
});
