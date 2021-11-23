import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import scheduleReducer from './reducers/scheduleReducer';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    scheduleReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
