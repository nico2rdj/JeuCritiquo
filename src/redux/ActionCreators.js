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
export const postFeedback = values => dispatch => {
  const newFeedback = {
    firstname: values.firstname,
    lastname: values.lastname,
    telnum: values.telnum,
    email: values.email,
    agree: values.agree,
    contactType: values.contactType,
    message: values.message
  };

  newFeedback.date = new Date().toISOString();
  alert("l'état est : " + JSON.stringify(newFeedback));

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

/* events */
export const fetchEvents = () => dispatch => {
  dispatch(eventsLoading(true));

  return fetch(baseUrl + "events")
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
    .then(events => dispatch(addEvents(events)))
    .catch(error => dispatch(eventsFailed(error.message)));

  /* simulate communication w the server */
  /*
  setTimeout(() => {
    dispatch(addGames(GAMES));
  }, 2000);
  */
};

export const eventsLoading = () => ({
  type: ActionTypes.EVENTS_LOADING
});

export const eventsFailed = errmess => ({
  type: ActionTypes.EVENTS_FAILED,
  payload: errmess
});

export const addEvents = events => ({
  type: ActionTypes.ADD_EVENTS,
  payload: events
});

/* form pour creer un evenement */
/* the dispatch is used because it is a thunk we return a function */
export const postEvent = values => dispatch => {
  const newEvent = {
    name: values.name,
    price: values.price,
    author: values.author,
    address: values.address,
    image: values.image,
    city: values.city,
    dateEvent: values.dateEvent,
    startHour: values.startHour,
    endHour: values.endHour,
    postalCode: values.postalCode,
    description: values.description,
    phone: values.phone
  };
  newEvent.date = new Date().toISOString();

  return fetch(baseUrl + "events", {
    method: "POST",
    body: JSON.stringify(newEvent),
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
    .then(response => dispatch(addEvent(response)))
    .catch(error => {
      console.log("Post event", error.message);
      alert("Your event could not be sent\nError: " + error.message);
    });
};

export const addEvent = event => ({
  type: ActionTypes.ADD_EVENT,
  payload: event
});
