<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 任务交办</el-breadcrumb-item>
                <el-breadcrumb-item>任务管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-row>
                <el-button plain @click="newTask">新建任务</el-button>
                <el-button type="primary" :disabled="taskID.length!=1" v-if="this.planStas=='00'" @click="editTask" plain>编辑任务</el-button>
                <el-button type="primary" @click="editPlan" :disabled="taskID.length!=1" v-if="this.planStas=='02'||this.planStas=='03'||this.planStas=='04'||this.planStas=='05'" plain>修改计划</el-button>
                <el-button type="success" :disabled="multipleSelection.length==0||this.planStas=='06'" @click="finish" plain>任务完结</el-button>
                <el-button type="info" @click="closeTaskPlan" :disabled="multipleSelection.length==0" v-if="this.planStas!='10'" plain>任务关闭</el-button>
                <el-button type="warning" @click="openPlan" :disabled="multipleSelection.length==0"  v-if="this.planStas=='10'" plain>任务开启</el-button>
                <el-button type="danger" @click="delected" :disabled="multipleSelection.length==0" plain>任务删除</el-button>
            </el-row>
              <search @searchEvent="searchEvent"></search>
          <el-table
            :data="tableData"
            border
            stripe
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>

            <el-table-column
            label="重点任务" >
            <span slot-scope="scope" style="color: rgb(64, 158, 255);cursor: pointer;" @click="showInfo(scope.row)" :title="scope.row.taskEmphasisContent">{{ scope.row.taskEmphasisContent?scope.row.taskEmphasisContent:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="责任科室">
            <span slot-scope="scope">{{ scope.row.responsibleOrgName?scope.row.responsibleOrgName:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="推进计划">
            <span :title="scope.row.periodContent" slot-scope="scope">{{ scope.row.periodContent?scope.row.periodContent:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="最新进展">
            <span :title="scope.row.progressContent"  slot-scope="scope">{{ scope.row.progressContent?scope.row.progressContent:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="整体进度">
            <span slot-scope="scope">{{ scope.row.completionPercentage?scope.row.completionPercentage+`%`:' ' }}</span>
            </el-table-column>
            <el-table-column 
            label="任务状态">
                <a slot-scope="scope">{{ getStatus(scope.row.planState) }}</a>
            </el-table-column>
        </el-table>
        <div class="pagination">
             <el-pagination @current-change="handleCurrentChange"
               :current-page.sync="pageNum" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total" class='y_page'>
            </el-pagination>
        </div>
                    
    </div>
</div>
</template>

<script>
import search from '../common/search';
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
    export default {
        components:{
            search
        },
        data() {
            return {
                multipleSelection: [],//选中的值的集合
                taskID:[],//选中的ID集合
                planStas:'',
                planId:[],
                pageNum:1,
                pageSize:15,
                total:0,
                tableData: [],//列表集合
                total:null,//总页数
                sendObj:{},
                status:'',
                currentPageNum:parseInt(sessionStorage.getItem('currentPage'))
            }
        },
            mounted () {
            this.getallAssign()
        },
        beforeUpdate(){
            var  n  =  window.event.screenX  -  window.screenLeft; 
            var  b  =  n  >  document.documentElement.scrollWidth-20; 
            if(b  &&  window.event.clientY  <  0  ||  window.event.altKey) 
            {  
            }else{
                sessionStorage.clear();
            } 
        },

        methods: {
            //新建任务
            newTask(){
                this.$router.push({ path:'/newTask',});
            },
             handleSelectionChange(val) {
                 if(val!=0){
                this.multipleSelection = val;
                this.planStas=this.multipleSelection[0].planState;
                this.taskID=[];
                this.planId=[];
                this.multipleSelection.forEach(res => {
                    this.taskID.push(res.taskId)
                    this.planId.push(res.planId)
                });
                 }
               
            },
            editTask(){
                this.$router.push({
                    name: "editTask",
                    query: {
                    id: this.taskID
                    }
                });
            },
            //删除任务
            delected(){
                this.$confirm('此操作将删除任务, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                    let ids=qs.stringify({planIds:this.planId.toString()});
                    postAjax("taskPlan/deletePlan",ids).then(res => {
                        if (res.data.code == 200) {
                            this.$message.success("删除成功");

                let data=qs.stringify({pageNum:1})
                postAjax("/taskPlan/queryPlanList",data).then(res => {
                    if (res.data.code == 200) {
                        this.total=res.data.data.total
                      this.tableData= res.data.data.dataList ; 
                      this.pageNum='1'
                    }
                });
     
                        }else{
                            this.$message.error("删除失败请刷新重试");
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            //任务完结
            finish(){
                let ids=qs.stringify({planIds:this.planId.toString()})
                postAjax("taskPlan/finishTaskPlan",ids).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success("成功完结任务");
                        this.getallAssign()
                    }else{
                        this.$message.error("成功完结任务失败请刷新重试");
                    }
                });
            },
            //任务关闭
            closeTaskPlan(){
                let ids=qs.stringify({planIds:this.planId.toString()})
                postAjax("taskPlan/closeTaskPlan",ids).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success("成功关闭任务");
                        this.getallAssign()
                    }else{
                        this.$message.error("关闭任务失败请刷新重试");
                    }
                });
            },
            //任务开启
            openPlan(){
                let ids=qs.stringify({planIds:this.planId.toString()})
                postAjax("taskPlan/openPlan",ids).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success("成功开启任务");
                        this.getallAssign()
                    }else{
                        this.$message.error("开启任务失败请刷新重试");
                    }
                });
            },
            //计划修改
            editPlan(){
                // console.log(this.multipleSelection)
                 this.$router.push({
                        name: "eidtPlan",
                        params: {
                        id: this.multipleSelection[0].planId,
                        taskId:this.multipleSelection[0].taskId,
                        data: this.multipleSelection[0]
                        }
                    });
            },
            //所有任务查询
            searchEvent(data){
                this.sendObj={
                    'taskTypeId':data.secondvalue != ""? data.secondvalue: data.fristvalue,
                    'responsibleOrgId':data.dutyvalue,
                    'planState':data.statusvalue,
                    'taskEmphasisContent':data.select_word,
                    'pageNum':this.pageNum
                }
                 let datas=qs.stringify(this.sendObj)
                postAjax("/taskPlan/queryPlanList",datas).then(res => {
                    if (res.data.code == 200) {
                        this.total=res.data.data.total
                     this.tableData= res.data.data.dataList 
                    }
                });
            },
            
            getallAssign() {
                 if(this.currentPageNum){
                        // alert(this.currentPageNum)
                        this.pageNum = this.currentPageNum;
 
                    }else{
                        this.pageNum = this.pageNum;
            
                    }
                let data=qs.stringify({pageNum:this.pageNum})
                postAjax("/taskPlan/queryPlanList",data).then(res => {
                    if (res.data.code == 200) {
                        this.total=res.data.data.total
                      this.tableData= res.data.data.dataList ; 
                    }
                });
                },
            showInfo(row){
                this.$router.push({
                        name: "taskInfo1",
                        query: {
                        taskId: row.taskId,
                        planId: row.planId
                        }
                    });
                sessionStorage.setItem('pageNum',this.pageNum)
            },
            getStatus(status){
                this.status=status;
            switch (status){
              case "00": return "任务未下发";break;
              case "01": return "计划未上报";break;
              case "02": return "计划待审核";break;
              case "03": return "计划未通过";break;
              case "04": return "计划进行中";break;
              case "05": return "计划待考核";break;
              case "06": return "任务已完成";break;
              case "10": return "任务已关闭";break;
              case "11": return "任务已开启";break;
              default: return "";
            }
          },
           //分页
            handleCurrentChange(val){
                if(this.currentPageNum){
                    this.currentPageNum=val
                }else{
                this.pageNum = val;
                }
                this.getallAssign();
               
            },

        }
    }
</script>

<style scoped>

.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
.label-search{
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.item-select{
    
    display: inline-block;
}
</style>
<style>
.el-table th>.cell,.el-table .cell{
    text-align:center;
}
</style>
