<template>
    <div class="week">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 任务交办</el-breadcrumb-item>
                <el-breadcrumb-item>所有周报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="width: 100%;height: 50px">
<<<<<<< HEAD
            <p style="width: 310PX;float: left"><WeekJb @weekKeShi="KeShi"></WeekJb></p>
            <p style="width: 460PX;float: left"><WeekAllTime @weekTime="endTime" @weekTimes="startTime"></WeekAllTime></p>
            <p style="width: 120PX;float: left;" ><el-button type="primary" icon="search" @click="search">搜索</el-button></p>
=======
            <p style="width: 30%;float: left"><WeekJb @weekKeShi="KeShi"></WeekJb></p>
            <p style="width: 41%;float: left"><WeekAllTime @weekTime="endTime" @weekTimes="startTime"></WeekAllTime></p>
            <p style="width: 15%;float: left;" ><el-button type="primary" icon="search" @click="search">搜索</el-button></p>
>>>>>>> b703fa0b8c28b49bfef83693758436a44d1ffe52
        </div>
        <el-button type="primary" size="small" icon="el-icon-download"  @click="exportVisible = true">导出</el-button>
        <el-dialog
            title="请选择要导出的周报时间"
            :visible.sync="exportVisible"
            width="30%"
            :before-close="handleClose">
              <div class="block">
                <span class="demonstration">选择日期：</span>
                <el-date-picker
                v-model="dataExport"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择一周内的任意一天">
                </el-date-picker>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="exportVisible = false">取 消</el-button>
                <el-button type="primary"  @click="exportContent">确 定</el-button>
            </span>
            </el-dialog>
        <!--<el-row class="f_btn">-->
        <!--<router-link :to="{path:'weekAll'}" tag="span">-->
        <!--<el-button  plain>本周周报</el-button>-->
        <!--</router-link>-->
        <!--</el-row>-->
        <div class="weekContent">
            <div class="tables" style="text-align: center">
                <el-table
                        :data="tableData"
                        border
                        stripe
                        style="width: 100%">
                    <el-table-column
                            label="提交科室">
                        <span slot-scope="scope">{{ scope.row.createOrgName?scope.row.createOrgName:'——' }}</span>
                    </el-table-column>
                    <el-table-column
                            width="200"
                            label="工作周时间">
                        <span slot-scope="scope">{{ scope.row.weekStartDate}}——{{scope.row.week_end_date}}</span>
                    </el-table-column>
                    <el-table-column
                            label="提交时间">
                        <span slot-scope="scope">{{ scope.row.createTime?scope.row.createTime:'——' }}</span>
                    </el-table-column>
                    <el-table-column
                            label="任务总数">
                        <span slot-scope="scope">{{ scope.row.countNum?scope.row.countNum:'0' }}</span>
                    </el-table-column>
                    <el-table-column
                            label="审批数量">
                        <span slot-scope="scope">{{ scope.row.checkNum?scope.row.checkNum:'0 ' }}</span>
                    </el-table-column>
                    <el-table-column
                            label="已完成">
                        <span slot-scope="scope">  {{ scope.row.finishNum?scope.row.finishNum:'0 ' }}</span>
                    </el-table-column>
                    <el-table-column
                            label="未完成">
                        <span slot-scope="scope">{{ scope.row.notFinishNum?scope.row.notFinishNum:'0' }}</span>
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <a slot-scope="scope" @click="planAuditInfo(scope.row)" style="color:#409eff;cursor: pointer;"> 周报审阅</a>
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
            // alert(this.exportUrl)
            sessionStorage.setItem("weekly",1)
        },
        components:{
            WeekJb,
            WeekAllTime
        },
        data(){
            return{
                exportUrl:localStorage.getItem('url')+'week/exportWeek?'+'weekStartDate=',
                exportVisible:false,
                dataExport:'',//导出时间
                pageNum:sessionStorage.setItem("weekly",1),
                pageSize:15, //分页
                total:null,  //分页
                tableData: [],  //表单的数据
                searchs:{
                    keShi:"",  //科室
                    startTime:"",  //开始时间
                    endTime:"",   //结束时间
                    page:sessionStorage.getItem("weekly"),  //页数
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
                    pageNum:sessionStorage.getItem("weekly")
                };
                let data1=qs.stringify(this.obj);
                postAjax("week/weekList",data1).then(res => {
                    if (res.data.code == 200) {
                        this.tableData=res.data.data.dataList;
                        this.total=res.data.data.total;
                    }else{
                        this.$message.error("服务器错误");
                    }
                });
            },
            //导出
            exportContent(){
                this.exportVisible=false
                location.href=this.exportUrl+this.dataExport
            },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    
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
                sessionStorage.setItem("weekly",val);
                this.getWeek();
            }, //分页
            search(){ //搜索
                this.getWeek();
            },
            planAuditInfo(data){
                this.$router.push({
                    name: "weekSee",
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