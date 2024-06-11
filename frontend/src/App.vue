<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
export default {
  name: 'App',
}
</script>
  <div class="flex">
    <Sidebar></Sidebar>
    <router-view></router-view>
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
</style>