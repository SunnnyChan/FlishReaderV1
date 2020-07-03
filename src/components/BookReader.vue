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
      <div id="bookView" class="bookView" ref="ct"></div>
    </div>
    <!-- Keypress （vue-keypress 项目）是一个 处理按键事件的库，使用简单，
    最后我采用了document.addEventListener，主要是应为出现了有些情况下不能响应事件的现象，
    开始我怀疑是库的问题，但是实际并不是，主要问题是，一些场景下，事件被提前拦截了
    <Keypress key-event="keydown" :key-code="39" @success="nextPage" />
    <Keypress key-event="keydown" :key-code="37" @success="prevPage" />
    <Keypress key-event="keydown" :key-code="40" @success="nextPage" />
    <Keypress key-event="keydown" :key-code="38" @success="prevPage" />
    -->
  </div>
</template>

<script>
  /** 
   * 阅读页面 
   * created 20200701 by sunnnychan@gmail.com
   */
  import BooksData from '../../data/books.json'
  import Epub from 'epubjs'
  global.ePub = Epub

  export default {
    //components: {
    //  Keypress: () => import('vue-keypress')
    //},
    data () {
      return {
        content: [
        ]
      }
    },
    // created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
    created(){
      //添加监听按键事件
      document.addEventListener("keydown", this.turnPage);
    },
    //mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    mounted() {
      this.showEpub()
    },
    destroyed() {
      //var _this = this;
      //移除监听按键事件
      document.removeEventListener("keydown", this.turnPage);
    },
    methods: {
      // 电子书的解析和渲染
      showEpub() {
        // 读取 Get 参数
        var bookId = this.$route.params.id
        // 查找书籍的路径，加载
        // 因为路径的问题，大概花费了三天事件，也是因为对前端技术不熟悉
        // 这里 Epub 创建对象的时候需要传入一个 书籍文件的路径，可以是一个本地相对路径，或者是一个 URL
        // 但是实际上这个 ”本地相对路径“ ，Epub的处理也是通过 http方式访问的，只不过默认是使用本机作为host去访问，
        // vue-cli 2 会默认配置一个本地的静态服务器，而我直接使用的当前最新的 vue-cli 4，需要自己配置一个静态服务器
        // 还是要根据代码一步一步的去调试，而不是猜测，或给问题设置前提，虽然花了三天时间，但是这个过程让我学会了前端脚本的调试，收获还是挺大的
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
        // 下面这个字体的效果看着舒服
        this.rendition.themes.override("font-family", "Consolas, FangSong, Lantinghei SC, Helvetica Neue, Helvetica, Arial, Microsoft YaHei, STHeitiSC-Light, simsun, WenQuanYi Zen Hei, WenQuanYi Micro Hei");
        //this.book.ready.then(() => {
          // 生成目录
          //this.navigation = this.book.navigation;
          // 生成Locations对象
          //return this.book.locations.generate();
        //})

        // 生成目录
        // 以下的处理方式，只处理了两级目录，这样做简单，效果也还行，先这么用着
        this.book.loaded.navigation.then((toc) =>  {
          // console.log(toc)
          var tocNew = [];
          // 先把目录整理成 一维
          toc.forEach((chapter) => {
              // console.log(chapter)
              tocNew.push(chapter)
              if (chapter.subitems && chapter.subitems.length > 0) {
                tocNew = tocNew.concat(chapter.subitems)
              }
          })
          // 逐条处理目录项
          tocNew.forEach((chapter) => {
              var entry = {
                "id" : "toc-" + chapter.id,
                "textContent" : chapter.label,
                "url" : chapter.href
              }
              this.content.push(entry)
          })
        })
        // 为什么这里要设置 rendition 监听事件？
        // 因为，在created中设置了 document 监听事件，但是我发现在 foucs（点击） 到书页时，键盘事件会失效
        // 是因为，rendition 在 document 之前捕获了事件
        this.rendition.on('keydown', this.turnPage)
      },
      // 根据事件来跳转书页
      turnPage(e) {
        var keyNum = window.event ? e.keyCode : e.which; //获取被按下的键值
        if (keyNum == 39) {
          this.nextPage()
        } else if (keyNum == 37){
          this.prevPage()
        }
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
      // 根据 epub 的 Url 来处理跳转书页
      // 主要用在 点击目录
      pageOn(url) {
        this.rendition.display(url)
      }
    },
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
