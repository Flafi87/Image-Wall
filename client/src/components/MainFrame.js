import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Alert,
  Spinner,
} from 'reactstrap';
import PropTypes from 'prop-types';
import PostList from './PostList';
import ItemModal from './ItemModal';
import ProfilePage from './ProfilePage';

const MainFrame = ({ activePage, isAuthenticated, isLoading }) => {
  const guestList = (
    <Alert color="secondary">Unfortunately you have to log in</Alert>
  );

  if (isLoading) {
    return <Spinner color="primary" />;
  } if (!isAuthenticated) {
    return guestList;
  }
  switch (activePage) {
    case 'posts':
      return (
        <Container>
          <ItemModal />
          <PostList />
        </Container>
      );
    case 'profile':
      return <ProfilePage />;
    default:
      return <Spinner color="primary" />;
  }
};

const mapStateToProps = (state) => ({
  activePage: state.nav.active_page,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});


MainFrame.propTypes = {
  activePage: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};


export default connect(
  mapStateToProps,
  null,
)(MainFrame);
