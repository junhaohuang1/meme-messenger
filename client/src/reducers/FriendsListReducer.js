const initialState = {
  searching: false,
  searched: false,
  errorMessage:"",
  email:"",
  userSearchedId:"",
  userSearchedName:"",
  userSearchedEmail:"",
  errors:"",
  searchingSuccess:false,
  addingFriend:false,
  friendAdded:false,
  addFriendFail:false,
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
        searchingSuccess: action.payload.data.success,
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
        errors: action.payload.response.data.message,
        successMessage:"",
        email:""
      };
    case "ADD_FRIEND_PENDING":
      return {
        ...state,
        addingFriend: true
      };
    case "ADD_FRIEND_FULFILLED":
      return {
        ...state,
        addingFriend: false,
        friendAdded:true,
      };
    case "ADD_FRIEND_REJECTED":
      return {
        ...state,
        addingFriend: false,
        friendAdded:false,
        addFriendFail:true
      };
    default:
      return state
  }
}
