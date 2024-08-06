// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ClerksPage from './components/ClerksPage';

function App() {
  return (
    <Provider store={store}>
      <ClerksPage />
    </Provider>
  );
}

export default App;
