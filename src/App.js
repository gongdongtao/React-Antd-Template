import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import configureStore from './store/configureStore';
var store = configureStore();

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    );
  }
  
}

export default App;
