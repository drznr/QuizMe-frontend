import Vue from 'vue';
import Vuex from 'vuex';

import { quizStore } from './quiz.store';
import { userStore } from './user.store';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isProcessing: false
  },
  mutations: {
    setIsProcessing(state, { isProcessing }) {
      state.isProcessing = isProcessing;
    }
  },
  getters: {
    isProcessing(state) {
      return state.isProcessing;
    }
  },
  modules: {
    quizStore,
    userStore
  }
})
