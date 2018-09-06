<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 任务交办</el-breadcrumb-item>
                <el-breadcrumb-item>所有任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <search @searchEvent="searchEvent"  ref="aaa" :user="pageNum"></search> -->
        <search @searchEvent="searchEvent"></search>
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%">
            <el-table-column
            label="重点任务">
            <span :title="scope.row.taskEmphasisContent" slot-scope="scope" style="color: rgb(64, 158, 255);cursor: pointer;" @click="showInfo(scope.row)">{{ scope.row.taskEmphasisContent?scope.row.taskEmphasisContent:' ' }}</span>
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
            <span :title="scope.row.progressContent" slot-scope="scope">{{ scope.row.progressContent?scope.row.progressContent:' ' }}</span>
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
                pageNum:1,
                pageSize:15,
                total:0,
                tableData: [],//列表集合
                total:null,//总页数
                sendObj:{},
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
                    postAjax("taskPlan/queryPlanList",data).then(res => {
                    if (res.data.code == 200) {
                        this.total=res.data.data.total
                      this.tableData= res.data.data.dataList ; 
                    }
                });
              
                },
            showInfo(row){
                this.$router.push({
                        name: "taskInfo",
                        query: {
                        taskId: row.taskId,
                        planId: row.planId
                        }
                    });
                    sessionStorage.setItem('pageNum',this.pageNum)
            },
            getStatus(status){
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
