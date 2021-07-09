<template>
    <div class="ebook">
      <!--组件的引用：3、在组件中使用引入的 xxx 组件，不能使用驼峰命名法，使用短横线分隔命名法-->
      <!--电子书的标题-->
      <ebook-title></ebook-title>
      <!--电子书的入口标签ebook-reader-->
      <ebook-reader></ebook-reader>
      <ebook-menu></ebook-menu>
    </div>
</template>

<script>
  // 组件的引用：1、引入 xxx 组件
  import EbookReader from '../../components/ebook/EbookReader'
  import EbookTitle from '../../components/ebook/EbookTitle'
  import EbookMenu from '../../components/ebook/EbookMenu';
  import { getReadTime, saveReadTime } from '../../utils/localStorage';
    export default {
      components: {
        // 组件的引用：2、在 components 中局部注册
        EbookReader,
        EbookTitle,
        EbookMenu
      },
      methods: {
        startLoopReadTime() {
          let readTime = getReadTime(this.fileName)
          if (!readTime) {
            readTime = 0
          }
          this.task = setInterval(() => {
            readTime++
            if (readTime % 30 === 0) {
              saveReadTime(this.fileName, readTime)
            }
          }, 1000)
        }
      },
      mounted() {
        this.startLoopReadTime()
      },
      beforeDestroy() {
        if (this.task) {
          clearInterval(this.task)
        }
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
</style>
