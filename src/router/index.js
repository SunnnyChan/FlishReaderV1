import Vue from 'vue'
import Router from 'vue-router'
import Shelf from '@components/Shelf'
//import BookList from '@components/BookList'
import BookReader from '@components/BookReader'

import Error404 from '@views/error/Error404'

Vue.use(Router)

let routes = [
  {
    path: '/',
    component: Shelf
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
  routes: routes,
})