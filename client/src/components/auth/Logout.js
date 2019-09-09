import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../../actions/authActions";

const Logout = ({ logout }) => (
  <Link className='nav-link' to='/' onClick={logout}>
    Logout
  </Link>
);

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(Logout);
