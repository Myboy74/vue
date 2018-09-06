<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 任务承办</el-breadcrumb-item>
                <el-breadcrumb-item>周报提交</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <WeekSearch @searchTime="searchTime"></WeekSearch>
        <el-row>
            <router-link :to="{path:'addweek'}" tag="span">
                <el-button plain style="margin-top: 20px">添加周报</el-button>
            </router-link>
        </el-row>
        <div class="tables" style="text-align: center">
            <el-table
                    :data="tableData"
                    border
                    stripe  style="width: 100%; "
            >
                <el-table-column
                        prop="createTime"
                        label="提交时间"
                      >
                    <span slot-scope="scope">{{ scope.row.createTime?scope.row.createTime:"——" }}</span>

                </el-table-column>
                <el-table-column
                        prop="countNum"
                        label="任务总数">
                    <span slot-scope="scope">{{ scope.row.countNum?scope.row.countNum:"——" }}</span>
                </el-table-column>
                <el-table-column
                        prop="checkNum"
                        label="审批数量">
                    <span slot-scope="scope">{{ scope.row.checkNum?scope.row.checkNum:"0" }}</span>
                </el-table-column>
                <el-table-column
                        prop="finishNum"
                        label="已完成">
                    <span slot-scope="scope"> {{ scope.row.finishNum?scope.row.finishNum:"0" }}</span>
                </el-table-column>
                <el-table-column
                        prop="notFinishNum"
                        label="未完成">
                    <span slot-scope="scope"> {{ scope.row.notFinishNum?scope.row.notFinishNum:"0"  }}</span>
                    </el-table-column>
                <el-table-column
                        label="操作">
                    <a slot-scope="scope" @click="planAuditInfo(scope.row)" style="color:#409eff;cursor: pointer;">  查看</a>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import WeekSearch from '../common/weekSearch.vue';
    import qs from "qs";
    import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
    export default {
          components:{
              WeekSearch
          },
        created(){
              this.getWeek();
            sessionStorage.setItem("week",1);
        },
          data(){
                return{
                    pageNum:sessionStorage.setItem("week",1),
                    pageSize:15,  //页数
                    total:null,//总页数
                    tableData: [],  //表单的数据
                    obj:{}
                }
          },
        methods:{
            searchTime(val){
                this.obj={
                    'startTime':val.startTime,  //开始时间
                    'endTime':val.endTime,   //结束时间
                    'keyPoint':val.selectWord,  //搜索框内容
                    'pageNum':this.pageNum   //页数
                };
                let date=qs.stringify(this.obj);
                postAjax("week/weekByOrgList",date).then(res => {
                    if (res.data.code == 200) {
                        this.tableData=res.data.data.dataList;
                        this.total=res.data.data.total;
                    }
                });
            },//搜索子传    点击搜索框得时候
            handleCurrentChange(val) {
                // this.pageNum = val;
                sessionStorage.setItem("week",val);
                this.getWeek();
            },//分页
            getWeek(){
                let data1=qs.stringify({pageNum:sessionStorage.getItem("week")});
                postAjax("week/weekByOrgList",data1).then(res => {
                    if (res.data.code == 200) {
                        // console.log(res.data.data);
                        this.tableData=res.data.data.dataList;
                        this.total=res.data.data.total;
                    }else{
                        this.$message.error("服务器错误");
                    }
                });
            },
            planAuditInfo(data){
                this.$router.push({
                    name: "weekAuditor",
                    query: {
                        createOrgId: data.createOrgId,
                        weekStartDate: data.weekStartDate
                    }
                });
            },    //查看详情
        }
    }
</script>

<style scoped>
    .el-button--success,.tables{
        margin-top: 20px;
    }
</style>