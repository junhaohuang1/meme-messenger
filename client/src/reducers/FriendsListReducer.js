const initialState = {
  searching: false,
  searched: false,
  errorMessage:"",
  email:"",
  userSearchedId:"",
  userSearchedName:"",
  userSearchedEmail:"",
}

export function friendslist(state = initialState, action) {
  switch(action.type){
    case "FRIEND_QUERY_UPDATE_VALUE_FULFILLED":
    return {
      ...state,
      [action.key]: action.value
    };
    case "FRIEND_SEARCH_PENDING":
      return {
        ...state,
        searching: true
      };
    case "FRIEND_SEARCH_FULFILLED":

      return {
        ...state,
        searching: false,
        searched: true,
        successMessage: action.payload.data.sucess,
        errors:{},
        userSearchedId:action.payload.data.userId,
        userSearchedName:action.payload.data.name,
        userSearchedEmail:action.payload.data.email,
        errorMessage:"",
        email:""
      };
    case "FRIEND_SEARCH_REJECTED":
      return {
        ...state,
        searching: false,
        searched: false,
        errors: action.payload.response.data.errors,
        successMessage:"",
        email:""
      };
    default:
      return state
  }
}
