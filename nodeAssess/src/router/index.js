import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/jbAllTask',
                    component: resolve => require(['../components/assign/jbAllTask'], resolve)
                },
                {
                  path: '/taskManage',
                  component: resolve => require(['../components/assign/taskManage'], resolve)
                },
              {
                  path: '/planManage',
                  component: resolve => require(['../components/assign/planManage'], resolve)
                },
              {
                path: '/newTask',
                component: resolve => require(['../components/assign/newTask'], resolve)
              },
              {
                path: '/newTask1',
                component: resolve => require(['../components/assign/newTask1'], resolve)
              },
              {
                path: '/editTask',
                name:'editTask',
                component: resolve => require(['../components/assign/editTask'], resolve)
              },
     	      {
                path: '/cbAllTask',
                component: resolve => require(['../components/assign/cbAllTask'], resolve)
              },
              {
                path: '/progressAdd',
                component: resolve => require(['../components/assign/progressAdd'], resolve)
              },
              {
                path: '/myTask',
                component: resolve => require(['../components/assign/myTask'], resolve)
              },
              {
                path: '/planAdd',
                component: resolve => require(['../components/undertake/planAdd'], resolve)
              },
              {
                path: '/progress',
                component: resolve => require(['../components/assign/progress'], resolve)
              },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/Login.vue'], resolve)
        },
    ]
})
