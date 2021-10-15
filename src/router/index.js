import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Test from '@/components/Test'
import Gallery from '@/components/Gallery'
import Codepic from '@/components/Codepic'
import MineSweeperEntry from '@/components/MineSweeperEntry'
import Gameboard from '@/components/Gameboard'
import FileDrop from '@/components/FileDrop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: 'Home | AndisionZhang'
      },
      component: Home
    },
    {
      path: '/test',
      name: 'Test',
      meta: {
        title: 'Test | AndisionZhang'
      },
      component: Test
    },
    {
      path: '/gallery',
      name: 'Gallery',
      meta: {
        title: 'Gallery | AndisionZhang'
      },
      component: Gallery
    },
    {
      path: '/codepic',
      name: 'Codepic',
      meta: {
        title: 'Codepic | AndisionZhang'
      },
      component: Codepic
    },
    {
      path: '/game/mine',
      name: 'MineSweeperEntry',
      meta: {
        title: 'MineSweeper | AndisionZhang'
      },
      component: MineSweeperEntry
    },
    {
      path: '/game/leaderboard',
      name: 'Gameboard',
      meta: {
        title: 'MineSweeper | AndisionZhang'
      },
      component: Gameboard
    },
    {
      path: '/filedrop',
      name: 'FileDrop',
      meta: {
        title: 'FileDrop | FileDrop'
      },
      component: FileDrop
    }
  ]
})
