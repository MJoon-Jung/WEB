export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  signUpData: {},
  loginData: {},
  me: null,
};

const dummyUser = {
  id: 1,
  nickname: 'MJoonJung',
  Posts: [],
  Followings: [],
  Followers: [],
};
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const signUpAction = (data) => {
  return {
    type: SIGN_UP,
    data,
  };
};

export const signUpSuccessAction = (data) => {
  return {
    type: SIGN_UP_SUCCESS,
    data,
  }
};

export const signUpFailureAction = (data) => {
  return {
    type: SIGN_UP_FAILURE,
    data,
  }
}

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
};
export const loginSuccessAction = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  }
};
export const loginFailureAction = (data) => {
  return {
    type: LOG_IN_FAILURE,
    data,
  }
};
export const logoutRequestAction = (data) => {
  return {
    type: LOG_OUT_REQUEST,
    data,
  }
};
export const logoutSuccessAction = () => {
  return {
    type: LOG_OUT_SUCCESS,
  }
};
export const logoutFailureAction = () => {
  return {
    type: LOG_OUT_FAILURE,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        logInLoading: true,
        logInError: null,
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        logOutDone: false,
        me: dummyUser,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null, 
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        logInDone: false,
        me: null,
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null, 
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true, 
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error
      };
    }
    default: {
      return {
        ...state,
      }
    }
  }
};
