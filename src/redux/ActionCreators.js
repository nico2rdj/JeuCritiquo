import * as ActionTypes from "./ActionTypes";
import { GAMES } from "../shared/games";
import { baseUrl } from "../shared/baseUrl";

/*
export const addComment = (gameId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    gameId: gameId,
    rating: rating,
    author: author,
    comment: comment
  }
});
*/

export const addComment = comment => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

// le dispatch dans la signature a cause du thunk
export const postComment = (gameId, rating, author, comment) => dispatch => {
  const newComment = {
    gameId: gameId,
    rating: rating,
    author: author,
    comment: comment
  };
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
      console.log("Post comments", error.message);
      alert(
        "Votre commentaire n' pas pu être posté...\nErreur: " + error.message
      );
    });
};

/* games */

export const fetchGames = () => dispatch => {
  dispatch(gamesLoading(true));

  return fetch(baseUrl + "games")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(games => dispatch(addGames(games)))
    .catch(error => dispatch(gamesFailed(error.message)));

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
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
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
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
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

/* leaders */
export const fetchLeaders = () => dispatch => {
  dispatch(leadersLoading(true));

  return fetch(baseUrl + "leaders")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = errmess => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = leaders => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

/* the dispatch is used because it is a thunk we return a function */
export const postFeedback = (
  firstname,
  lastname,
  telnum,
  email,
  agree,
  contactType,
  message
) => dispatch => {
  const newFeedback = {
    firstname: firstname,
    lastname: lastname,
    telnum: telnum,
    email: email,
    agree: agree,
    contactType: contactType,
    message: message
  };
  newFeedback.date = new Date().toISOString();

  return fetch(baseUrl + "feedback", {
    method: "POST",
    body: JSON.stringify(newFeedback),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addFeedback(response)))
    .catch(error => {
      console.log("Post feedback", error.message);
      alert("Your feedback could not be sent\nError: " + error.message);
    });
};

export const addFeedback = feedback => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback
});
