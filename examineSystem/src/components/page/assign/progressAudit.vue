<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 任务交办</el-breadcrumb-item>
                <el-breadcrumb-item>进度考核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <search @searchEvent="searchEvent" :stateSearch="stateSize"></search>
        <div>
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%"
            ref="multipleTable"
            tooltip-effect="dark">
            <el-table-column
            label="重点任务">
            <span slot-scope="scope" :title="scope.row.taskEmphasisContent" style="color: rgb(64, 158, 255);cursor: pointer;" @click="showInfo(scope.row)">{{ scope.row.taskEmphasisContent?scope.row.taskEmphasisContent:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="最新进展">
            <span :title="scope.row.progressContent" slot-scope="scope">{{ scope.row.progressContent?scope.row.progressContent:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="上报科室">
            <span slot-scope="scope">{{ scope.row.responsibleOrgName?scope.row.responsibleOrgName:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="任务整体进度">
            <span :title="scope.row.completionPercentage" slot-scope="scope">{{ scope.row.completionPercentage?scope.row.completionPercentage+'%':' ' }}</span>
            </el-table-column>
            <el-table-column
            label="上报时间">
            <span slot-scope="scope">{{ scope.row.reportTime?scope.row.reportTime:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="任务状态"
            show-overflow-tooltip>
            <a slot-scope="scope" @click="progressInfo(scope.row)" style="color:#409eff;cursor: pointer;">{{ scope.row.planState?scope.row.planState:' ' }}</a>
            </el-table-column>
        </el-table>
       <div class="pagination">
             <el-pagination @current-change="handleCurrentChange"
               :current-page.sync="pageNum" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total" class='y_page'>
            </el-pagination>
        </div>
        </div>
        <div style="text-align:center" v-if="this.tableData==[] ">
            暂无内容
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
                stateSize:"1",
                optionsFrist: [],//任务类型
                optionsSecond: [],//任务类型子
                optionsDuty: [],//责任科室
                optionsStatus:[],//任务状态
                pageNum:1,
                pageSize:15,
                total:0,
                tableData: [],
                checkedPlanId:[],
                multipleSelection: [],
                fristvalue:'',//任务类型
                secondvalue:'',//任务类型子选项
                dutyvalue:'',//责任科室
                statusvalue:'',//任务状态
                cur_page: 1,//分页参数
                select_word: '',//搜索关键词
                is_search: false,
                status:'',
                currentPageNum:parseInt(sessionStorage.getItem('currentPage'))
            }
        },
        created(){
           this.auditList();
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
                postAjax("/taskPlan/queryProgressAvaluationList",datas).then(res => {
                    if (res.data.code == 200) {
                        this.total=res.data.data.total
                     this.tableData= res.data.data.dataList 
                    }
                });
            },
            //审核列表查询
            auditList() {
                if(this.currentPageNum){
                        // alert(this.currentPageNum)
                        this.pageNum = this.currentPageNum;
 
                    }else{
                        this.pageNum = this.pageNum;
            
                    }
                let data=qs.stringify({pageNum:this.pageNum})
                postAjax("taskPlan/queryProgressAvaluationList",data).then(res => {
                    if (res.data.code == 200) {
                        this.total=res.data.data.total
                      this.tableData= res.data.data.dataList ; 
                      this.tableData.forEach(item => {
                          if(item.planState=="05"){
                              item.planState="新进展"
                          }
                      });
                    }
                });
                },
            //审核详情
            progressInfo(data){
                this.$router.push({
                    name: "progressAuditInfo",
                    query: {
                    planId: data.planId,
                    taskId: data.taskId
                    }
                });
            },
            showInfo(row){
                this.$router.push({
                        name: "taskInfo3",
                        query: {
                        taskId: row.taskId,
                        planId: row.planId
                        }
                    });
                    sessionStorage.setItem('pageNum',this.pageNum)
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
            
            search(){
                this.is_search = true;
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
