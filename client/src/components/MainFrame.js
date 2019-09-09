import React from "react";
import { connect } from "react-redux";
import { Container, Spinner } from "reactstrap";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import PostList from "./PostList";
import ProfilePage from "./ProfilePage";

const MainFrame = ({ isAuthenticated, isLoading }) => {
  if (isLoading) {
    return <Spinner color='primary' />;
  }
  return (
    <Container>
      <Route exact path='/' component={PostList} />
      <Route exact path='/profile' component={ProfilePage} />
    </Container>
  );
};

const mapStateToProps = state => ({
  activePage: state.nav.active_page,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

MainFrame.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  null
)(MainFrame);
