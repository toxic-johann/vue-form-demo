import Vue from 'vue'
import App from './App.vue'
import BaseElement from './components/base/BaseElement.vue';
import SelectArea from './components/vessel/SelectArea.vue';
import ResultArea from './components/vessel/ResultArea.vue';
import BaseInput from './components/element/BaseInput.vue';
import store from './store/index';
Vue.component('BaseElement', BaseElement);
Vue.component('SelectArea', SelectArea);
Vue.component('ResultArea', ResultArea);
Vue.component('BaseInput', BaseInput);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
