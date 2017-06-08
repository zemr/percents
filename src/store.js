import { createStore, combineReducers } from 'redux';
import paginationReducer from './pagination/pagination-reducer';
import sliderReducer from './slider/slider-reducer';

const reducer = combineReducers({
  pagination: paginationReducer,
  slider: sliderReducer
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store