<template>
  <div id="app">
    <form v-on:submit.prevent="postTask" class="input-todo">
      <input id="new-task-form" type="text" v-model="newTask" placeholder="Todoを入力してね！">
    </form>
    <ul id="task-list">
      <li class="task" v-for="(task, i) in tasks" :key="i">
        <p>{{ i + 1 }} {{ task.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

const hostName = 'localhost:3000';
const path = '/api/tasks'

export default {
  name: 'app',
  data () {
    return {
      tasks: [],
      newTask: ''
    }
  },
  methods: {
    getTasks: function() {
      axios.get(`http://${hostName}${path}`)
        .then((response) => {
          this.tasks = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postTask: function() {
      axios.post(`http://${hostName}${path}`,
        `task[text]=${this.newTask}`
      )
      .then(() => {
        this.getTasks();
        this.newTask = '';
      })
      .catch(function(error) {
        console.log(error);
      });
    },
  },
  mounted: function() {
    this.getTasks();
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

.task {
  text-align: left;
}

.input-todo{
  text-align: left;
}

.input-todo input{
  width: 300px;
  height: 30px;
  font-size: 20px;
}

li {
  list-style: none;
}

</style>
