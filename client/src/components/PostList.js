/* eslint-disable react/jsx-indent */
import React, { useEffect } from "react";
import {
  Container,
  Card,
  CardImg,
  CardBody,
  CardHeader,
  CardFooter
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editItem, deleteItem, getItems } from "../actions/itemActions";
import ItemEditModal from "./ItemEditModal";
import ItemModal from "./ItemModal";

const PostList = ({ posts, email, isLoading, getItems }) => {
  useEffect(() => getItems(), [getItems]);

  const onDate = date => {
    const time = new Date(date);
    return `${time.toDateString()} ${`0${time.getHours()}`.slice(
      -2
    )}:${`0${time.getMinutes()}`.slice(-2)}`;
  };

  const registeredList = (
    <TransitionGroup>
      <ItemModal />
      {posts.map(({ _id, title, image, user, login, date }) => (
        <CSSTransition key={_id} timeout={500} classNames='fade'>
          <Card className='row mb-5'>
            <CardHeader>{title}</CardHeader>

            <CardImg className='card-img-top' src={image} alt={title} />
            <CardBody>
              {email === user ? (
                <>
                  <ItemEditModal id={_id} image={image} title={title} />
                </>
              ) : null}
            </CardBody>
            <CardFooter>
              {login}
              <div className='col-sm' />
              {onDate(date)}
            </CardFooter>
          </Card>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );

  if (isLoading) {
    return null;
  }
  return <Container>{registeredList}</Container>;
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  posts: state.post.posts,
  isLoading: state.auth.isLoading,
  email: state.auth.email
});

export default connect(
  mapStateToProps,
  { editItem, deleteItem, getItems }
)(PostList);
