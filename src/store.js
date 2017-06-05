import { createStore, combineReducers } from 'redux';
import paginationReducer from './pagination/pagination-reducer';

const reducer = combineReducers({
  pagination: paginationReducer
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store