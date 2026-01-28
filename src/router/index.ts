import { createRouter,createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'splash',
        component:() => import('../views/HomeView.vue')
    },
    {
        path: '/',
        name: 'Login',
        component:() => import('../views/LoginView.vue')
    }
]
});

    //Navigation guard
    router.beforeEach((to, from, next) => {
        //You can add authentication logic here
        next();
    });

    export default router;