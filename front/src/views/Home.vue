<template>
  <div class="home">
    <form v-on:submit.prevent="postTask" class="input-todo">
      <input id="new-task-form" type="text" v-model="newTask" placeholder="Todoを入力してね！">
    </form>
    <ul id="task-list">
      <li class="task" v-for="(task, i) in tasks" :key="i">
        <router-link :to="{ name: 'TodoShow', params: { id: task.id }}">
          {{ i + 1 }} {{ task.text }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

const hostName = 'localhost:3000';
const path = '/api/tasks'

export default {
  name: 'Home',
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
    }
  },
  mounted: function() {
    this.getTasks();
  }
}
</script>

<style scoped>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.input-todo {
  text-align: left;
}

.input-todo input {
  width: 300px;
  height: 30px;
  font-size: 20px;
  padding: 5px;
}

.task {
  text-align: left;
  margin: 10px;
}

.task a {
  text-decoration: none;
}

li {
  list-style: none;
}

</style>
