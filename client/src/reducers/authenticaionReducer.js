import Auth from "../Auth.js";

let user = Auth.checkUserLoggedIn();
const initialState = user ? ({
  loggedIn: true,
  username: user.name,
  id: user.id,
  errors:{},
  successMessage:"",
  email: '',
  password: '',
  token:localStorage.getItem('user')
  }) :
({
  loggedIn: false,
  username: "",
  errors:{},
  successMessage:"",
  email: '',
  password: '',
  token: ''
});

export function authentication(state = initialState, action) {
  switch (action.type) {
    case "SIGNIN_FORM_UPDATE_VALUE_FULFILLED":
    return {
      ...state,
      [action.key]: action.value
    };
    case "USERS_LOGIN_PENDING":
      return {
        ...state,
        loggingIn: true,
        successMessage: "",
      };
    case "USERS_LOGIN_FULFILLED":
      Auth.authenticateUser(action.payload.data.user)
      return ({
        ...state,
        loggedIn: true,
        loggingIn: false,
        username: action.payload.data.user.name,
        id: action.payload.data.user.id,
        errors:{},
        email: '',
        password: '',
        token:action.payload.data.user.token
      }
    );
    case "USERS_LOGIN_REJECTED":
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        errors: action.payload.response.data.errors
      };
    case "USERS_LOGOUT":
      return {
        ...state,
        loggedIn: false,
        token:""
      };
    default:
      return state
  }
}
