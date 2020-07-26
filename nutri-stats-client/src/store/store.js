import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import dashboard from "./modules/dashboard";
import date from "./modules/date";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["auth"],
    }),
  ],
  state: {
    alerts: [],
    modalOpened: null,
    loading: false,
  },

  mutations: {
    SET_ALERTS(state, payload) {
      if (Array.isArray(payload)) {
        state.alerts = [...state.alerts, ...payload];
      } else {
        state.alerts = [...state.alerts, payload];
      }
    },

    REMOVE_ALERT(state) {
      state.alerts.shift();
    },
    SET_MODAL_TYPE(state, payload) {
      state.modalOpened = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },

  actions: {
    removeAlert({ commit }) {
      commit("REMOVE_ALERT");
    },

    setModalType({ commit }, mealType) {
      commit("SET_MODAL_TYPE", mealType);
    },

    setLoading({ commit }, loading) {
      commit("SET_LOADING", loading);
    },
  },

  getters: {
    getAlerts: (state) => {
      return state.alerts;
    },

    getModalType: (state) => {
      return state.modalOpened;
    },

    isLoading: (state) => {
      return state.loading;
    },
  },

  modules: {
    auth,
    dashboard,
    date,
  },
});
