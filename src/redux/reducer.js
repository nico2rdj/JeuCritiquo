/* import db */
import { GAMES } from "../shared/games";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";

export const initialState = {
  games: GAMES,
  comments: COMMENTS,
  leaders: LEADERS,
  promotions: PROMOTIONS
};

export const Reducer = (state = initialState, action) => {
  return state;
};
