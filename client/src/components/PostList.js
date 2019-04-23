import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Alert,
  Media,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardHeader,
  CardSubtitle
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { editItem, deleteItem } from "../actions/itemActions";
import ItemEditModal from "./ItemEditModal";
import PropTypes from "prop-types";

class PostList extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    email: PropTypes.string
  };

  componentDidMount() {}

  onEditClick = id => {
    this.props.editItem(id);
  };

  render() {
    const { posts } = this.props.post;
    const registeredList = (
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {posts.map(({ _id, title, image, user }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <Card className="row">
                <CardHeader>{title}</CardHeader>

                <CardImg className="col-sm" src={image} alt="car" />
                <CardBody>
                  {this.props.email === user ? (
                    <React.Fragment>
                      <ItemEditModal id={_id} image={image} title={title} />
                    </React.Fragment>
                  ) : null}
                </CardBody>
              </Card>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    );

    const guestList = (
      <Alert color="secondary">Unfortunately you have to log in</Alert>
    );
    if (this.props.isLoading) {
      return null;
    } else {
      return (
        <Container>
          {this.props.isAuthenticated ? registeredList : guestList}
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  email: state.auth.email
});

export default connect(
  mapStateToProps,
  { editItem, deleteItem }
)(PostList);
