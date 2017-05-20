import Vue from 'vue'
import App from './App.vue'
import Question from './Question.vue'

/*new Vue({
 el: '#app',
 render: h => h(Question)
 })*/


const NotFound = { template: '<p>Page not found</p>' };
const routes = {
    '/': App,
    '/question': Question
};
new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent () {
            return routes[this.currentRoute] || NotFound
        }
    },
    render (h) { return h(this.ViewComponent) }
});