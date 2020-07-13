import axiosInstance from '../../axios-config';
const state = {
  meals: {
    breakfast: {
      items: [],
    },
    lunch: {
      items: [],
    },
    dinner: {
      items: [],
    },
    snacks: {
      items: [],
    },
  },
};

const mutations = {
  SET_MEAL_DATA(state, payload) {
    state.meals = payload;
  },
};

const actions = {
  async fetchMealsData({ commit }) {
    const response = await axiosInstance.get('/meals');
    commit('SET_MEAL_DATA', response.data);
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
