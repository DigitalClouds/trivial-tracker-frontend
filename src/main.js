import Vue from 'vue'
import VueRouter from 'vue-router'
import Question from './Question.vue'
import Location from './Location.vue'
import Login from './Login.vue'

const NotFound = { template: '<p>Page not found</p>' };
const routes = [
    { path: '/', component: Login},
    { path: '/question', component: Question},
    { path: '/location', name: 'location', component: Location, props: true}
];

Vue.use(VueRouter);

export const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    router
});