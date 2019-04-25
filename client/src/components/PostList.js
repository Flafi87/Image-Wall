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
  CardFooter
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

  onDate = date => {
    let time = new Date(date);
    return `${time.toDateString()} ${("0" + time.getHours()).slice(-2)}:${(
      "0" + time.getMinutes()
    ).slice(-2)}`;
  };

  render() {
    const { posts } = this.props.post;
    const registeredList = (
      <TransitionGroup className="image-list">
        {posts.map(({ _id, title, image, user, login, date }) => (
          <CSSTransition key={_id} timeout={500} classNames="fade">
            <Card className="row mb-5">
              <CardHeader>{title}</CardHeader>

              <CardImg className="card-img-top" src={image} alt="car" />
              <CardBody>
                {this.props.email === user ? (
                  <React.Fragment>
                    <ItemEditModal id={_id} image={image} title={title} />
                  </React.Fragment>
                ) : null}
              </CardBody>
              <CardFooter>
                {login}
                <div className="col-sm" />
                {this.onDate(date)}
              </CardFooter>
            </Card>
          </CSSTransition>
        ))}
      </TransitionGroup>
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
