import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { changePage } from '../../actions/navigationAction';

const Wall = ({ changePage }) => (
  <NavLink
    onClick={() => {
      changePage('posts');
    }}
    href="#"
  >
    Wall
  </NavLink>
);

Wall.propTypes = {
  changePage: PropTypes.func.isRequired,
};

export default connect(
  null,
  { changePage },
)(Wall);
