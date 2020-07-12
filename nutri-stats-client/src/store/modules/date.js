import moment from "moment";

const state = {
  currentDate: null,
};

const mutations = {
  SET_TODAY_DATE(state, dateToday) {
    state.currentDate = dateToday;
  },

  SET_SELECTED_DATE(state, date) {
    state.currentDate = date;
  },
};

const actions = {
  setTodayDate({ commit }) {
    const today = moment();
    commit("SET_TODAY_DATE", today);
  },

  incrementSelectedDate({ commit }) {
    const currentDate = state.currentDate;
    const nextDate = moment(currentDate).add(1, "days");
    commit("SET_SELECTED_DATE", nextDate);
  },

  decrementSelectedDate({ commit }) {
    const currentDate = state.currentDate;
    const previousDate = moment(currentDate).subtract(1, "days");
    commit("SET_SELECTED_DATE", previousDate);
  },
};

const getters = {
  getDate() {
    console.log(state);
    console.log(state.currentDate);
    return state.currentDate;
  },
};

// const formatdateString = ()=>{
//   const dd = String(today.getDate()).padStart(2, '0');
//   const mm = String(today.getMonth() + 1).padStart(2, '0');
//   const yyyy = today.getFullYear();
//   today = yyyy + '/' + mm + '/' + dd;
//   return today
// }
export default {
  state,
  mutations,
  actions,
  getters,
};
