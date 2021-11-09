import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    "role": 1,
    "_id": "616c163019384e67c9fc01c5",
    "username": "John",
    "email": "john@gmail.com",
    "avatar": "profile/003.jpg",
    "followers": [
        "616c5726f69e1d1aeaa59eea"
    ],
    "following": [
        "616c5726f69e1d1aeaa59eea"
    ],
    "isAdmin": false,
    "createdAt": "2021-10-17T12:25:20.360Z",
    "__v": 0
  },
  isFetching: false,
  error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    // Ne pas oublier le point ! (AuthContext.Provider)
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}
    >
        {children}
    </AuthContext.Provider>
  )
};
