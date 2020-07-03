<template>
  <div class="body" >
    <div id="sidebar" class="open">
        <div class="logo">
          <div class="logo-img" >
            <a href='/'>
              <img alt="logo" src="@assets/logo.png"/>
            </a>
          </div>
        </div>
        <div id="tocView" class="view">
          <ul>
            <li v-for="entry in content" :key="entry.id" :id="entry.id" class="list_item">
              <a class="toc_link" href="#" style="font-size:14px; text-decoration:none; color:rgb(107, 100, 100)" v-on:click="pageOn(entry.url)">{{ entry.textContent }}</a>
            </li>
          </ul>
        </div>
    </div>
    <div id="main" class="closed">
      <div id="titlebar">
      </div>
      <div id="bookView" class="bookView"></div>
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
    data () {
      return {
        content: [
        ]
      }
    },
    methods: {
      // 电子书的解析和渲染
      showEpub() {
        var bookId = this.$route.params.id
        for (var bookIndex in BooksData) {
          if (BooksData[bookIndex].id == bookId) {
            this.book = new Epub(BooksData[bookIndex].path)
          }
        }
        this.rendition = this.book.renderTo("bookView", {
          width: window.innerWidth / 5 * 4,
          height: window.innerHeight / 5 * 4,
          // 兼容iOS
          ignoreClass: "annotator-hl",
          //width: "100%",
          //height: "100%",
          method: 'default'
        });
        this.displayed = this.rendition.display();
        //this.rendition.themes.fontSize("100%");
        this.rendition.themes.override("font-family", "Consolas, FangSong, Lantinghei SC, Helvetica Neue, Helvetica, Arial, Microsoft YaHei, STHeitiSC-Light, simsun, WenQuanYi Zen Hei, WenQuanYi Micro Hei");
        this.book.ready.then(() => {
          // 生成目录
          this.navigation = this.book.navigation;
          // 生成Locations对象
          return this.book.locations.generate();
        })

        // 生成目录
        this.book.loaded.navigation.then((toc) =>  {
          console.log(toc)
          var tocNew = [];
          toc.forEach((chapter) => {
              console.log(chapter)
              tocNew.push(chapter)
              if (chapter.subitems && chapter.subitems.length > 0) {
                tocNew = tocNew.concat(chapter.subitems)
              }
          })
          tocNew.forEach((chapter) => {
              var entry = {
                "id" : "toc-" + chapter.id,
                "textContent" : chapter.label,
                "url" : chapter.href
              }
              this.content.push(entry)
          })
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
      pageOn(url) {
        this.rendition.display(url)
      }
    },
    mounted() {
      this.showEpub()
    }
  }
</script>

<style lang='scss' scoped>
@import '@assets/scss/read';
@import '@assets/scss/normalize';
@import '@assets/scss/popup';

.body {
  font-size: 15px;
}
.logo {
  position: relative;
  overflow: hidden;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  top: 0.25rem;
  align-items: center;
  //padding: 1.25rem 1.25rem;
}
</style>
