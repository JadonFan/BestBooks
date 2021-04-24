import { combineReducers } from 'redux';
import categoryReducer from './Categories/CategoryReducers';
import bookReducer from './Books/BookReducers';

const reducers = combineReducers({categoryReducer, bookReducer});

export default reducers;