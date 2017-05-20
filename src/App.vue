<template>
    <div id="app">
        <h1>Trivial Tracker</h1>
        <h2>Get it wrong and go for a walk <sup>or else...</sup></h2>
        <location></location>
    </div>
</template>

<script>
    import Location from './Location.vue';
    export default {
        name: 'app',
        components: {
            'location': Location
        },
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
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
