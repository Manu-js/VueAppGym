import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "Login",
        component: () => import(/* webpackChunkName: "Login" */ "../components/Login")
    },
    {
        path: "/Main",
        name: "Main",
        component: () =>
            import(/* webpackChunkName: "AppUserList" */ "../components/HelloWorld.vue"),
        alias: "/"
    },
    {
        path: "/Cosis",
        name: "Cosis",
        component: () =>
            import(/* webpackChunkName: "AppContact" */ "../components/Cosis.vue")
    },
    {
        path: "/UserList",
        name: "UserList",
        component: () =>
            import(/* webpackChunkName: "AppContact" */ "../components/UserList.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    linkExactActiveClass: "escuela-vue-exact",
    linkActiveClass: "escuela-vue-active",
    routes,
    scrollBehavior(to, from, savedPosition) {
        console.log(to, from, savedPosition);
        return new Promise(resolve => {
            const position = (function () {
                if (savedPosition) {
                    return savedPosition;
                } else {
                    if (to.hash) {
                        return {
                            selector: to.hash
                        };
                    }
                }
            })();
            router.app.$root.$once("triggerScroll", () => {
                router.app.$nextTick(() => resolve(position));
            });
        });
    }
});

router.beforeEach((to, from, next) => {
    const session = Vue.prototype.$session;
    
    if (session.exists()) {
        if (to.path === '/login') {
            next('/');
        } else {
            next();
        }
    } else {
        if (to.path !== '/login') {
            next('/login');
        } else {
            next();
        }
        }
    
});

export default router;
