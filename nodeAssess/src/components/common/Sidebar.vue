<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items" >
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
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: 'assign',
                        title: '任务交办',
                        subs: [
                            {
                                index: 'jbAllTask',
                                title: '所有任务'
                            },
                            {
                                index: 'taskManage',
                                title: '任务管理'
                            },
                            {
                              index: 'planManage',
                              title: '计划审核'
                            },
                            {
                              index: 'progress',
                              title: '进度考核'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '任务承办',
                        subs: [
                            {
                                index: 'cbAllTask',
                                title: '所有任务'
                            },
                            {
                                index: 'myTask',
                                title: '我负责的任务'
                            },
                            {
                                index: 'planAdd',
                                title: '计划填报'
                            },
                            {
                                index: 'progressAdd',
                                title: '进度填报'
                            }
                        ]
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
