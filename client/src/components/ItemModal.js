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
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    title: "",
    file: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onFileChange = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      title: this.state.title,
      user: this.props.auth.email,
      login: this.props.auth.user,
      productImage: this.state.file
    };

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    if (this.props.isLoading || !this.props.isAuthenticated) {
      return null;
    } else {
      return (
        <div>
          <Button
            color="primary"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Post
          </Button>

          <Modal isOpen={this.state.modal} toggle={this.toggle}>
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
                    label="Yo, pick a file!"
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
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  isLoading: state.auth.isLoading
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
