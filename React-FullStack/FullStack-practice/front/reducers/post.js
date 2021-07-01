import produce from 'immer';

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
};

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST: {
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    }
    case LOAD_POSTS_SUCCESS: {
      draft.mainPosts = action.data.concat(draft.mainPosts);
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      break;
    }
    case LOAD_POSTS_FAILURE: {
      draft.loadPostsLoading = false;
      draft.loadPostsError = true;
      break;
    }
    case ADD_POST_REQUEST: {
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    }
    case ADD_POST_SUCCESS: {
      draft.mainPosts.unshift(action.data);
      draft.addPostLoading = false;
      draft.addPostDone = true;
      break;
    }
    case ADD_POST_FAILURE: {
      draft.addPostLoading = false;
      draft.addPostError = true;
      break;
    }
    case REMOVE_POST_REQUEST: {
      draft.removePostLoading = true;
      draft.removePostDone = false;
      break;
    }
    case REMOVE_POST_SUCCESS: {
      console.log(action.data);
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      draft.removePostLoading = false;
      draft.removePostDone = true;
      break;
    }
    case REMOVE_POST_FAILURE: {
      draft.removePostLoading = false;
      draft.removePostError = true;
      break;
    }
    case ADD_COMMENT_REQUEST: {
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    }
    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Comments.unshift(action.data);
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }
    case ADD_COMMENT_FAILURE: {
      draft.addCommentLoading = false;
      draft.addCommentError = true;
      break;
    }
    default:
      break;
  }
});
