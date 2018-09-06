<template>
    <div class="week">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 工作查看</el-breadcrumb-item>
                <el-breadcrumb-item>全部周报查看</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="width: 100%;height: 50px">
            <p style="width: 30%;float: left"><WeekJb @weekKeShi="KeShi"></WeekJb></p>
            <p style="width: 36%;float: left"><WeekAllTime @weekTime="endTime" @weekTimes="startTime"></WeekAllTime></p>
            <p style="width: 15%;float: left;" ><el-button type="primary" icon="search" @click="search">搜索</el-button></p>
        </div>

        <div class="weekContent">
            <div class="tables" style="text-align: center">
                <el-table
                        :data="tableData"
                        border
                        stripe  style="width: 100%; "
                >
                    <el-table-column
                            prop="createOrgName"
                            label="提交科室"
                    >
                        <span slot-scope="scope">{{ scope.row.createOrgName?scope.row.createOrgName:'——' }}</span>

                    </el-table-column>
                    <el-table-column
                            label="工作周时间"
                            width="200"
                    >
                        <span slot-scope="scope">{{ scope.row.weekStartDate}}——{{scope.row.week_end_date}}</span>

                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="提交时间"
                    >
                        <span slot-scope="scope">{{ scope.row.createTime?scope.row.createTime:'——' }}</span>

                    </el-table-column>
                    <el-table-column
                            prop="finishNum"
                            label="已完成"
                    >
                        <span slot-scope="scope">  {{ scope.row.finishNum?scope.row.finishNum:'0' }}</span>
                    </el-table-column>
                    <el-table-column
                            prop="notFinishNum"
                            label="未完成">
                        <span slot-scope="scope">{{ scope.row.notFinishNum?scope.row.notFinishNum:'0' }}</span>
                    </el-table-column>
                    <el-table-column
                            prop="operation"
                            label="操作">
                        <a slot-scope="scope" @click="planAuditInfo(scope.row)" style="color:#409eff;cursor: pointer;"> 周报查看</a>
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
    </div>


</template>

<script>
    import WeekJb from '../common/week_keShi.vue';
    import WeekAllTime from '../common/weekAllTime.vue';
    import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
    import qs from "qs";
    export default {
        created(){
            this.getWeek();
            sessionStorage.setItem("fweekly",1)
        },
        components:{
            WeekJb,
            WeekAllTime
        },
        data(){
            return{
                pageNum:sessionStorage.setItem("fweekly",1),
                pageSize:15, //分页
                total:null,  //分页
                tableData: [],  //表单的数据
                searchs:{
                    keShi:"",  //科室
                    startTime:"",  //开始时间
                    endTime:"",   //结束时间
                    page:sessionStorage.getItem("fweekly"),  //页数
                }, //子传父搜索数据
                obj:{}  //搜索使用
            }

        },
        methods:{
            getWeek(){
                this.obj={
                    createOrgId:this.searchs.keShi,
                    startTime:this.searchs.startTime,
                    endTime:this.searchs.endTime,
                    pageNum:sessionStorage.getItem("fweekly")
                };
                let data1=qs.stringify(this.obj);
                postAjax("week/weekAuditedList",data1).then(res => {
                    if (res.data.code == 200) {
                        console.log(res.data.data);
                        this.tableData=res.data.data.dataList;
                        this.total=res.data.data.total;
                    }else{
                        this.$message.error("服务器错误");
                    }
                });
            },
            KeShi(val){
                this.searchs.keShi=val;
            }, //选择科室
            startTime(val){
                this.searchs.startTime=val;
            },//开始时间
            endTime(val){
                this.searchs.endTime=val;
            }, //结束时间
            handleCurrentChange(val) {
                // this.pageNum = val;
                sessionStorage.setItem("fweekly",val);
                this.getWeek();
            }, //分页
            search(){ //搜索
                this.getWeek();
            },
            planAuditInfo(data){
                this.$router.push({
                    name: "fWeekSee",
                    query: {
                        createOrgId: data.createOrgId,
                        weekStartDate: data.weekStartDate
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .weekContent{
        width: 100%;
        height: 100%;
        margin-top: 20px;
    }
    .f_btn{
        height: 40px;
        margin: 20px 0;
        position: relative;
    }
    .f_btn .el-button{
        position: absolute;
        top: 0;
        left: 0;
    }

</style>