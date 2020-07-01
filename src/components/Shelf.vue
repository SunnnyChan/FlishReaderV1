<template>
  <div class="ebook" >
    <div>
        <img id = "logo" alt="logo" src="@assets/logo.png"/>
    </div>
    <div class="read-wrapper" >
      <div id="read" align="center"></div>
    </div>
    <Keypress key-event="keydown" :key-code="39" @success="nextPage" />
    <Keypress key-event="keydown" :key-code="37" @success="prevPage" />
    <Keypress key-event="keydown" :key-code="40" @success="nextPage" />
    <Keypress key-event="keydown" :key-code="38" @success="prevPage" />
  </div>
</template>

<script>
  import Epub from 'epubjs'
  global.ePub = Epub

  export default {
    components: {
      Keypress: () => import('vue-keypress')
    },
    methods: {
      // 电子书的解析和渲染
      showEpub() {
        // 生成Book对象
        this.book = new Epub('/files/硅谷增长黑客实战笔记.epub')
        // this.book = new Epub('https://s3.amazonaws.com/epubjs/books/alice/OPS/package.opf')
        // console.log(this.book)

        this.rendition = this.book.renderTo("read", {
          width: window.innerWidth / 4 * 3,
          height: window.innerHeight / 5 * 4,
          // 兼容iOS
          method: 'default'
        });
        this.displayed = this.rendition.display();

        this.book.ready.then(() => {
          // 生成目录
          this.navigation = this.book.navigation;
          // 生成Locations对象
          return this.book.locations.generate();
        })
      },
      // 上一页
      prevPage() {
        if (this.rendition) {
          this.rendition.prev()
        }
      },
      // 下一页
      nextPage() {
        if (this.rendition) {
          this.rendition.next()
        }
      },
    },
    mounted() {
      this.showEpub()
    }
  }
</script>

<style lang='scss' scoped>
@import '@assets/scss/global';
.ebook {
  position: relative;
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 90%;
      .left {

        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>
