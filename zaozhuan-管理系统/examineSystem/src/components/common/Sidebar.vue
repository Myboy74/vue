<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
// import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../api/api.js";
    export default {
        data() {
            return {
                items: [
                    // {
                    //     icon: 'el-icon-menu',
                    //     index: '2',
                    //     title: '任务交办',
                    //     subs: [
                    //         {
                    //             index: 'allAssign',
                    //             title: '所有任务'
                    //         },
                    //         {
                    //             index: 'taskManage',
                    //             title: '任务管理'
                    //         },
                    //
                    //         {
                    //             index: 'planAudit',
                    //             title: '计划审核'
                    //         },
                    //         {
                    //             index: 'progressAudit',
                    //             title: '进度审核'
                    //         },
                    //         {
                    //             index: 'weekly',
                    //             title: '周报管理'
                    //         },
                    //         {
                    //             index: 'report',
                    //             title: '月报管理'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-date',
                    //     index: '3',
                    //     title: '任务承办',
                    //     subs: [
                    //         {
                    //             index: 'allTask',
                    //             title: '任务查看'
                    //         },
                    //         {
                    //             index: 'planList',
                    //             title: '上报计划'
                    //         },
                    //
                    //         {
                    //             index: 'progress',
                    //             title: '上报进度'
                    //         },
                    //         {
                    //             index: 'week',
                    //             title: '周报提交'
                    //         },
                    //         {
                    //             index: 'month',
                    //             title: '月报提交'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-star-on',
                    //     index: '4',
                    //     title: '系统设置',
                    //     subs: [
                    //         {
                    //             index: 'desksetting',
                    //             title: '科室管理'
                    //         },
                    //         {
                    //             index: 'typeList',
                    //             title: '任务类型管理'
                    //         },
                    //         {
                    //             index: 'userSetting',
                    //             title: '用户管理'
                    //         },
                    //         {
                    //             index: 'roseSetting',
                    //             title: '角色管理'
                    //         },
                    //         {
                    //             index: 'authoritySetting',
                    //             title: '权限管理'
                    //         },
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-view',
                    //     index: '5',
                    //     title: '工作查看',
                    //     subs: [
                    //         {
                    //             index: 'fAssign',
                    //             title: '任务查看'
                    //         },
                    //         {
                    //             index: 'fAllWeek',
                    //             title: '本周周报查看'
                    //         },
                    //         {
                    //             index: 'fWeekAll',
                    //             title: '全部周报查看'
                    //         },
                    //         {
                    //             index: 'fAllMonth',
                    //             title: '本月月报查看'
                    //         },
                    //         {
                    //             index: 'fMonthAll',
                    //             title: '全部月报查看'
                    //         },
                    //     ]
                    // }
                ]
            }
        },
        created(){
           this.getallRoot()
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        methods: {
                getallRoot() {
                getAjax("user/queryUserMenus",{menuId:'0'}).then(res => {
                    if (res.data.code == 200) {
                        this.items=res.data.data;
                    }
                });
                },
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 88px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
