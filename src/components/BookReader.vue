<template>
  <div class="main" >
    <div class="logo">
      <div class="logo-img" >
        <a href='/'>
          <img alt="logo" src="@assets/logo.png"/>
        </a>
      </div>
    </div>
    <div class="ebook" >
      <div class="read-wrapper" >
        <div id="read" align="center"></div>
      </div>
    </div>
    <Keypress key-event="keydown" :key-code="39" @success="nextPage" />
    <Keypress key-event="keydown" :key-code="37" @success="prevPage" />
    <Keypress key-event="keydown" :key-code="40" @success="nextPage" />
    <Keypress key-event="keydown" :key-code="38" @success="prevPage" />
  </div>
</template>

<script>
  import BooksData from '../../data/books.json'
  import Epub from 'epubjs'
  global.ePub = Epub

  export default {
    components: {
      Keypress: () => import('vue-keypress')
    },
    methods: {
      // 电子书的解析和渲染
      showEpub() {
        var bookId = this.$route.params.id
        console.log(bookId)
        for (var bookIndex in BooksData) {
          if (BooksData[bookIndex].id == bookId) {
            this.book = new Epub(BooksData[bookIndex].path)
          }
        }
        this.rendition = this.book.renderTo("read", {
          //ignoreClass: "annotator-hl",
          width: window.innerWidth / 4 * 3,
          height: window.innerHeight / 5 * 4,
          // 兼容iOS
          method: 'default'
        });

        this.displayed = this.rendition.display();

        //this.rendition.themes.fontSize("100%");
        this.rendition.themes.override("font-family", "courier");

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

.logo {
     .logo-img {
      position: relative;
      margin-top: 100;
      left: 111;
     }
  }

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
