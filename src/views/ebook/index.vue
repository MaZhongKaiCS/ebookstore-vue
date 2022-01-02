<template>
  <div class="ebook">
    <!--组件的引用：3、在组件中使用引入的 xxx 组件，不能使用驼峰命名法，使用短横线分隔命名法-->
    <!--电子书的标题-->
    <ebook-title></ebook-title>
    <!--电子书的入口标签ebook-reader-->
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
    <ebook-bookmark></ebook-bookmark>
  </div>
</template>

<script>
// 组件的引用：1、引入 xxx 组件
import EbookReader from '../../components/ebook/EbookReader';
import EbookTitle from '../../components/ebook/EbookTitle';
import EbookMenu from '../../components/ebook/EbookMenu';
import EbookBookmark from '../../components/ebook/EbookBookmark';
import { getReadTime, saveReadTime } from '../../utils/localStorage';
import { ebookMixin } from '../../utils/mixin';
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    mixins: [ebookMixin],
    // 组件的引用：2、在 components 中局部注册
    EbookReader,
    EbookTitle,
    EbookMenu,
    EbookBookmark
  },
  watch: {
    // 监听用户下拉屏幕时滚动条的y轴数值
    offsetY(v) {
      // 判断如果菜单栏没有处于显示状态（如果菜单栏显示，优先响应菜单栏事件）
      // 并且电子书已经解析完毕（未解析完毕时无法获取currentLocation）
      if (!this.menuVisible && this.bookAvailable) {
        if (v > 0) {
          // 向下拉动屏幕时，调用move方法
          this.move(v);
        } else if (v === 0) {
          // y轴为0时，调用restore方法让屏幕回弹，松手时屏幕是无法自动回弹的，必须自己实现
          this.restore();
        }
      }
    }
  },
  methods: {
    restore() {
      // 将组件还原回原位
      this.$refs.ebook.style.top = 0;
      // 设置过渡动画，产生回弹效果
      this.$refs.ebook.style.transition = 'all .2s linear';
      setTimeout(() => {
        // 200毫秒动画结束后，将过渡动画关闭，否则在下拉时也会产生过渡动画
        this.$refs.ebook.style.transition = '';
      }, 200);
    },
    move(v) {
      // 向下拉动屏幕时，组件随之移动
      this.$refs.ebook.style.top = v + 'px';
    },
    startLoopReadTime() {
      // 获取阅读时间
      let readTime = getReadTime(this.fileName);
      if (!readTime) {
        // 如果阅读时间不存在，则进行重置
        readTime = 0;
      }
      // 开启定时任务，每秒更新一次阅读时间，每30秒记录一次阅读时间
      this.task = setInterval(() => {
        readTime++;
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime);
        }
      }, 1000);
    }
  },
  mounted() {
    // 开启记录阅读时间的定时任务
    this.startLoopReadTime();
  },
  beforeDestroy() {
    if (this.task) {
      // 关闭定时任务
      clearInterval(this.task);
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.ebook {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
