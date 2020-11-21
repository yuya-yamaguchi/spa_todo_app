<template>
  <div>
    <div v-if="updateFlg">
      <div>
        <input id="update-task-form" type="text" v-model="updateTaskText" placeholder="Todoを入力してね！">
      </div>
      <button class="cancel-button" @click="cancelTask()">キャンセル</button>
      <button class="update-button" @click="updateTask()">変更</button>
    </div>
    <div v-else>
      <h3 class="sub-title">
        {{ task.text }}
      </h3>
      <button class="change-button" @click="changeTask()">変更</button>
      <button class="delete-button" @click="deleteTask()">削除</button>
    </div>
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
      updateFlg: false,
      task: [],
      updateTaskText: ""
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
    deleteTask: function(){
      var result = window.confirm("削除しますか？");
      if (result) {
        axios.delete(`http://${hostName}${path}/${this.task.id}`)
        .then(() => {
          this.$router.push({ 
            name: "Home"
          })
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    },
    changeTask: function() {
      this.updateFlg = true
      this.updateTaskText = this.task.text
    },
    cancelTask: function() {
      this.updateFlg = false
    },
    updateTask: function() {
      if (this.updateTaskText != "") {
        axios.put(`http://${hostName}${path}/${this.task.id}`,
          `task[text]=${this.updateTaskText}`
        )
        .then(() => {
          this.updateFlg = false
          this.getTask();
        })
        .catch(function(error) {
          console.log(error);
        });
      }
      else {
        this.deleteTask();
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