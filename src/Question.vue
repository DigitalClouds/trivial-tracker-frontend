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

            <div id="green-banner">
                <div id="success">SUCCESS</div>
                <div id="safe">Your followers won't know you're dumb......</div>
                <div id="fornow">for now.</div>
            </div>
        </div>
        <div id="score">SCORE:<br>{{score}}</div>
    </div>
</template>

<script>
    import Layout from "./Layout.vue";

    export default {
        components: {
            Layout},
        name: 'Question',
        data () {
            return {
                question: undefined,
                score: 0,
                answers: [],
                correctAnswer: undefined,
                points: {
                    easy: 1,
                    medium: 2,
                    hard: 3
                },
                currentDifficulty: undefined
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
                        console.log(result);
                        this.question = decodeURIComponent(result.question);
                        this.answers = result.incorrect_answers.map(e=> decodeURIComponent(e));
                        this.correctAnswer = decodeURIComponent(result.correct_answer);
                        this.answers.splice(Math.floor(Math.random() * (this.answers.length + 1)), 0, this.correctAnswer);
                        this.currentDifficulty = result.difficulty;
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
                    document.getElementById("green-banner").classList.add('load');
                    document.getElementById("success").classList.add('load');
                    setTimeout(() => {document.getElementById("safe").classList.add('load')}, 1250);
                    setTimeout(() => {document.getElementById("fornow").classList.add('load')}, 2500);
                    setTimeout(function(){
                        this.question = undefined; this.score+=this.points[this.currentDifficulty];
                    }.bind(this), 4000);
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

    #green-banner {
        opacity: 0;
        height: auto;
        width: 100%;
        position: absolute;
        background-color: forestgreen;
        margin-top: 25px;
        padding-bottom: 25px;
        text-align: center;

        -webkit-transition: opacity 0.25s ease-in;
        -moz-transition: opacity 0.25s ease-in;
        -ms-transition: opacity 0.25s ease-in;
        -o-transition: opacity 0.25s ease-in;
        transition: opacity 0.25s ease-in;

        &.load {
            opacity: 1;
        }
    }

    #success {
        opacity: 0;
        font-size: 50px;
        color: white;
        margin-top: 25px;
        text-align: center;
        line-height: 100%;

        -webkit-transition: opacity 0.25s ease-in;
        -moz-transition: opacity 0.25s ease-in;
        -ms-transition: opacity 0.25s ease-in;
        -o-transition: opacity 0.25s ease-in;
        transition: opacity 0.25s ease-in;

        &.load {
            opacity: 1;
        }
    }

    #safe {
        opacity: 0;
        font-size: 30px;
        color: white;
        text-align: center;

        -webkit-transition: opacity 0.25s ease-in;
        -moz-transition: opacity 0.25s ease-in;
        -ms-transition: opacity 0.25s ease-in;
        -o-transition: opacity 0.25s ease-in;
        transition: opacity 0.25s ease-in;

        &.load {
            opacity: 1;
        }
    }

    #fornow {
        opacity: 0;
        font-size: 30px;
        color: white;
        text-align: center;

        -webkit-transition: opacity 0.25s ease-in;
        -moz-transition: opacity 0.25s ease-in;
        -ms-transition: opacity 0.25s ease-in;
        -o-transition: opacity 0.25s ease-in;
        transition: opacity 0.25s ease-in;

        &.load {
            opacity: 1;
        }
    }

    #score {
        background-color: black;
        color: orange;
        width: auto;
        height: auto;
        padding: 0px 20px 0px 20px;
        font-size: 2em;
        position: absolute;
        margin-right: 2%;
        margin-top: 2%;
        right: 0;
        top: 0;
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
