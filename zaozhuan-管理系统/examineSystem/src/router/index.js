import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
Vue.use(Router);

// const routers=new Router({
    export default new Router({
    routes: [
        {
            path: '/',
            redirect: 'login',
        },
        // {
            
        //     path: '/loadding',
        //     component: resolve => require(['../components/common/loadding.vue'], resolve)
        // },
        // {
            
        //     path: '/logout',
        //     component: resolve => require(['../components/common/logout.vue'], resolve)
        // },
        {
            path: '/welcome',
            // redirect:'welcome',
            name:'welcome',
               
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
               
                {
                    path: '/allAssign',
                    name:'allAssign',
                     
                    component: resolve => require(['../components/page/assign/allAssign.vue'], resolve)
                },
                {
                    path: '/taskManage',
                    name:'taskManage',
                     
                    component: resolve => require(['../components/page/assign/taskManage.vue'], resolve)     
                },
                {
                    path: '/newTask',
                    name:'newTask',
                     
                    component: resolve => require(['../components/page/assign/newTask.vue'], resolve)     
                },
                {
                    path: '/taskInfo',
                    name:'taskInfo',
                     
                    component: resolve => require(['../components/page/assign/taskInfo.vue'], resolve)     
                },
                {
                    path: '/taskInfo1',
                    name:'taskInfo1',
                     
                    component: resolve => require(['../components/page/assign/taskInfo1.vue'], resolve)     
                },
                {
                    path: '/taskInfo2',
                    name:'taskInfo2',
                     
                    component: resolve => require(['../components/page/assign/taskInfo2.vue'], resolve)     
                },
                {
                    path: '/taskInfo3',
                    name:'taskInfo3',
                     
                    component: resolve => require(['../components/page/assign/taskInfo3.vue'], resolve)     
                },
                {
                    path: '/taskInfo4',
                    name:'taskInfo4',
                     
                    component: resolve => require(['../components/page/assign/taskInfo4.vue'], resolve)     
                },
                {
                    path: '/taskInfo5',
                    name:'taskInfo5',
                     
                    component: resolve => require(['../components/page/assign/taskInfo5.vue'], resolve)     
                },
                {
                    path: '/taskInfo6',
                    name:'taskInfo6',
                     
                    component: resolve => require(['../components/page/assign/taskInfo6.vue'], resolve)     
                },
                {
                    path: '/editTask',
                    name:'editTask',
                     
                    component: resolve => require(['../components/page/assign/editTask.vue'], resolve)     
                },
                {
                    path: '/planAudit',
                    name:'planAudit',
                     
                    component: resolve => require(['../components/page/assign/planAudit.vue'], resolve)     
                },
                {
                    path: '/eidtPlan',
                    name:'eidtPlan',
                     
                    component: resolve => require(['../components/page/assign/eidtPlan.vue'], resolve)     
                },
                {
                    path: '/progressAudit',
                    name:'progressAudit',
                     
                    component: resolve => require(['../components/page/assign/progressAudit.vue'], resolve)     
                },
                {
                    path: '/alltask',
                    name:'alltask',
                     
                    component: resolve => require(['../components/page/undertake/alltask.vue'], resolve)     
                },
                {
                    path: '/progressAuditInfo',
                    name:'progressAuditInfo',
                     
                    component: resolve => require(['../components/page/assign/progressAuditInfo.vue'], resolve)     
                },
                {
                    path: '/palnAuditInfo',
                    name:'planAuditInfo',
                     
                    component: resolve => require(['../components/page/assign/palnAuditInfo.vue'], resolve)     
                },
                {
                    path: '/planList',
                    name: '/planList',
                     
                    component: resolve => require(['../components/page/undertake/planList.vue'], resolve)     
                },
                {
                    path: '/progress',
                    name:'progress',
                     
                    component: resolve => require(['../components/page/undertake/progress.vue'], resolve)     
                },
                {
                    path: '/progressInfo',
                    name:'progressInfo',
                     
                    component: resolve => require(['../components/page/undertake/progressInfo.vue'], resolve)     
                },
                {
                    
                    path: '/planAdd',
                    name: 'planAdd',
                     
                    component: resolve => require(['../components/page/undertake/planAdd.vue'], resolve)    
                },
                {
                    path: '/week',
                    name:'week',
                     
                    component: resolve => require(['../components/page/undertake/week.vue'], resolve)    // 周报提交
                },
                {
                    path: '/addweek',
                     
                    component: resolve => require(['../components/page/undertake/addNewWeek.vue'], resolve)    // 周报添加
                },
                {
                    path: '/month',
                    name:'month',
                     
                    component: resolve => require(['../components/page/undertake/month.vue'], resolve)    // 月报提交
                },
                {
                    path: '/addmonth',
                    name:'addmonth',
                     
                    component: resolve => require(['../components/page/undertake/addNewMonth.vue'], resolve)    // 月报添加
                },
                {
                    path: '/weekAuditor',
                    name:'weekAuditor',
                     
                    component: resolve => require(['../components/page/undertake/weekAuditor.vue'], resolve)    // 周报查看
                },
                {
                    path: '/monthAuditor',
                    name:'monthAuditor',
                     
                    component: resolve => require(['../components/page/undertake/monthAuditor.vue'], resolve)    // 月报查看
                },
                {
                    path: '/weekly',
                    name:'weekly',
                     
                    component: resolve => require(['../components/page/assign/week.vue'], resolve)    // 周报管理
                },
                {
                    path: '/report',
                    name:'report',
                     
                    component: resolve => require(['../components/page/assign/month.vue'], resolve)    // 月报管理
                },
                {
                    path: '/weekAll',
                    name:'weekAll',
                     
                    component: resolve => require(['../components/page/assign/weekAll.vue'], resolve)    // 本周周报
                },
                {
                    path: '/reportAll',
                    name:'reportAll',
                     
                    component: resolve => require(['../components/page/assign/monthAll.vue'], resolve)    // 本月月报
                },
                {
                    path: '/weekSee',
                    name:'weekSee',
                     
                    component: resolve => require(['../components/page/assign/weekSee.vue'], resolve)    // 周报管理查看
                },
                {
                    path: '/reportSee',
                    name:'reportSee',
                     
                    component: resolve => require(['../components/page/assign/monthSee.vue'], resolve)    // 月报管理查看
                },
                {
                    path: '/treeDemo',
                    name:'treeDemo',
                     
                    component: resolve => require(['../components/page/assign/treeDemo.vue'], resolve)    // 月报管理查看
                },
                
                
                {
                    path: '/desksetting',
                    name:'desksetting',
                     
                    component: resolve => require(['../components/page/setting/desksetting.vue'], resolve)    // 科室设置
                },
                {
                    path: '/typeList',
                    name:'typeList',
                     
                    component: resolve => require(['../components/page/setting/typeList.vue'], resolve)    // 科室设置
                },
                {
                    path: '/userSetting',
                    name:'userSetting',
                     
                    component: resolve => require(['../components/page/setting/userSetting.vue'], resolve)    // 科室设置
                },
                {
                    path: '/childList',
                    name:'childList',
                     
                    component: resolve => require(['../components/page/setting/childList.vue'], resolve)    // 科室设置
                },
                {
                    path: '/addDesk',
                    name:'addDesk',
                     
                    component: resolve => require(['../components/page/setting/addDesk.vue'], resolve)    // 科室设置
                },
                {
                    path: '/userAdd',
                    name:'userAdd',
                     
                    component: resolve => require(['../components/page/setting/userAdd.vue'], resolve)    // 科室设置
                },
                {
                    path: '/roseSetting',
                    name:'roseSetting',
                     
                    component: resolve => require(['../components/page/setting/roseSetting.vue'], resolve)    // 科室设置
                },
                {
                    path: '/addRose',
                    name:'addRose',
                     
                    component: resolve => require(['../components/page/setting/addRose.vue'], resolve)    // 科室设置
                },
                {
                    path: '/authoritySetting',
                    name:'authoritySetting',
                     
                    component: resolve => require(['../components/page/setting/authoritySetting.vue'], resolve)    // 科室设置
                },
                {
                    path: '/addAuthority',
                    name:'addAuthority',
                     
                    component: resolve => require(['../components/page/setting/addAuthority.vue'], resolve)    // 科室设置
                },                                                                                                   //*****工作查看************
                {
                    path: '/fAssign',
                    name:'fAssign',
                     
                    component: resolve => require(['../components/page/weekReport/allAssign.vue'], resolve)    // 任务查看
                },
                {
                    path: '/fWeekSee',
                    name:'fWeekSee',
                     
                    component: resolve => require(['../components/page/weekReport/weekSee.vue'], resolve)    // 周报查看
                },
                {
                    path: '/fWeekAll',
                    name:'fWeekAll',
                     
                    component: resolve => require(['../components/page/weekReport/weekAll.vue'], resolve)    // 全部周报查看
                },
                {
                    path: '/fAllWeek',
                    name:'fAllWeek',
                     
                    component: resolve => require(['../components/page/weekReport/allWeek.vue'], resolve)    // 本周周报查看
                },

                {
                    path: '/fMonthSee',
                    name:'fMonthSee',
                     
                    component: resolve => require(['../components/page/weekReport/monthSee.vue'], resolve)    // 月报查看
                },
                {
                    path: '/fMonthAll',
                    name:'fMonthAll',
                     
                    component: resolve => require(['../components/page/weekReport/monthAll.vue'], resolve)    // 全部月报查看
                },
                {
                    path: '/fAllMonth',
                    name:'fAllMonth',
                     
                    component: resolve => require(['../components/page/weekReport/allMonth.vue'], resolve)    // 本月月报查看
                },
            ]
            
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
// import { postAjax, getAjax, uploadImg } from "../api/api.js";
// // 全局路由守卫
// routers.beforeEach(function (to, from, next) {  
//     const nextRoute = [ 'welcome', 'allAssign', 'taskManage','newTask', 'taskInfo','taskInfo1', 'taskInfo2','taskInfo3', 'taskInfo4','taskInfo5', 'taskInfo6','editTask', 'planAudit','eidtPlan', 'progressAudit','alltask', 'progressAuditInfo','palnAuditInfo', 'planList','progress', 'progressInfo','planAdd', 'week','addweek', 'month','addmonth', 'weekAuditor','monthAuditor', 'weekly','report', 'weekAll','reportAll', 'weekSee','reportSee', 'desksetting','typeList', 'userSetting','childList', 'addDesk','userAdd', 'roseSetting','addRose', 'authoritySetting','addAuthority'];   
//     if (nextRoute.indexOf(to.name) >= 0) {  
//     getAjax("user/userInfo").then(res => {
//         if(res.data.code==401){
//             window.location.href=res.data.data
//             sessionStorage.setItem('uid',JSON.stringify(res.data.data))
//         }         
//           })
//     }  
//     //已登录的情况再去登录页，跳转至首页  
//     if (sessionStorage.getItem('uid')) {  
//         next(); 
//     }  
//     next();  
// });  
// export default routers;
                                