import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import makaleler from "../articles.json";

export const store = new Vuex.Store({
  state: {
    makaleler:
      JSON.parse(localStorage.getItem("makaleler")) || makaleler.makaleler,
  },
  actions: {
    addNewArticle({ commit, state }, yeniMakale) {
      commit("addArticle", yeniMakale);
      localStorage.setItem("makaleler", JSON.stringify(state.makaleler));
    },
    updateArticle({ commit, state }, { id, newData }) {
      const index = state.makaleler.findIndex((makale) => makale.id === id);
      if (index !== -1) {
        commit("updateArticle", { index, newData });
        localStorage.setItem("makaleler", JSON.stringify(state.makaleler));
      }
    },
    updateSingleArticle({ commit, state }, { id, newData }) {
      const index = state.makaleler.findIndex((makale) => makale.id === id);
      if (index !== -1) {
        commit("updateSingleArticle", { index, newData });
        localStorage.setItem("makaleler", JSON.stringify(state.makaleler));
      }
    },
    deleteArticle({ commit, state }, id) {
      const index = state.makaleler.findIndex((makale) => makale.id === id);
      if (index !== -1) {
        commit("deleteArticle", index);
        localStorage.setItem("makaleler", JSON.stringify(state.makaleler));
      }
    },
    deleteSingleArticle({ commit, state }, id) {
      const index = state.makaleler.findIndex((makale) => makale.id === id);
      if (index !== -1) {
        commit("deleteSingleArticle", index);
        localStorage.setItem("makaleler", JSON.stringify(state.makaleler));
      }
    },
  },
  mutations: {
    addArticle(state, yeniMakale) {
      state.makaleler.push(yeniMakale);
    },
    updateArticle(state, { index, newData }) {
      state.makaleler[index] = { ...state.makaleler[index], ...newData };
      state.makaleler = [...state.makaleler];
    },
    updateSingleArticle(state, { index, newData }) {
      state.makaleler[index] = { ...state.makaleler[index], ...newData };
      state.makaleler = [...state.makaleler];
    },
    deleteArticle(state, index) {
      state.makaleler.splice(index, 1);
    },
    deleteSingleArticle(state, index) {
      state.makaleler.splice(index, 1);
    },
  },
});
