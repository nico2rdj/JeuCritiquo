import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import { Games } from "./games";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import { Events } from "./events";
import { Auth } from "./auth";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { InitialFeedback, InitialEvent } from "./forms";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      games: Games,
      comments: Comments,
      leaders: Leaders,
      events: Events,
      promotions: Promotions,
      auth: Auth,
      ...createForms({
        feedback: InitialFeedback,
        event: InitialEvent
      })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
