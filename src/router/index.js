import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@views/BookList'
import BookReader from '@components/BookReader'

import Error404 from '@views/error/Error404'

Vue.use(Router)

let routes = [
  {
    path: '/',
    component: BookList
  },
  {
    path: '/books',
    name: 'book list',
    component: BookList
  },
  {
    path: '/books/:id',
    component: BookReader
  },
  {
    path: '*',
    name: 'page not found',
    component: Error404
  }
]

export default new Router({
  mode: 'history',
  routes: routes,
})