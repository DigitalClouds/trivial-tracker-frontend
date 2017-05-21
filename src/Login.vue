<template>
    <div id="login">
        <layout></layout>
        <p>
            Login to your Twitter account (so we can tell everyone you if you get a question wrong and don't reach the destination in time)</p>
        <button v-on:click="doTwitterLogin">Allow</button>
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

        },
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                twitter: null,
            }
        },
        methods: {
            doTwitterLogin(){
                OAuth.redirect('twitter', `${location.origin}/#/question/`);
            }
        },
        components: {
            'layout': Layout
        }
    }
</script>

<style lang="scss">
    #login {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;;
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
