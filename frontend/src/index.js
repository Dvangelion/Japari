import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import './index.css';
import rootreducer from './reducers/reducers'
import { Register } from './actions'

//const middleware = [ thunk ]


export const store = createStore(
  rootreducer,
  applyMiddleware(thunkMiddleware)
)

//store.dispatch(Register("test_username", "test_password")).then(() => console.log('store_state', store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
