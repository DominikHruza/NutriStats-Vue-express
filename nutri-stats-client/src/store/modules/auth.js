import axiosInstance from '../../axios-config';
import store from '../store';
const state = {
  token: '',
  userId: null,
  username: '',
  isAuthenticated: false,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, userData) {
    const { username, userId } = userData;
    state.userId = userId;
    state.username = username;
    state.isAuthenticated = true;
  },
  CLEAR_AUTH(state) {
    state.token = '';
    state.userId = null;
    state.username = '';
    state.isAuthenticated = false;
  },
};

const actions = {
  async signUp({ commit }, authData) {
    const response = await axiosInstance.post('/auth/sign-up', authData);
  },

  async login({ commit }, authData) {
    try {
      const response = await axiosInstance.post('/auth/sign-in', authData);
      const { data } = response;
      localStorage.setItem('token', data.token);
      commit('SET_TOKEN', data.token);
      commit('SET_USER', data);
    } catch (error) {
      const errorMsgs = error.response.data.message;
      commit('SET_ALERTS', errorMsgs);
    }
  },

  logout({ commit }) {
    commit('CLEAR_AUTH');
  },
};

const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated !== false;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
