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
        <div id="tocView" class="view" style="margin: 0;text-indent: 15px;"></div>
    </div>
    <div id="main" class="closed">
      <div id="titlebar">
          <!--
          <div id="opener">
            <a id="slider" class="icon-right">Menu</a>
          </div>
          
          <div id="metainfo">
            <span id="book-title"></span>
            <span id="title-seperator" style="display: inline;">&nbsp;&nbsp;–&nbsp;&nbsp;</span>
            <span id="chapter-title"></span>
          </div>
          <div id="title-controls">
            <a id="bookmark" class="icon-bookmark-empty">Bookmark</a>
            <a id="setting" class="icon-cog">Settings</a>
            <a id="fullscreen" class="icon-resize-full">Fullscreen</a>
          -->
        </div>
        <div id="view"></div>
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
        for (var bookIndex in BooksData) {
          if (BooksData[bookIndex].id == bookId) {
            this.book = new Epub(BooksData[bookIndex].path)
          }
        }
        this.rendition = this.book.renderTo("view", {
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
        this.rendition.themes.override("font-family", "courier");
        this.book.ready.then(() => {
          // 生成目录
          this.navigation = this.book.navigation;
          // 生成Locations对象
          return this.book.locations.generate();
        })
        // 生成目录
        this.book.loaded.navigation.then(function(toc) {
            var list = document.getElementById("tocView"),
                docfrag = document.createDocumentFragment();
          
            var generateTocItems = function(toc, level) {
              var container = document.createElement("ul");
              container.setAttribute("style", "")
              if(!level) level = 1;
          
              toc.forEach(function(chapter) {
                var listitem = document.createElement("li");
                var link = document.createElement("a");
                var toggle = document.createElement("a");
                var subitems;
                listitem.id = "toc-" + chapter.id;
                listitem.classList.add('list_item');
                link.textContent = chapter.label;
                listitem.setAttribute("style", "padding: 7px 0");
                //link.href = chapter.href;
                link.setAttribute("style", "font-size:14px; text-decoration:none; color:rgb(107, 100, 100)");
                // 注册点击事件
                link.classList.add('toc_link');
                listitem.appendChild(link);
                if (chapter.subitems && chapter.subitems.length > 0) {
                  level++;
                  subitems = generateTocItems(chapter.subitems, level);
                  toggle.classList.add('toc_toggle');
                  listitem.insertBefore(toggle, link);
                  listitem.appendChild(subitems);
                }
                container.appendChild(listitem);
              });
              return container;
            }

            var tocitems = generateTocItems(toc);
            docfrag.appendChild(tocitems);
            list.append(docfrag);
            list.find(".toc_link").on("click", function(event){
              var url = this.getAttribute('href');
              event.preventDefault();
              //-- Provide the Book with the url to show
              //   The Url must be found in the books manifest
              this.rendition.display(url);
              list.find(".currentChapter").addClass("openChapter").removeClass("currentChapter");
              this.parent('li').addClass("currentChapter");
            })
            
            /*
            list.find(".toc_toggle").on("click", function(event){
              var $el = this.parent('li'),
              open = $el.hasClass("openChapter");
              event.preventDefault();
              if(open){
                $el.removeClass("openChapter");
              } else {
                $el.addClass("openChapter");
              }
            })
            */
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
      pageOn() {
        this.rendition.display("OEBPS/Text/part0013.xhtml#ebookNote2")
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
