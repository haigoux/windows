<script setup>
import { RouterLink, RouterView } from 'vue-router'
import about from './windows/about.vue';
import { windowManager } from './stores/windowmanager';
import Window from './components/Window.vue';
import layout_test from './windows/layout_test.vue';
const wm = windowManager();


</script>

<template>
  <div class="desktop-container" @contextmenu.prevent @mousedown.right.prevent>
    <div class="icon"
      @click="wm.addWindow(about, { title: 'About', size: { width: 400, height: 300 }, position: { x: 100, y: 100 } })">
      <div class="img"></div>
      <span>about</span>
    </div>
    <div class="icon"
      @click="wm.addWindow(layout_test, { title: 'Layout Test Application', size: { width: 400, height: 300 }, position: { x: 100, y: 100 } })">
      <div class="img"></div>
      <span>layout_test</span>
    </div>

    <Window v-for="window in wm.windows" 
      :key="window.id" 
      :title="window.props.title" 
      :id="window.id" 
      :size="window.size"
      :position="window.position"  :active="window.isActive" 
      @contextmenu.prevent
      @mousedown="wm.setActiveWindow(window.id)" 
      @close="wm.closeWindow(window.id)">
      
      <component :is="window.component"></component>
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;


  .icon {
    display: flex;
    width: 100px;
    height: 100px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    .img {
      width: 50px;
      height: 50px;
      background-color: white;
      margin-bottom: 5px;
    }

    span {
      color: white;
      text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

}
</style>
