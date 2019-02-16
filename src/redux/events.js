import * as ActionTypes from "./ActionTypes";

export const Events = (
  state = {
    isLoading: true,
    errMess: null,
    events: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_EVENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        events: action.payload
      };

    case ActionTypes.EVENTS_LOADING:
      return { ...state, isLoading: true, errMess: null, events: [] };

    case ActionTypes.EVENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        events: []
      };
    case ActionTypes.ADD_EVENT:
      var event = action.payload;
      //comment.id = state.comments.length; on peut le commenter car le id est généré automatiquement par le serveur
      return { ...state, events: state.events.concat(event) };

    default:
      return state;
  }
};
