import React, { Component } from "react";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import AppNavbar from "./components/AppNavbar";
import PostList from "./components/PostList";
import ItemModal from "./components/ItemModal";

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
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <PostList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
