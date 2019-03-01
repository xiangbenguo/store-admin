import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import User from '@/pages/user'
import Order from '@/pages/order'
import Login from '@/pages/login'
import AsideMenu from '../components/asideMenu'
import Property from '../pages/property'
import Product from '../pages/product'
import Picture from '../pages/picture'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: AsideMenu,
      redirect: '/login',
      children: [{
        path: '/home',
        component: Home
      }, {
        path: '/user',
        component: User
      }, {
        path: '/order',
        component: Order
      }, {
        path: 'property',
        component: Property
      }, {
        path: 'product',
        component: Product
      }, {
        path: 'picture',
        component: Picture
      }]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
