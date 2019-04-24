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
import { editItem, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemEditModal extends Component {
  state = {
    modal: false,
    title: ""
  };
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.focus = this.focus.bind(this);
  }

  focus() {
    this.textInput.focus();
  }

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
      id: this.props.id,
      title: this.state.title,
      user: this.props.auth.user.email,
      login: this.props.auth.user.login,
      productImage: this.props.image
    };
    console.log(newItem);
    // Add item via addItem action
    this.props.editItem(newItem);

    // Close modal
    this.toggle();
  };
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  focusInput = component => {
    if (component) {
      component.focus();
    }
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Edit Post
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please log in to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modify Post</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Title</Label>
                <Input
                  autoFocus
                  type="text"
                  name="title"
                  id="title"
                  placeholder="placeholder"
                  onChange={this.onChange}
                />
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={this.onDeleteClick.bind(this, this.props.id)}
                >
                  Delete this Post
                </Button>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  DONE!
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  isLoading: state.auth.isLoading
});

export default connect(
  mapStateToProps,
  { editItem, deleteItem }
)(ItemEditModal);
