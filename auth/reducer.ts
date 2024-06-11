// auth/reducer.ts
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./actionTypes";

interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
  role: string | string[] | null;
}

interface Action {
  type: string;
  payload?: any;
}

export const initialState: State = {
  isLoading: false,
  isAuthenticated: false,
  role: null,
};

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    //
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };
    //
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        role: action.payload.role,
      };
    //
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, isAuthenticated: false, role: null };
    //
    case LOGOUT:
      return { ...state, isLoading: false, isAuthenticated: false, role: null };
    //
    default:
      return state;
  }
};
