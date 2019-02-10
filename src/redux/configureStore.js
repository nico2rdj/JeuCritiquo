import { createStore, combineReducers } from "redux";
import { Games } from "./games";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      games: Games,
      comments: Comments,
      leaders: Leaders,
      promotions: Promotions
    })
  );

  return store;
};
