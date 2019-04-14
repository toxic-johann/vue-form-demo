import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import state from './state';
import * as mutations from './mutation';
Vue.use(Vuex);
export default new Store({
  state,
  mutations,
})