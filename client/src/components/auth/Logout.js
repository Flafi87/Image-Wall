import React from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";

const Logout = props => {
  const { logout } = props;
  return (
    <NavLink onClick={logout} href="#">
      Logout
    </NavLink>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(Logout);
