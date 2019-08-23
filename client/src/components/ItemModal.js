import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addItem } from "../actions/itemActions";

class ItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: "",
      file: null
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileChange = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  onSubmit = e => {
    const { title, file } = this.state;
    const { email, user, addItem } = this.props;
    console.log(user);
    e.preventDefault();
    const newItem = {
      title: title,
      user: email,
      login: user,
      productImage: file
    };

    // Add item via addItem action
    addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    const { isLoading, isAuthenticated } = this.props;
    const { modal, file } = this.state;
    if (isLoading || !isAuthenticated) {
      return null;
    }
    return (
      <div>
        <Button
          color="primary"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Post
        </Button>

        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To The Flow</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Add a title"
                  onChange={this.onChange}
                />
                <Label for="exampleCustomFileBrowser">Choose a photo</Label>
                <CustomInput
                  type="file"
                  id="filebrowser"
                  name="file"
                  label={file ? file.name : "Yo, pick a file!"}
                  onChange={this.onFileChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add the Post
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ItemModal.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  email: state.auth.email,
  user: state.auth.login,
  isLoading: state.auth.isLoading
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
