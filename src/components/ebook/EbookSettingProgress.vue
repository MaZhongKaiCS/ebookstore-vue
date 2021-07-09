<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress" >
        <div class="read-time-wrapper">
          <span class="read-time-text">222</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="prefSection()">
            <div class="icon-back"></div>
          </div>
          <input class="progress" type="range"
                 max="100"
                 min="0"
                 step="1"
                 @change="onProgressChange($event.target.value)" @input="onProgressInput($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 :style="{'background-size': `${progress}% 100% !important`}"
                 ref="progress">
          <!--input中的:style将改变进度条的颜色变化，一开始是使用 ref 来在方法中操作背景颜色，现在是直接添加样式-->
          <div class="progress-icon-wrapper" @click="nextSection()">
            <div class="icon-forward"></div>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    import { ebookMixin } from '../../utils/mixin';

    export default {
        mixins: [ebookMixin],
        name: 'EbookSettingProgress',
        computed: {
          getSectionName() {
            if (this.section) {
              const sectionInfo = this.currentBook.section(this.section)
              if (sectionInfo && sectionInfo.href) {
                return this.currentBook.navigation.get(sectionInfo.href).label
              }
            }
            return ''
          }
        },
        methods: {
          onProgressChange(process) {
            this.setProgress(process).then(() => {
              this.displayProgress()
            })
          },
          // progress 百分比显示(功能：随着拖动，数据也实时发生改变)
          onProgressInput(process) {
            this.setProgress(process)
          },
          // 功能：随着进度条的改变(拖动)，书本渲染也跟着改变到指定百分比的页面
          displayProgress() {
            const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
            this.display(cfi)
          },
          // 封装渲染跳转章节的方法，在 prefSection 和 nextSection方法中使用
          displaySection() {
            const sectionInfo = this.currentBook.section(this.section)
            if (sectionInfo && sectionInfo.href) {
              this.display(sectionInfo.href)
            }
          },
          // 功能：跳转到上一章
          prefSection() {
            if (this.section > 0 && this.bookAvailable) {
              this.setSection(this.section - 1).then(() => {
                this.displaySection()
              })
            }
          },
          // 功能：跳转到下一章
          nextSection() {
            if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
              this.setSection(this.section + 1).then(() => {
                this.displaySection()
              })
            }
          }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "src/assets/styles/global";
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 160;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(40);
        font-size: px2rem(12);
        @include center;
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .progress-icon-wrapper {
          font-size: px2rem(20);
        }
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          margin: 0 px2rem(10);
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
            border: px2rem(1) solid #ddd;
          }
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(10);
        width: 100%;
        color: #333;
        font-size: px2rem(12);
        padding: 0 px2rem(15);
        box-sizing: border-box;
        @include center;
        .progress-section-text{
          @include ellipsis;
          }
        }
      }
    }
</style>
