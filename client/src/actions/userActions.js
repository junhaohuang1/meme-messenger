import axios from 'axios';
import Auth from '../Auth.js'

const updateSignUpForm = (key, value) => (dispatch) => (
  dispatch({
      type: "SIGNUP_FORM_UPDATE_VALUE_FULFILLED",
      key, value
  })
)

const updateSignInForm = (key, value) => (dispatch) => (
  dispatch({
      type: "SIGNIN_FORM_UPDATE_VALUE_FULFILLED",
      key, value
  })
)

const updateFriendQuery = (key, value) => (dispatch) => (
  dispatch({
      type: "FRIEND_QUERY_UPDATE_VALUE_FULFILLED",
      key, value
  })
)


const login = (email,password) => (dispatch) => (
  dispatch({
    type: "USERS_LOGIN",
    payload: axios.post('/auth/login', {
      email: email,
      password: password
    })
  })
);

const searchFriend = (email, token) => (dispatch) => (
  dispatch({
    type: "FRIEND_SEARCH",
    payload: axios.get('/api/findfriend', {
      headers:{
        authorization:token,
        email: email
      }
    })
  })
);



function logout() {
    Auth.deauthenticateUser();
    return { type: "USERS_LOGOUT" };
}

const signup = (name, email,password) => (dispatch) => (
  dispatch({
    type: "USERS_REGISTER",
    payload: axios.post('/auth/signup', {
      name: name,
      email: email,
      password: password
    })
  })
);



export const userActions = {
    login,
    logout,
    signup,
    searchFriend,
    updateSignInForm,
    updateSignUpForm,
    updateFriendQuery
};
