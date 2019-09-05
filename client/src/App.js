import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import {
  HashRouter,
} from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import MainFrame from './components/MainFrame';

import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <HashRouter>
        <Provider store={store}>
          <div className="App">
            <AppNavbar />
            <Container>
              <MainFrame />
            </Container>
          </div>
        </Provider>
      </HashRouter>

    );
  }
}

export default App;
