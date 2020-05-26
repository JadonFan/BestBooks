import { combineReducers } from 'redux';
import categoryReducer from './CategoryReducers';
import bookReducer from './BookReducers';

const reducers = combineReducers({categoryReducer, bookReducer});

export default reducers;