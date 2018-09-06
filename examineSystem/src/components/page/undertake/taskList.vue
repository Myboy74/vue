<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 任务承办</el-breadcrumb-item>
                <el-breadcrumb-item>任务查看</el-breadcrumb-item>
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
            </div>
            <div style="margin-top:20px;">
                <label class="label-search">任务状态:</label>
                <el-select v-model="statusvalue" placeholder="全部">
                    <el-option
                    v-for="item in optionsStatus"
                    :key="item.dicCode"
                    :label="item.dicName"
                    :value="item.dicCode">
                    </el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="searchInfor">搜索</el-button>
            </div>  
            
        </div>
          <el-table
            :data="tableData"
            style="width: 100%" >
            <el-table-column
            prop="keyTask"
            label="重点任务">
              <span slot-scope="scope">{{ scope.row.taskEmphasisContent?scope.row.taskEmphasisContent:' ' }}</span>
            </el-table-column>
            <el-table-column
            prop="bootPlan"
            label="推进计划 ">
            <span slot-scope="scope">{{ scope.row.periodContent?scope.row.periodContent:' ' }}</span>
            </el-table-column>
            <el-table-column
            prop="newProgress"
            label="最新进展">
            <span slot-scope="scope">{{ scope.row.progressContent?scope.row.progressContent:' ' }}</span>
            </el-table-column>
            <el-table-column
            prop="overallPlan"
            label="整体进度">
            <span slot-scope="scope">{{ scope.row.completionPercentage?scope.row.completionPercentage:' ' }}</span>
            </el-table-column>
            <el-table-column
            prop="taskEndTime"
            label="完成期限">
            <span slot-scope="scope">{{ scope.row.deadlineTime?scope.row.deadlineTime:' ' }}</span>
            </el-table-column>
            <el-table-column
            prop="taskStatus"
            label="任务状态">
            <span slot-scope="scope">{{  getStatus(scope.row.planState) }}</span>
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
                tableData: [{
                }],
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
            }
        },
        created(){
            this.getTaskType();
            this.getstatus();
            this.getassign();
        },
        methods: {

            getTaskType() {
            getAjax("taskType/queryTaskType", {
                parentId: "0"
            }).then(res => {
                if (res.data.code == 200) {
                this.optionsFrist = res.data.data;
                if (res.data.data.length) {
                    // this.searchInfo.fristvalue = res.data.data[0].taskTypeId;
                    this.getTaskTypeChild();
                }
                }
            });
            },
            //任务主分类改变时
            changeTask() {
            this.getTaskTypeChild();
            },

            //获取子分类
            getTaskTypeChild() {
            getAjax("taskType/queryTaskType", {
                parentId: this.fristvalue
            }).then(res => {
                if (res.data.code == 200) {
                this.optionsSecond = res.data.data;
                if (res.data.data.length) {
                    // this.searchInfo.secondvalue = res.data.data[0].taskTypeId;
                }
                }
            });
            },
                //获取任务状态
                getstatus() {
                let _this = this;
                getAjax("dic/queryPlanStatus").then(res => {
                    if (res.data.code == 200) {
                   this.optionsStatus=res.data.data;
                   if (res.data.data.length) {
                    // this.searchInfo.statusvalue = res.data.data[0].dicCode;
                }
                    }
                });
                },
 //所有任务查询
            searchInfor(){
                this.sendObj={
                    'taskTypeId':this.secondvalue != ""? this.secondvalue: this.fristvalue,
                    'planState':this.statusvalue,
                    'taskEmphasisContent':this.select_word,
                    'pageNum':this.pageNum
                }
                 let datas=qs.stringify(this.sendObj)
                postAjax("taskPlan/queryUndertakePlanList",datas).then(res => {
                    if (res.data.code == 200) {
                        this.total=res.data.data.total
                     this.tableData= res.data.data.dataList 
                    }
                });
            },
            getassign() {
                let data=qs.stringify({pageNum:this.pageNum})
                postAjax("taskPlan/queryUndertakePlanList",data).then(res => {
                    if (res.data.code == 200) {
                        this.total=res.data.data.total
                      this.tableData= res.data.data.dataList ; 
                    }
                });
                },
                 getStatus(status){
                this.status=status;
            switch (status){
              case "00": return "任务未下发";break;
              case "01": return "计划未上报";break;
              case "02": return "计划待审核";break;
              case "03": return "计划未通过";break;
              case "04": return "计划进行中";break;
              case "05": return "任务已完成";break;
              default: return "";
            }
          },
             handleCurrentChange(val){
                this.pageNum = val;
                this.getassign();
                console.log(val)
               
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
