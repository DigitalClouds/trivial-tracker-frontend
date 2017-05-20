import Vue from 'vue'
import App from './App.vue'

import {getNearbyPoint} from './LocationTargetService';

window.getNearbyPoint = getNearbyPoint;

new Vue({
  el: '#app',
  render: h => h(App)
});
