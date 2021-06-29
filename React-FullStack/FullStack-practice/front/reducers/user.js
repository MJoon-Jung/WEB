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
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  signUpData: {},
  loginData: {},
  me: null,
};

const dummyUser = {
  id: 1,
  nickname: 'MJoonJung',
  Posts: [],
  Followings: [{ nickname: 'audwns' }, { nickname: 'dhdldhdl' }, { nickname: 'neue zeal' }],
  Followers: [{ nickname: 'audwns' }, { nickname: 'dhdldhdl' }, { nickname: 'neue zeal' }],
};
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const signUpSuccessAction = (data) => ({
  type: SIGN_UP_SUCCESS,
  data,
});

export const signUpFailureAction = (data) => ({
  type: SIGN_UP_FAILURE,
  data,
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});
export const loginSuccessAction = (data) => ({
  type: LOG_IN_SUCCESS,
  data,
});
export const loginFailureAction = (data) => ({
  type: LOG_IN_FAILURE,
  data,
});
export const logoutRequestAction = (data) => ({
  type: LOG_OUT_REQUEST,
  data,
});
export const logoutSuccessAction = () => ({
  type: LOG_OUT_SUCCESS,
});
export const logoutFailureAction = () => ({
  type: LOG_OUT_FAILURE,
});
export const changeNicknameRequestAction = (data) => ({
  type: CHANGE_NICKNAME_REQUEST,
  data,
});
export const changeNicknameSuccessAction = (data) => ({
  type: CHANGE_NICKNAME_SUCCESS,
  data,
});
export const changeNicknameFailureAction = (data) => ({
  type: CHANGE_NICKNAME_FAILURE,
  data,
});

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
        logOutError: action.error,
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
        signUpError: action.error,
      };
    }
    case CHANGE_NICKNAME_REQUEST: {
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };
    }
    case CHANGE_NICKNAME_SUCCESS: {
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
      };
    }
    case CHANGE_NICKNAME_FAILURE: {
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };
    }
    case ADD_POST_TO_ME: {
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts],
        },
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
