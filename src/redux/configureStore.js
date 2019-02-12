import { createStore, combineReducers, applyMiddleware } from "redux";
import { Games } from "./games";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      games: Games,
      comments: Comments,
      leaders: Leaders,
      promotions: Promotions
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
