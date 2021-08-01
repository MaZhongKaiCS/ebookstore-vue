<template>
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div class="ebook-loading-item" v-for="(item, index) in data" :key="index">
        <div class="ebook-loading-line-wrapper" v-for="(subItem, subIndex) in item" :key="subIndex">
          <div class="ebook-loading-line" ref="line"></div>
          <div class="ebook-loading-mask" ref="mask"></div>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        data: [
          [{}, {}, {}],
          [{}, {}, {}]
        ],
        maskWidth: [
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 }
        ],
        lineWidth: [
          { value: 16 },
          { value: 16 },
          { value: 16 },
          { value: 16 },
          { value: 16 },
          { value: 16 }
        ]
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  @keyframes line{
    0%, 33%{
      flex: 0 0 0;
    }
    66%, 100%{
      flex: 1;
    }
  }
  @keyframes mask{
    0%, 33%{
      flex: 1;
    }
    66%, 100%{
      flex: 0 0 0;
    }
  }
  .ebook-loading {
    position: relative;
    z-index: 400;
    width: px2rem(63);
    height: px2rem(40);
    background: transparent;
    border: px2rem(1.5) solid #d7d7d7;
    border-radius: px2rem(3);
    .ebook-loading-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      .ebook-loading-item {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-around;
        &:nth-child(1){
          .ebook-loading-line-wrapper{
            &:nth-child(1){
              .ebook-loading-mask, .ebook-loading-line{
                animation-delay: -.5s;
              }
            }
            &:nth-child(2){
              .ebook-loading-mask, .ebook-loading-line{
                animation-delay: -.25s;
              }
            }
            &:nth-child(3){
              .ebook-loading-mask, .ebook-loading-line{
                animation-delay: -.1s;
              }
            }
          }
        }
        &:nth-child(2){
          .ebook-loading-line-wrapper{
            &:nth-child(1){
              .ebook-loading-mask, .ebook-loading-line{
                animation-delay: .1s;
              }
            }
            &:nth-child(2){
              .ebook-loading-mask, .ebook-loading-line{
                animation-delay: .2s;
              }
            }
            &:nth-child(3){
              .ebook-loading-mask, .ebook-loading-line{
                animation-delay: .4s;
              }
            }
          }
        }
        .ebook-loading-line-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 px2rem(7);
          box-sizing: border-box;
          .ebook-loading-line {
            animation: line 1s linear infinite;
            height: px2rem(2);
            background: #d7d7d7;
          }
          .ebook-loading-mask {
           animation: mask 1s linear infinite;
            height: px2rem(2);
          }
        }
      }
      .ebook-loading-center {
        position: absolute;
        left: 50%;
        top: 0;
        width: px2rem(1.5);
        height: 100%;
        background: #d7d7d7;
        transform: (0 -50%);
      }
    }
  }
</style>
