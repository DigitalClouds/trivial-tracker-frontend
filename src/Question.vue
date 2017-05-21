<template>
    <div id="question">
        <layout></layout>
        <div v-if="question === undefined">
            <form>
                <h1>Category</h1>
                <select id="categorySelect">
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals & Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime & Manga</option>
                    <option value="32">Entertainment: Cartoon & Animations</option>
                </select>

                <h1>Difficulty</h1>
                <select id="difficultySelect">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>

                <div>
                    <br/>
                    <button v-on:click="getQuestion">Get Question</button>
                </div>
            </form>
        </div>
        <div v-else>
            {{ question }}

            <br/>
            <p v-for="answer in answers">
                <button v-on:click="sendAnswer">{{ answer }}</button>
            </p>
        </div>
    </div>
</template>

<script>
    import Layout from "./Layout.vue";
    import {OAuth} from 'oauthio-web';


    export default {
        components: {
            Layout
        },
        created(){
            OAuth.callback('twitter').done((twitter) => {
                debugger;
                console.dir(twitter);
            });
        },
        name: 'Question',
        data () {
            return {
                question: undefined,
                answers: [],
                correctAnswer: undefined
            }
        },
        methods: {
            getQuestion (e) {

                const XHR = new XMLHttpRequest();
                XHR.addEventListener('load', function(event)
                {
                    const response = JSON.parse(event.currentTarget.response);

                    if (response.results)
                    {
                        const result = response.results[0];
                        this.question = decodeURIComponent(result.question);
                        this.answers = result.incorrect_answers.map(e=> decodeURIComponent(e));
                        this.correctAnswer = decodeURIComponent(result.correct_answer);
                        this.answers.splice(Math.floor(Math.random() * (this.answers.length + 1)), 0, this.correctAnswer);
                    }
                    else
                    {
                        alert("No question available");
                    }
                }.bind(this));

                XHR.addEventListener('error', function(event)
                {
                    alert('fail');
                });

                const category   = document.getElementById("categorySelect").value;
                const difficulty = document.getElementById("difficultySelect").value.toLowerCase();
                XHR.open('POST', `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`);
                XHR.send();

                e.preventDefault(); // Stop page refresh
            },

            sendAnswer (e) {
                if (e.currentTarget.innerText == this.correctAnswer)
                {
                    // Correct
                }
                else
                {
                    // Wrong
                    this.$router.push({name: 'location', params: {randomLocationRadius: 1000}});
                }
            }
        }
    }


</script>

<style lang="scss">
    #question {
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
