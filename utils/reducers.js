import { UPDATE_SCORE, SET_SCORES, SET_FENCERS } from "./actions";

const initState = {
  fencers: [],
  scores: [],
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case SET_SCORES:
      return {
        fencers: state.fencers,
        scores: action.scores,
      };
    case SET_FENCERS:
      return {
        fencers: action.fencers,
        scores: state.scores,
      };
  }
  return state;
}
