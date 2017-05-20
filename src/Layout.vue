<template>
    <div id="layout">
        <h1>Trek or Tweet</h1>
        <h2>Get it wrong and go for a walk <sup>or else...</sup></h2>
    </div>
</template>

<script>

    export default {
        name: 'layout',
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss">
    #layout {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        height:100%;
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