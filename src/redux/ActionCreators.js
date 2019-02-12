import * as ActionTypes from "./ActionTypes";
import { GAMES } from "../shared/games";

export const addComment = (gameId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    gameId: gameId,
    rating: rating,
    author: author,
    comment: comment
  }
});

export const fetchGames = () => dispatch => {
  dispatch(gamesLoading(true));

  setTimeout(() => {
    dispatch(addGames(GAMES));
  }, 2000);
};

export const gamesLoading = () => ({
  type: ActionTypes.GAMES_LOADING
});

export const gamesFailed = errmess => ({
  type: ActionTypes.GAMES_FAILED,
  payload: errmess
});

export const addGames = games => ({
  type: ActionTypes.ADD_GAMES,
  payload: games
});
