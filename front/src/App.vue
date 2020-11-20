<template>
  <div id="app">
    <Header></Header>
    <div class="inner-block">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header
  },
  styleResources: {
    css: [
      '@/assets/reset.css'
    ]
  }
}
</script>

<style scoped>
.inner-block{
  width: 90%;
  margin: 20px auto;
}
</style>