<!--用于接收动态路由的组件-->
<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  // 使用 mapGetters 来快速调用 vuex 中的对象
  // import { mapGetters } from 'vuex'
  // 引入 mixin.js 来代替 mapGetter mapActions（mixin.js 集中管理 mapGetters）
  import { ebookMixin } from '../../utils/mixin'
  // 使用 mapActions 原理跟 mapGetters 差不多，mapActions是引入定义在vuex 中 actios 或者是独立出来的 actions.js 中的方法
  // 还是跟 mapGetters 一样，放入到 mixin.js 中集中管理
  // import { mapActions } from 'vuex'
  // 引入本次项目的核心 Epubjs
  import Epub from 'epubjs'
  // 引入 book.js 中的 addCss 方法来帮助改变全局样式 initGlobalStyle(),由于需要在多个组件中使用，所以后期移入 mixin.js 中
  // import { addCss } from '../../utils/book';
  // 有关本地缓存的文件
  import {
    getFontFamily,
    getFontSize, getLocation, getTheme,
    saveFontFamily,
    saveFontSize, saveTheme
  } from '../../utils/localStorage';
  global.ePub = Epub
  export default {
    // 使用 mixins 方法来引用引入进来的 mixin.js 中的自定义对象
    mixins: [ebookMixin],
    methods: {
      // 使用 mapActions 来引入 actios.js 中的方法, 引入之后就可以直接使用 this.xx() 来使用xx方法
      // 还是跟 mapGetters 一样，放入到 mixin.js 中集中管理
      // ...mapActions(['setMenuVisible']),
      // 向前翻页事件
      prevPage() {
      //  首先判断电子书是否存在，然后再执行
        if (this.rendition) {
          this.rendition.prev().then(() => {
            this.refreshLocation()
          })
          // 引用 hideTitleAndMenu 方法来实现翻页隐藏菜单栏
          this.hideTitleAndMenu()
        }
      },
      // 向后翻页事件
      nextPage() {
        if (this.rendition) {
          this.rendition.next().then(() => {
            this.refreshLocation()
          })
          this.hideTitleAndMenu()
        }
      },
      // 弹出菜单栏事件事件,通过 $store.dispatch 来调用在vuex 中定义的方法 setMenuVisible，后面引入了 mapActions 来引入方法，使用方法更加便捷。
      // 将 actions 独立出来形成 actions.js 文件，使用 mixin.js 文件进行集中引入，最后引入 mixin.js 即可
      toggleTitleAndMenu() {
        this.setMenuVisible(!this.menuVisible)
        // 在 toggleTitleAndMenu 事件触发时，如果 menu 弹出，则字体 SettingFont 不展示，直到点击触发 SetSettingVisible事件才弹出字号设置窗口
        if (this.menuVisible) {
          this.setSettingVisible(-1)
        }
        this.setFontFamilyVisible(false)
      },
      hideTitleAndMenu() {
        this.setMenuVisible(false)
        // 需求：隐藏菜单栏时，也同时收起 调节字号的菜单（EbookSettingFont）
        this.setSettingVisible(-1)
        // 需求：隐藏菜单栏时，也同时收起  font-family 弹出层
        this.setFontFamilyVisible(false)
      },
      // 缓存的思路：在 localStorage.js 中定义 get 和 save 方法，先获取页面中的xxx，判断是否含有 xxx，如果没有，则获取 xxx 并保存 save（xxx），如果有，则改变页面的 xxx 属性，并且设置为默认为了缓存
      // 缓存字号大小的方法，在 initEpub 方法中渲染出电子书后进行引用,
      initFontSize() {
        const fontSize = getFontSize(this.fileName)
        if (!fontSize) {
          saveFontSize(this.fileName, this.defaultFontSize)
        } else {
          this.rendition.themes.fontSize(fontSize)
          this.setDefaultFontSize(fontSize)
        }
      },
      // 缓存字体风格的方法，在 initEpub 方法中渲染出电子书后进行引用
      initFontFamily() {
        const fontFamily = getFontFamily(this.fileName)
        if (!fontFamily) {
          saveFontFamily(this.fileName, this.defaultFontFamily)
        } else {
          this.rendition.themes.font(fontFamily)
          this.setDefaultFontFamily(fontFamily)
        }
      },
      // 缓存主题的方法，在 initEpub 方法中渲染出电子书后进行引用
      initTheme() {
          let defaultTheme = getTheme(this.fileName)
          if (!defaultTheme) {
            defaultTheme = this.themeList[0].name
            saveTheme(this.fileName, defaultTheme)
          }
          this.setDefaultTheme(defaultTheme)
          this.themeList.forEach(theme => {
            this.rendition.themes.register(theme.name, theme.style)
          })
          this.rendition.themes.select(defaultTheme)
      },
      // 渲染电子书的方法
      initRendition() {
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          //  加入微信的兼容性配置
          // 由于部分的浏览器无法显示 把 epubjs 的版本改为0.3.71   cnpm i epubjs@0.3.71
          method: 'default'
        })
        // 渲染电子书,并且添加一次初始化的渲染，记录下初始化的默认字体\字号\主题
        const location = getLocation(this.fileName)
        this.display(location, () => {
          this.initTheme()
          this.initFontFamily()
          this.initFontSize()
          this.initGlobalStyle()
        })
        this.rendition.hooks.content.register(contents => {
          Promise.all([
            // 当加入来自.env.development 文件中的VUE_APP_RES_URL后，需要将整个程序重新加载一遍才能够看到效果
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
          ]).then(() => {})
        })
      },
      // 手势方法
      initGesture() {
        // 给电子书绑定屏幕的手势事件 touchstart ：触摸屏幕事件  touchend：离开屏幕事件
        // 事件内部有属性可以操作，其中是 timeStamp可以用于认定长按属于无效操作，changedTouches 里面的第一个属性为 判断几根手指的操作，
        // 第一个属性内部的 clientX 为水平方向的移动（根据变化来判断向左还是向右划动）
        this.rendition.on('touchstart', event => {
          this.touchstartX = event.changedTouches[0].clientX
          this.touchstartTime = event.timeStamp
        })
        this.rendition.on('touchend', event => {
          const offsetX = event.changedTouches[0].clientX - this.touchstartX
          const time = event.timeStamp - this.touchstartTime
          // console.log(offsetX, time);
          // 需求：手指操作的事件不能大于 500 毫秒，划动的距离要大于 40
          if (time < 500 && offsetX > 40) {
            this.prevPage()
          } else if (time < 500 && offsetX < -40) {
            this.nextPage()
          } else {
            this.toggleTitleAndMenu()
          }
          // 禁止事件的默认方法调用和传播
          if (event.preventDefault) {
            event.preventDefault()
          }
          event.stopPropagation()
        })
      },
      initEpub() {
        // 坑：之前设置 Nginx 时设置端口号为 8081
        const url = process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
        // console.log(url);
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.initRendition()
        this.initGesture()
        // 在电子书全部解析之后调用 ready
        this.book.ready.then(() => {
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
          }).then(locations => {
          this.setBookAvailable(true)
          this.refreshLocation()
        })
      }
    },
    // 使用生命周期函数中的 mounted 方法来获取动态路由
    mounted() {
      // const fileName = this.$route.params.fileName
      // console.log(fileName);
      // split 方法：以 xxx 为界限划分获取的结果
      // join 方法：以 xxx 将获取的结果合并在一起
      // const baseUrl = 'http://192.168.31.133:8081/epub/'
      // const fileName = this.$route.params.fileName.split('|').join('/')
      this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
        this.initEpub()
      })
    }
  }
</script>

<style scoped>

</style>
