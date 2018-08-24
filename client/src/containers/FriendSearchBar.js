import React from 'react';
import FriendSearchBarForm from '../components/FriendSearchBarForm.js';
import { userActions } from '../actions';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {store} from "../store.js";
import {withRouter} from "react-router-dom";



class FriendSearchBar extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
  * Process the form.
  *
  * @param {object} event - the JavaScript event object
  */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = this.props.email;
    console.log(email);
    if (email) {
      console.log(email);
      this.props.searchFriend(email, this.props.token);
    }
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.updateFriendQuery(name,value);
  }

  /**
   * Render the component.
   */
  render() {
    if(this.props.loggedIn){
      store.dispatch(push('/'))
    }
    return (
      <FriendSearchBarForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        // errors={this.props.errors}
        // successMessage={this.props.successMessage}
        email={this.props.email}
        // password={this.props.password}
      />
    );
  }

}

function mapStateToProps(state) {
  return {
    searching: state.friendslist.searching,
    searched: state.friendslist.searched,
    errors: state.friendslist.errors,
    // successMessage: state.friendslist.successMessage,
    email: state.friendslist.email,
    token: state.authentication.token,
    userSearchedId:state.friendslist.userSearchedId,
    userSearchedName:state.friendslist.userSearchedName,
    userSearchedEmail:state.friendslist.userSearchedEmail,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchFriend: (email, token) => {
      dispatch(userActions.searchFriend(email, token))
    },
    updateFriendQuery:(key, value) =>{
      dispatch(userActions.updateFriendQuery(key, value))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FriendSearchBar))
