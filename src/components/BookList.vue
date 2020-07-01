<template>
    <!-- <my-page class="page-home" :title="title" :page="page"> -->
        <div id="main">
            <ul class="book-list">
                <li class="item" v-for="book in books" :key="book">
                    <router-link class="link" :to="'/books/' + book.id" :title="book.name">
                        <!-- <a class="remove" href="#" @click.stop.prevent="download(book)">下载</a> -->
                        <img class="cover" :src="book.cover" v-if="book.cover" />
                        <div class="cover-text" v-if="!book.cover">没有封面</div>
                    </router-link>
                    <div class="name">{{ book.name }}</div>
                    <!-- <a class="remove" href="#" @click.stop.prevent="remove(book)">删除</a> -->
                    <!-- <div class="author">{{ book.author }}</div> -->
                </li>
            </ul>
            <div class="empty-box" v-if="!books.length">
                <img src="/assets/img/empty.svg"/>
                <div class="text">暂无书籍，你可以添加右上角的“+”添加书籍</div>
            </div>
            <!--
            <ui-raised-button class="file-btn" label="从文件中导入" style="display: none">
                <input type="file" id="file" class="ui-file-button" @change="fileChange($event, 1)">
            </ui-raised-button>
            -->
        </div>
     <!--  </my-page> -->
</template>

<script>
export default {
    data () {
            return {
                reader: null,
                title: 'epub 阅读器',
                books: [
                    {
                        id: '1',
                        name: '呵呵哒',
                        author: '陈建行',
                        content: '123'
                    },
                    {
                        id: '2',
                        name: '致我们即将逝去的青春',
                        author: '陈建行',
                        content: '123'
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'add',
                            //click: this.add,
                            title: '添加本地书籍'
                        },
                        {
                            type: 'icon',
                            icon: 'cloud_download',
                            // click: this.addLink,
                            title: '添加云端书籍'
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=epub',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
    },
    mounted() {
        this.init()
    },
    destroyed() {
    },
    methods: {
        init() {}
    }
}
</script>>

<style lang="scss" scoped>
    @import "@assets/scss/var";

    @keyframes rotate {
        to { transform: rotate(360deg); }
    }

    .book-list{
        @include clearfix;
        .item {
            position: relative;
            float: left;
            width: 140px;
            height: 196px;
            margin-right: 16px;
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
        // .name {
            // font-weight: bold;
        // }
        .cover {
            max-width: 100%;
        }
        .cover-text {
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