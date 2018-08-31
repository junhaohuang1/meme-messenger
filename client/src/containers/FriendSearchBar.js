import React from 'react';
import FriendSearchBarForm from '../components/FriendSearchBarForm.js';
import { userActions } from '../actions';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
// import {store} from "../store.js";
import {withRouter} from "react-router-dom";
import Modal from 'react-modal';
import { modalActions } from '../actions';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};



class FriendSearchBar extends React.Component {

  /**
   * Class constructor.
   */


  constructor(props, context) {
    super(props, context);

    this.openModal = this.props.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.props.closeModal.bind(this);
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.addFriend = this.addFriend.bind(this);

    this.state = {
        userSearchedId:"",
        currentUserID:"",
        token:""
    }

  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  addFriend(event){
    event.preventDefault();
    this.props.addFriend(this.props.currentUserID, this.props.userSearchedId, this.props.token)
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
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
      this.props.openModal();
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
    return (
      <div>
        <FriendSearchBarForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          // errors={this.props.errors}
          // successMessage={this.props.successMessage}
          email={this.props.email}
          // password={this.props.password}
        />
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.closeModal}
          style={customStyles}
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Friend Search Result</h2>
          <button onClick={this.props.closeModal}>close</button>
          {this.props.searched && this.props.searchingSuccess ? (
            <Card className = "container">
              <form action ="/" onSubmit={this.addFriend} style={{display:"flex"}}>
                <Card className = "container" style={{display:"flex"}}>
                  <label>
                    Username:{this.props.userSearchedName}
                  </label>
                  <label>
                    Email:{this.props.userSearchedEmail}
                  </label>
                  <br>
                  </br>
                  <label>
                    currentUserID:{this.props.currentUserID}
                  </label>
                  <br>
                  </br>
                  <label>
                    userSearchedId:{this.props.userSearchedId}
                  </label>
                </Card>
                  <RaisedButton style = {{flex:1,height: 63}} type="submit" label="Add Friend" primary />
              </form>
            </Card>
          ): (
            <label>
            {this.props.errorMessage}
            </label>
          )
        }
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    modalIsOpen: state.modal.friendModalOpen,
    searching: state.friendslist.searching,
    searched: state.friendslist.searched,
    errors: state.friendslist.errors,
    // successMessage: state.friendslist.successMessage,
    email: state.friendslist.email,
    token: state.authentication.token,
    userSearchedId:state.friendslist.userSearchedId,
    userSearchedName:state.friendslist.userSearchedName,
    userSearchedEmail:state.friendslist.userSearchedEmail,
    searchingSuccess:state.friendslist.searchingSuccess,
    errorMessage:state.friendslist.errors,
    currentUserID: state.authentication.id,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => {
      dispatch(modalActions.openFriendSearchResultModal())
    },
    closeModal:() =>{
      dispatch(modalActions.closeFriendSearchResultModal())
    },
    searchFriend: (email, token) => {
      dispatch(userActions.searchFriend(email, token))
    },
    updateFriendQuery:(key, value) =>{
      dispatch(userActions.updateFriendQuery(key, value))
    },
    addFriend:(userOneID, userTwoID, token) =>{
      dispatch(userActions.addFriend(userOneID, userTwoID, token))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FriendSearchBar))
