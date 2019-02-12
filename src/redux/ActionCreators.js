import * as ActionTypes from "./ActionTypes";
import { GAMES } from "../shared/games";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (gameId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    gameId: gameId,
    rating: rating,
    author: author,
    comment: comment
  }
});

/* games */

export const fetchGames = () => dispatch => {
  dispatch(gamesLoading(true));

  return fetch(baseUrl + "games")
    .then(response => response.json())
    .then(games => dispatch(addGames(games)));

  /* simulate communication w the server */
  /*
  setTimeout(() => {
    dispatch(addGames(GAMES));
  }, 2000);
  */
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

/* comments */

export const fetchComments = () => dispatch => {
  dispatch(gamesLoading(true));

  return fetch(baseUrl + "comments")
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = errmess => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

/* promos */

export const fetchPromos = () => dispatch => {
  dispatch(promosLoading(true));

  return fetch(baseUrl + "promotions")
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = errmess => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = promos => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
