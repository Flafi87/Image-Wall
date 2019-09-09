import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import MainFrame from "./components/MainFrame";

import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <HashRouter>
        <Container>
          <div className='d-flex justify-content-between'>
            <Button
              className='my-3'
              color='success'
              href='https://flafi.hu/index.html#jscript'
            >
              Back to the website
            </Button>
            <Button
              className='my-3'
              color='primary'
              href='https://github.com/Flafi87/Image-Wall'
              target='_blank'
            >
              Repo
            </Button>
          </div>
        </Container>
        <Provider store={store}>
          <div className='App'>
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
