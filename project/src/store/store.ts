import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createAPI } from '../services/api';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(createAPI()))));

export default store;
