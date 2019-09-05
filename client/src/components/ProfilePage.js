/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { changePassword } from '../actions/authActions';


const ProfilePage = ({ login, changePassword }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    const updatePass = {
      login: login,
      email: email,
      password: password,
      newPassword: newPassword,
    };

    changePassword(updatePass);
  };

  return (
    <TransitionGroup className="image-list">

      <CSSTransition key="yey" timeout={500} classNames="fade">
        <div className="row">
          <div className="col-sm" />
          <Form onSubmit={onSubmit} className="col-sm">
            <h1 className="text-center">Change Password</h1>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="" onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="oldpassword">Old Password</Label>
              <Input type="password" name="oldpassword" id="oldPassword" placeholder="" onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="newpassword">New Password</Label>
              <Input type="password" name="newpassword" id="newpassword" placeholder="" onChange={(e) => setNewPassword(e.target.value)} />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
          <div className="col-sm" />
        </div>
      </CSSTransition>
    </TransitionGroup>

  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  isLoading: state.auth.isLoading,
  email: state.auth.user.email,
  login: state.auth.user.login,
  error: state.error,
});

ProfilePage.propTypes = {
  login: PropTypes.string.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { changePassword },
)(ProfilePage);
