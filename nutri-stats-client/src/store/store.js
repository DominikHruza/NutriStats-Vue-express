import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import dashboard from './modules/dashboard';
import date from './modules/date';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    alerts: [],
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
  },

  actions: {
    removeAlert({ commit }) {
      commit('REMOVE_ALERT');
    },
  },

  getters: {
    getAlerts: (state) => {
      return state.alerts;
    },
  },

  modules: {
    auth,
    dashboard,
    date,
  },
});
