import axiosInstance from "../../axios-config";
import moment from "moment";
import router from "../../main";
import axios from 'axios'

const state = {
  token: "",
  userId: null,
  username: "",
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
    state.token = "";
    state.userId = null;
    state.username = "";
    state.isAuthenticated = false;
  },
};

const actions = {
  async signUp({ commit }, authData) {
    const response = await axiosInstance.post("/auth/sign-up", authData);
  },

  async login({ commit }, authData) {
    try {
      //api call
      const response = await axios.post("/api/auth/log-in", authData);
      console.log(response)
      const { data } = response;

      //set token and exp date to local storage

      const expiresIn = data.expiresIn;
      const expirationDate = moment().add(expiresIn, "seconds");
      localStorage.setItem("token", data.token);
      localStorage.setItem("expiresIn", expirationDate);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);

      //commit mutations
      commit("SET_TOKEN", data.token);
      commit("SET_USER", data);
    } catch (error) {
      console.log(error);
      const errorMsgs = error.response.data.message;
      commit("SET_ALERTS", errorMsgs);
    }
  },

  logout({ commit }) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    commit("CLEAR_AUTH");
  },

  checkAuth({ commit }) {
    console.log(router);
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const now = new Date();

    commit("SET_TOKEN", token);
    commit("SET_USER", { userId, username });
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
