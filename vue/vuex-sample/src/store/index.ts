import { createStore } from "vuex";
import { reviews, reviewsState } from "./modules/reviews";
import { user, userState } from "./modules/user";

export interface RootState {
  user: userState;
  reviews: reviewsState;
}

export default createStore({
  modules: {
    user,
    reviews,
  },
});
