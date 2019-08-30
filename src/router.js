import Vue from 'vue'
import Router from 'vue-router'
import MapGenerator from '@/components/MapGenerator'
import GameBoard from '@/components/GameBoard'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/map-generator',
      name: 'MapGenerator',
      component: MapGenerator
    },
    {
      path: '/',
      name: 'GameBoard',
      component: GameBoard
    },
    { path: '*', redirect: '/' }
  ]
})

export default router
