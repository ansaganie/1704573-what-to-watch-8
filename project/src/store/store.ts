import { createStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools());

export default store;
