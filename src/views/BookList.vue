<template>
  <div class="body">
    <div id="logo">
        <img alt="logo" src="@assets/logo.png"/>
    </div>
    <div class="page-home">
        <div class="main">
            <ul class="book-list">
                <li class="item" v-for="book in books" :key="book.id">
                    <div id="book">
                        <div class="book-img">
                            <router-link class="link" :to="'/books/' + book.id" :title="book.name">
                            <!-- <a class="remove" href="#" @click.stop.prevent="download(book)">下载</a> -->
                            <img class="cover" :src="book.cover" v-if="book.cover" />
                            <div class="cover-text" v-if="!book.cover">没有封面</div>
                            </router-link>
                         </div >
                        <div class="name">{{ book.name }}</div>
                    <!--<a class="remove" href="#" @click.stop.prevent="remove(book)">删除</a>-->
                    <!-- <div class="author">{{ book.author }}</div> -->
                    </div>
                </li>
            </ul>
            <!--
            <div class="empty-box" v-if="!books.length">
                <img src="/static/img/empty.svg"/>
                <div class="text">暂无书籍，你可以添加右上角的“+”添加书籍</div>
            </div>
            <ui-raised-button class="file-btn" label="从文件中导入" style="display: none">
                <input type="file" id="file" class="ui-file-button" @change="fileChange($event, 1)">
            </ui-raised-button>
            -->
        </div>
    </div>
  </div>
</template>

<script>
  /** 
   * 书架页面
   * created 20200701 by sunnnychan@gmail.com
   */
    import BooksData from '../../data/books.json'
    export default {
        data () {
            return {
                reader: '',
                title: 'epub 阅读器',
                books: '',
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                //console.log(BooksData)
                // for (var bookItem in BooksData) {
                //    Vue.set(BooksData[bookItem], "cover", url)
                //    this.books = BooksData;
                // }
                this.books = BooksData;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@assets/scss/var";

    @keyframes rotate {
        to { transform: rotate(360deg); }
    }
    #logo{
        text-align: center;
        background-color: #e0e3eb;
        padding: 0.6em 0;
    }
    .main {
        overflow-y: auto;
        height: auto;
    }
    .book-list{
        @include clearfix;
        max-width: 1000px;
        margin: 0 auto; 
        height: auto;
        .item {
            position: relative;
            float: left;
            width: 143px;
            height: 200px;
            margin-right: 16px;
            margin-top: 50px;
            margin-bottom: 16px;
            background-color: #fff;
            /*background-image: url("/static/img/bg_1.jpg");*/
            box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
            &:hover {
                .remove {
                    display: block;
                }
            }
        }
        .link {
            display: block;
            height: 100%;
            // padding: 16px;
            margin-bottom: 16px;
            color: inherit;
        }
        .name {
            font-size: 15px;
            text-align: center;
        }
        .cover {
            max-width: 100%;
        }
        .cover-text {
            font-size: 15px;
            line-height: 196px;
            text-align: center;
            color: #999;
        }
        .author {
            position: absolute;
            bottom: 16px;
            left: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .remove {
            display: none;
        }
    }
    .empty-box {
        width: 480px;
        margin: 80px auto;
        padding: 32px;
        text-align: center;
        background-color: #fff;
        box-shadow: 0 0.5px 1px 0 rgba(0, 0, 0, .12);
        img {
            margin-bottom: 16px;
            width: 100px;
            animation: rotate 5s infinite linear;
        }
        .text {
            color: #999;
        }
    }
</style>
