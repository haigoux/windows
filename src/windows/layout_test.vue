<script setup>

</script>

<template>
<div class="layout">
    <div class="sidebar">
        <button>
            Button
        </button>
        <button>
            Another Button
        </button>
        <button>
            More Buttons
        </button>
    </div>
    <div class="content">
        <h1>Layout Test Application</h1>
        <p>This is a test application to check the layout of windows.</p>
        <p>Resize the window to see how the content adjusts.</p>
        <p>Try adding more components to see how they behave in this layout.</p>
    </div>
</div>
</template>

<script>
export default {
  props: {
    
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
}
</script>

<style lang='scss' scoped>
.layout {
  display: flex;
  height: 100%;

  .sidebar {
    width: 200px;
    background-color: #f0f0f0;
    padding: 10px;

    button {
      display: block;
      width: 100%;
      margin-bottom: 10px;
    }
  }

  .content {
    flex: 1;
    padding: 10px;
    h1{
        margin: 0
    }
  }
}
</style>