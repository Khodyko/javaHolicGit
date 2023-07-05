import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import PostIdPage from "@/pages/PostIdPage";
import GggGg from "@/pages/GggGg";
import PostPageCompositionApi from "@/pages/PostPageCompositionApi";

const routes = [
    {
        path: '/',
        component:Main
    },
    {
        path: '/posts',
        component:PostPage
    },
    {
        path: '/about',
        component:About
    },
    {
        path: '/posts/:id',
        component:PostIdPage
    },
    {
        path: '/ggg',
        component:GggGg
    },
    {
        path:'/composition',
        component: PostPageCompositionApi
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})
export default router;