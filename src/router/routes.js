export const routes = [
    {
        path:'/main',
        name:'Main',
        component:() => import('../views/Main.vue'),
    },
    {
        path:'/musiclist',
        name:'MusicList',
        component:() => import('../views/MusicList.vue'),
    },
    {
        path:'/playmusic',
        name:'PlayMusic',
        component:() => import('../views/PlayMusic.vue'),
    },
    {
        path:'/register',
        name:'Register',
        component:() => import('../views/Register.vue'),
    },
    {
        path:'/login',
        name:'Login',
        component:() => import('../views/Login.vue'),
    },
    // {
    //     path:'/test',
    //     name:'Test',
    //     component:() => import('../views/Test.vue'),
    // },
    {
        path:'*',
        redirect:{
            name:'Login'
        }
    }

]