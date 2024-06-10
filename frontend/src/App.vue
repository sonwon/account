<template lang="">
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from './components/sidebar/Sidebar.vue';

export default {
  name : 'App',
  components : {
    Sidebar
  }
}
</script>
<style lang="">
  
</style>