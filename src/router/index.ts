import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import TableList from '../views/tableList.vue';
// import Login from '../views/Login.vue'
console.log(import.meta.env.BASE_URL,'====')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView
      // component: () => import('../views/Three.vue')
      // component: () => import('../views/Threejs1.vue')
      // component: () => import('../views/Threejs2.vue')
      // component: () => import('../views/Scene.vue')
      // component: () => import('../views/Material.vue')
      // component: () => import('../views/Vein.vue')
      // component: () => import('../views/Beam.vue')
      // component: () => import('../views/Camera.vue')  //没跑起来
      component: () => import('../views/Shadow.vue')



    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/invitation',
      name: 'invitation',
      component: () => import('../views/Invitation.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
