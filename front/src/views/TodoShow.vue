<template>
  <div>
    <h3 class="sub-title">
      {{ task.text }}
    </h3>
    <button class="delete-button" @click="deleteTask(task.id)">削除</button>
    <div>
      <router-link to="/" class="todolist-link">Todo一覧</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const hostName = 'localhost:3000';
const path = '/api/tasks'

export default {
  props: ["id"],
  data() {
    return {
      task: []
    }
  },
  methods: {
    getTask: function(){
      axios.get(`http://${hostName}${path}/${this.$route.params.id}`)
      .then((response) => {
        this.task = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    deleteTask: function(task_id){
      var result = window.confirm("本当に削除しますか？");
      if (result) {
        axios.delete(`http://${hostName}${path}/${task_id}`)
        .then(() => {
          this.$router.push({ 
            name: "Home"
          })
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    }
  },
  mounted: function() {
    this.getTask();
  }
}
</script>

<style scoped>
.sub-title{
  font-size: 2rem;
}

.todolist-link {
  font-size: 1.2rem;
}
</style>