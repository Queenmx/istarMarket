import { SET_INDEPTS, SET_INUSERS } from "./mutations-types";

export default {
  [SET_INDEPTS](state, list) {
    state.inDepts = list;
  },
  [SET_INUSERS](state, list) {
    state.inUsers = list;
  }
};
