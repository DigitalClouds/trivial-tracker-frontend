<template>
    <div id="app">
        <layout></layout>
        <p>
            Login to your Twitter account (so we can tell everyone you if you get a question wrong and don't reach the destination in time)</p>
    </div>
</template>

<script>
    import {OAuth} from 'oauthio-web';
    import Layout from "./Layout.vue";
    import env from './env.js';
    export default {
        name: 'login',
        created() {
            OAuth.initialize(env.twitterAppKey);
            OAuth.redirect('twitter', `${location.origin}/#/question/`)
                .done((twitter) => {
                    this.twitter = twitter;
                    console.dir(twitter);
                })
                .fail(error => {
                    console.dir(error);
                })
        },
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                twitter: null,
            }
        },
        components: {
            'layout': Layout
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
