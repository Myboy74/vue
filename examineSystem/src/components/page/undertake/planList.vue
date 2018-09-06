<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 任务承办</el-breadcrumb-item>
                <el-breadcrumb-item>上报计划</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="handle-box">
            <div class="item-select" style="margin-top:20px;">
                <label class="label-search">任务类型:</label>
                <el-select v-model="fristvalue" placeholder="全部" @change="changeTask">
                        <el-option v-for="item in optionsFrist" :key="item.taskTypeId" :label="item.taskTypeName" :value="item.taskTypeId"></el-option>
                    </el-select>
                    <el-select v-model="secondvalue" placeholder="全部" v-if="optionsSecond.length">
                        <el-option v-for="item in optionsSecond" :key="item.taskTypeId" :label="item.taskTypeName"  :value="item.taskTypeId"></el-option>
                    </el-select>
                    <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="searchInfor">搜索</el-button>
            </div> 
            
        </div>
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%" >
            <el-table-column
            prop="keyTask"
            label="重点任务">
              <span slot-scope="scope" :title="scope.row.taskEmphasisContent" style="color: rgb(64, 158, 255);cursor: pointer;" @click="showInfo(scope.row)">{{ scope.row.taskEmphasisContent?scope.row.taskEmphasisContent:' ' }}</span>
            </el-table-column>
            <el-table-column
            prop="bootPlan"
            label="任务详情 ">
            <span slot-scope="scope" :title="scope.row.task_description">{{ scope.row.task_description?scope.row.task_description:' ' }}</span>
            </el-table-column>
           
            <el-table-column
            prop="taskEndTime"
            label="完成期限">
            <span slot-scope="scope">{{ scope.row.deadlineTime?scope.row.deadlineTime:' ' }}</span>
            </el-table-column>
            <el-table-column
            prop="taskStatus"
            label="任务状态" >
            <a slot-scope="scope" @click="addPlan(scope.row)"   style="color:#409eff;cursor: pointer;">{{   getStatus(scope.row.planState) }}</a>
            <!-- <a slot-scope="scope" @click="updataPlan(scope.row)"  v-else style="color:#409eff;cursor: pointer;">{{  getStatus(scope.row.planState) }}</a> -->
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
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
import qs from "qs";
    export default {
        data() {
            return {
                optionsFrist: [],//任务类型
                optionsStatus:[],//任务状态
                tableData: [],
                fristvalue:'',//任务类型
                secondvalue:'',//任务类型子选项
                statusvalue:'',//任务状态
                select_word: '',//搜索关键词 
                optionsSecond: [],//任务类型子
                pageNum: 1,//分页参数
                pageSize:15,
                total:0,
                select_word: '',//搜索关键词
                is_search: false,
                sendObj:{},
                currentPageNum:parseInt(sessionStorage.getItem('currentPage'))
            }
        },
        created(){
            this.getTaskType();
            this.getassign();
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

                getTaskType() {
      getAjax("taskType/queryTaskType", {
        parentId: "0"
      }).then(res => {
        if (res.data.code == 200) {
          this.optionsFrist = res.data.data;
          this.optionsFrist.unshift({taskTypeName:'全部',taskTypeId:''})
          if (res.data.data.length) {
            this.fristvalue = res.data.data[0].taskTypeId;
            this.getTaskTypeChild();
          }
        }
      });
    },
            //任务主分类改变时
            changeTask() {
            this.getTaskTypeChild();
            },
            showInfo(row){
                this.$router.push({
                        name: "taskInfo5",
                        query: {
                        taskId: row.taskId,
                        planId: row.planId
                        }
                    });
                    sessionStorage.setItem('pageNum',this.pageNum)
            },
     //获取子分类
    getTaskTypeChild() {
      getAjax("taskType/queryTaskType", {
        parentId: this.fristvalue
      }).then(res => {
        if (res.data.code == 200) {
          this.optionsSecond = res.data.data;
          this.optionsSecond.unshift({taskTypeName:'全部',taskTypeId:''})
          if (res.data.data.length) {
            this.secondvalue = res.data.data[0].taskTypeId;
          }
        }
      });
    },
            //所有任务查询
            searchInfor(){
                this.sendObj={
                    'taskTypeId':this.secondvalue != ""? this.secondvalue: this.fristvalue,
                    'taskEmphasisContent':this.select_word,
                    'pageNum':this.pageNum
                }
                 let datas=qs.stringify(this.sendObj)
                postAjax("taskPlan/queryReportPlanList",datas).then(res => {
                    if (res.data.code == 200) {
                        this.total=res.data.data.total
                     this.tableData= res.data.data.dataList 
                    }
                });
            },
            getassign() {
                if(this.currentPageNum){
                        // alert(this.currentPageNum)
                        this.pageNum = this.currentPageNum;
 
                    }else{
                        this.pageNum = this.pageNum;
            
                    }
                let data=qs.stringify({pageNum:this.pageNum})
                postAjax("taskPlan/queryReportPlanList",data).then(res => {
                    if (res.data.code == 200) {
                        this.total=res.data.data.total
                      this.tableData= res.data.data.dataList ;
                       res.data.data.dataList.forEach(res => {
    
                       });
                    }
                });
                },
                 getStatus(status){
                this.status=status;
                    switch (status){
                    case "00": return "任务未下发";break;
                    case "01": return "上报计划";break;
                    case "02": return "计划待审核";break;
                    case "03": return "修改计划";break;
                    case "04": return "计划进行中";break;
                    case "05": return "任务已完成";break;
                    default: return "";
                    }
                },
               handleCurrentChange(val){
                if(this.currentPageNum){
                    this.currentPageNum=val
                }else{
                this.pageNum = val;
                }
                this.getallAssign();
               
            },
            addPlan(data){
                console.log(data)
                this.$router.push({
                        name: "planAdd",
                        params: {
                        id: data.planId,
                        taskId:data.taskId,
                        data:data
                        }
                    });
            },
            //  updataPlan(data){
            //     console.log(data)
            //     this.$router.push({
            //             name: "updataPlan",
            //             params: {
            //             planId: data.planId,
            //             taskId:data.taskId
            //             }
            //         });
            // }
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
