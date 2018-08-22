import React from 'react';
import SignUpForm from '../components/SignUpForm.js';
import { userActions } from '../actions';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
// import {store} from "../store.js";

class SignUpPage extends React.Component {

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
    const name = this.props.name;
    const email = this.props.email;
    const password = this.props.password;
    if (name && email && password) {
        this.props.signup(name,email,password);
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
     this.props.updateSignUPForm(name,value);
   }


  /**
   * Render the component.
   */
  render() {
      // if(this.props.registered){
      //   store.dispatch(push("/login"))
      // }
      return (
        <SignUpForm
          test={this.test}
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.props.errors}
          email={this.props.email}
          password={this.props.password}
          name={this.props.name}
        />
      );
  }

}
function mapStateToProps(state) {
  return {
    registering: state.registration.registering,
    registered: state.registration.registered,
    errors: state.registration.errors,
    successMessage: state.registration.successMessage,
    email: state.registration.email,
    password: state.registration.password,
    name: state.registration.name,
    errorMessage: state.registration.errorMessage
  }
}


const mapDispatchToProps = dispatch => {
  return {
    signup: (name,email,password) => {
      dispatch(userActions.signup(name, email, password))
    },
    updateSignUPForm:(key, value) =>{
      dispatch(userActions.updateSignUpForm(key, value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
