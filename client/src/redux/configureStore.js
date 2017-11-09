import { createStore, applyMiddleware, combineReducers } from 'redux';
// import reduxThunk from 'redux-thunk';
// import logger from 'redux-logger';

import reducers from '../reducers';
// import authReducer from './modules/auth';
// import resultOverview from './modules/result-overview';

// const middlewares = [reduxThunk];
const middlewares = [];

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger);
// }

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

// const reducer = combineReducers();
// {
// auth: authReducer,
// resultOverview
// });

const configureStore = initialState => createStoreWithMiddleware(reducers, initialState);
export default configureStore;

