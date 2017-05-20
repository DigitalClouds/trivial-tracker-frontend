<template>
    <div id="location">
        <div v-if="isReady">
            <div id="map"></div>
            <google-map></google-map>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>

    import env from './env.js';

    import {load as loadGoogleApi, loaded as loadedGoogleApi, Map, Marker} from 'vue-google-maps';

    loadGoogleApi(env.googleMapsApiKey);
    let apiLoaded = false;
    let googleApi;

    loadedGoogleApi.then((api)=> {
        apiLoaded = true;
    });

        export default {
        name: 'location',
        _apiReady: false,
        _api: null,
        _map: null,
        created() {

        },
        data () {
            return {

            }
        },
        props: {
        },
        computed: {
            isReady: () => apiLoaded,
        },
        components: {
            'google-map': Map
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
