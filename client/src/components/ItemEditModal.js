import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editItem, deleteItem } from "../actions/itemActions";

class ItemEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: ""
    };
    this.focus = this.focus.bind(this);
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
    const { id, auth, image, editItem } = this.props;
    const { title } = this.state;
    e.preventDefault();
    const newItem = {
      id: id,
      title: title,
      user: auth.user.email,
      login: auth.user.login,
      productImage: image
    };
    console.log(newItem);
    // Add item via addItem action
    editItem(newItem);

    // Close modal
    this.toggle();
  };

  onDeleteClick = id => {
    const { deleteItem } = this.props;
    deleteItem(id);
  };

  focusInput = component => {
    if (component) {
      component.focus();
    }
  };

  focus() {
    this.textInput.focus();
  }

  render() {
    const { isAuthenticated, title } = this.props;
    const { modal } = this.state;
    return (
      <div>
        {isAuthenticated ? (
          <Button
            color="dark"
            onClick={() => {
              this.toggle();
              this.setState({ title: title });
            }}
          >
            Edit Post
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please log in to manage items</h4>
        )}

        <Modal isOpen={modal} toggle={this.toggle}>
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
                  defaultValue={title}
                  onChange={this.onChange}
                />
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={this.onDeleteClick.bind(this, this.props.id)}
                  style={{ margin: "1rem 0 1rem 0" }}
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

ItemEditModal.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  isLoading: state.auth.isLoading
});

export default connect(
  mapStateToProps,
  { editItem, deleteItem }
)(ItemEditModal);
