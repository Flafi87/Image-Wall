import React from 'react';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changePage } from '../../actions/navigationAction';

const Profile = ({ changePage }) => (
  <NavLink
    onClick={() => {
      changePage('profile');
    }}
    href="#"
  >
    Profile
  </NavLink>
);

Profile.propTypes = {
  changePage: PropTypes.func.isRequired,
};

export default connect(
  null,
  { changePage },
)(Profile);
