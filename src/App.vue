<template>
  <div id="app">
    <div class="flex">
      <Sidebar></Sidebar>
      <div class="view-outer">
      <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/sidebar/Sidebar.vue';

export default {
  name : 'App',
  components:{
    Sidebar
  }
}
</script>
<style>
  .flex{
    /* float:left */
    display: flex;
  }
  .view-outer{
    padding: 150px;
  }
</style>