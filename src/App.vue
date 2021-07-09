<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {}
  // 根据页面窗口的大小来改变字体大小，最大值为 50px
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
  })
</script>

<style lang="scss" scoped>
  #app {
    /*占满全屏*/
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
