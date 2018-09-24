import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GitHubOAuth from './views/OAuth/Callback/GitHub.vue'

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
      path: '/profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue')
    },
    {
      path: '/oauth/callback/github',
      component: GitHubOAuth
    },
    {
      path: '/admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue')
    }
  ]
})
