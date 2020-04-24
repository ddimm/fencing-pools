export const SET_FENCERS = "SET_FENCERS";
export const SET_SCORES = "SET_SCORES";
export const ADD_FENCER = "ADD_FENCER";
export const UPDATE_SCORE = "UPDATE_SCORE";

//add a single fencer to the list of fencers
export function addFencer(fencer) {
  return {
    type: ADD_FENCER,
    fencer,
  };
}

//update the set of fencers all at once
export function setFencers(fencers) {
  return {
    type: SET_FENCERS,
    fencers,
  };
}
//set scores all at once
export function setScores(scores) {
  return {
    type: SET_SCORES,
    scores,
  };
}

//update a single score in the list
export function updateScore(scoreList) {
  return {
    type: UPDATE_SCORE,
    scoreList,
  };
}
