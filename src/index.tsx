import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './app';
import LocalStorageService from './services/local-storage.service';

const store = configureStore();
store.subscribe(() => {
    LocalStorageService.saveState(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
