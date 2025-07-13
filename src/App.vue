<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Window from './components/Window.vue';
</script>

<template>
  <div class="desktop-container">
    <Window title="My Window">
  
    </Window>
  </div>

</template>

<style scoped lang="scss">
.desktop-container {
  width: 100%;
  height: 100%;
  // background-color: #f0f0f0;
  background: linear-gradient(0deg, #222222, #000000);
  position: relative;
  // padding: 20px;
}
</style>
