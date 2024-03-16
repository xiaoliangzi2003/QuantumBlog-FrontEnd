import {createRouter,createWebHistory} from "vue-router";
import {defineAsyncComponent} from 'vue';
import axios from "axios";

const router =  createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: defineAsyncComponent(() => import('../views/account/Login.vue'))
        },
        {
            path:'/register',
            name:'register',
            component: defineAsyncComponent(() => import('../views/account/Register.vue'))
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: defineAsyncComponent(() => import('../views/error/NotFound.vue')) // 请确保您有一个名为 NotFound.vue 的组件
        },
        {
            path:'/index',
            name:'index',
            component: defineAsyncComponent(() => import('../views/Index.vue')),
            meta:{requiresAuth:true, title:'首页'}
        },
        {
            path:'/admin-backstage-management',
            name:'admin',
            component: defineAsyncComponent(() => import('../views/Admin/backstage-manage.vue')),
        },
        {
            path:'/article-editor',
            name:'editor',
            component: defineAsyncComponent(() => import('../views/article/article-editor.vue')),
        },
        {
            path: '/article-detail/:id',
            name: 'ArticleDetail',
            component: defineAsyncComponent(() => import('../views/article/article-detail.vue')),
            props: true
        }
    ]
});

// 全局路由守卫
router.beforeEach((to, from, next)=>{
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;
    if (to.path !== '/login' && to.path !== '/register') {
        // 这个路由需要进行 token 验证
        if (!token) {
            next('login')
        }else{
            axios.post('http://localhost:8080/auth/validateToken',{token}).then(response=>{
                if(response.data.user){
                    console.log('token有效');
                    next();
                }else{
                    console.log('token无效');
                    next('login')
                }
            }).catch(error=>{
                console.log(error);
                next('login')
            });
        }
        document.title = `${to.meta.title}`;
    }
    next()
})

router.afterEach((to, from)=>{
    // console.log(to, from)
    console.log('afterEach')
})

export default router;