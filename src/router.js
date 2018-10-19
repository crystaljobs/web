import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/jobs/new',
      name: 'Post a new Job',
      component: () => import(/* webpackChunkName: "jobs-new" */ './views/Jobs/New.vue')
    },
    {
      path: '/jobs/activate',
      name: 'Activate Job',
      component: () => import(/* webpackChunkName: "jobs-activate" */ './views/Jobs/Activate.vue')
    },
    {
      path: '/jobs/edit',
      name: 'Edit Job',
      component: () => import(/* webpackChunkName: "jobs-edit" */ './views/Jobs/Edit.vue')
    }
  ]
})
