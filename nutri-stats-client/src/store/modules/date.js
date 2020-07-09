const state = {
  currentDate: null,
};

const mutations = {
  SET_TODAY_DATE(state, dateToday) {
    state.currentDate = dateToday;
  },
};

const actions = {
  setTodayDate({ commit }) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    commit('SET_TODAY_DATE', today);
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
