<template>
    <div class="week">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 工作查看 </el-breadcrumb-item>
                <el-breadcrumb-item>全部月报查看</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="width: 100%;height: 50px">
            <p style="width: 30%;float: left"><WeekJb @weekKeShi="KeShi"></WeekJb></p>
            <p style="width: 36%;float: left"><WeekAllTime @weekTime="startTime" @weekTimes="endTime"></WeekAllTime></p>
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
                            label="提交科室"
                    >
                        <span slot-scope="scope">{{ scope.row.createOrgName?scope.row.createOrgName:'——' }}</span>
                    </el-table-column>
                    <el-table-column
                            label="提交时间"
                    >
                        <span slot-scope="scope">{{ scope.row.createTime?scope.row.createTime:'——' }}</span>
                    </el-table-column>
                    <el-table-column
                            label="任务总数"
                    >
                        <span slot-scope="scope">{{ scope.row.countNum?scope.row.countNum:'0' }}</span>
                    </el-table-column>
                    <el-table-column
                            label="审批数量"
                    >
                        <span slot-scope="scope">{{ scope.row.checkNum?scope.row.checkNum:'0' }}</span>
                    </el-table-column>
                    <el-table-column
                            label="已完成"
                    >
                        <span slot-scope="scope">  {{ scope.row.finishNum?scope.row.finishNum:'0' }}</span>
                    </el-table-column>
                    <el-table-column
                            label="未完成">
                        <span slot-scope="scope">{{ scope.row.notFinishNum?scope.row.notFinishNum:'0' }}</span>
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <a slot-scope="scope" @click="planAuditInfo(scope.row)" style="color:#409eff;cursor: pointer;"> 月报审阅</a>
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
    import { postAjax, getAjax, oUrl,uploadImg } from "../../../api/api.js";
    import qs from "qs";
    export default {
        created(){
            this.getMonth();
            sessionStorage.setItem("freport",1)
        },
        components:{
            WeekJb,
            WeekAllTime
        },
        data(){
            return{
                pageNum:sessionStorage.setItem("freport",1),
                pageSize:15, //分页
                total:null,  //分页
                tableData: [],  //表单的数据
                searchs:{
                    keShi:"",  //科室
                    startTime:"",  //开始时间
                    endTime:"",   //结束时间
                    page:sessionStorage.getItem("freport"),  //页数

                },
            }
        },
        methods:{
            getMonth(){
                this.obj={
                    createOrgId:this.searchs.keShi,
                    startTime:this.searchs.startTime,
                    endTime:this.searchs.endTime,
                    pageNum:sessionStorage.getItem("freport")
                };
                let data1=qs.stringify(this.obj);
                postAjax("month/monthAuditedList",data1).then(res => {
                    if(res.data.code == 200) {
                        this.tableData=res.data.data.dataList;
                        this.total=res.data.data.total;
                    }else{
                        this.$message.error("服务器错误");
                    }
                });
            },
            KeShi(val){  //选择科室
                this.searchs.keShi=val;
            }, //选择科室
            startTime(val){  //开始时间
                let a=val.length;
                let b=val.substring(0,a-3);  //yyyy-mm形式
                this.searchs.startTime=b;
            }, //开始时间
            endTime(val){  //结束时间
                let a=val.length;
                let b=val.substring(0,a-3);
                this.searchs.endTime=b;
            }, //结束时间
            handleCurrentChange(val) {  //分页
                // this.pageNum = val;
                sessionStorage.setItem("freport",val);
                this.getMonth();
            },//分页
            search(){  // 搜索
                this.getMonth();
            },// 搜索
            planAuditInfo(data){
                this.$router.push({
                    name: "fMonthSee",
                    query: {
                        createOrgId: data.createOrgId,
                        month: data.month
                    }
                });

            },//跳转查看
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