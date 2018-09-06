<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 任务交办</el-breadcrumb-item>
                <el-breadcrumb-item>计划审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <div class="handle-box">
            <div class="item-select" style="margin-top:20px;">
                <label class="label-search">任务类型:</label>
                <el-select v-model="searchInfo.fristvalue" placeholder="全部" @change="changeTask">
                        <el-option v-for="item in optionsFrist" :key="item.taskTypeId" :label="item.taskTypeName" :value="item.taskTypeId"></el-option>
                    </el-select>
                    <el-select v-model="searchInfo.secondvalue" placeholder="全部" v-if="optionsSecond.length">
                        <el-option v-for="item in optionsSecond" :key="item.taskTypeId" :label="item.taskTypeName"  :value="item.taskTypeId"></el-option>
                    </el-select>
            </div>
            <div class="item-select"  >
                <label class="label-search" >责任科室:</label>
                <el-select v-model="searchInfo.dutyvalue" placeholder="全部" >
                    <el-option
                    v-for="item in optionsDuty"
                    :key="item.orgId"
                    :label="item.orgName"
                    :value="item.orgId">
                    </el-option>
                </el-select>
            </div>
            <div style="margin-top:20px;">
                <label class="label-search">任务状态:</label>
                <el-select v-model="searchInfo.statusvalue" placeholder="全部" >
                    <el-option
                    v-for="item in optionsStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                
                <el-input v-model="searchInfo.select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="searchInfor">搜索</el-button>
            </div>  
            
           
            
        </div>
            <el-row>
                <el-button plain @click="passAudit" :disabled="multipleSelection.length==0">审核通过</el-button>
            </el-row>
            <!-- <search @searchEvent="searchEvent"></search> -->
        <div>
          <el-table
            :data="tableData"
            style="width: 100%"
            ref="multipleTable"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange">
             <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="重点任务">
            <span :title="scope.row.taskEmphasisContent" slot-scope="scope" style="color: rgb(64, 158, 255);cursor: pointer;" @click="showInfo(scope.row)">{{ scope.row.taskEmphasisContent?scope.row.taskEmphasisContent:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="推进计划">
            <span :title="scope.row.periodContent" slot-scope="scope">{{ scope.row.periodContent?scope.row.periodContent:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="完成标准">
            <span :title="scope.row.completionCriteria" slot-scope="scope">{{ scope.row.completionCriteria?scope.row.completionCriteria:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="上报科室">
            <span slot-scope="scope">{{ scope.row.responsibleOrgName?scope.row.responsibleOrgName:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="上报时间">
            <span slot-scope="scope">{{ scope.row.reportTime?scope.row.reportTime:' ' }}</span>
            </el-table-column>
            <el-table-column
            label="任务状态"
            show-overflow-tooltip>
            <a slot-scope="scope" @click="planAuditInfo(scope.row)" style="color:#409eff;cursor: pointer;">{{ scope.row.planState?scope.row.planState:' ' }}</a>
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
// import search from '../common/search';
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
export default {
  data() {
    return {
      searchInfo: {
        fristvalue: "", //任务类型
        secondvalue: "", //任务类型子选项
        dutyvalue: "", //责任科室
        statusvalue: "", //任务状态
        select_word: "" //搜索关键词
      },
      optionsFrist: [], //任务类型
      optionsSecond: [], //任务类型子
      optionsDuty: [], //责任科室
      optionsStatus: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "3",
          label: "计划未审核"
        }
      ], //任务状态
      pageNum: 1,
      pageSize: 15,
      total: 0,
      tableData: [],
      checkedPlanId: [],
      multipleSelection: [],
      cur_page: 1, //分页参数
      is_search: false,
      status: "",
      currentPageNum: parseInt(sessionStorage.getItem("currentPage"))
    };
  },
  created() {
    this.auditList();
    this.getTaskType();
    this.getSection();
  },
  beforeUpdate() {
    var n = window.event.screenX - window.screenLeft;
    var b = n > document.documentElement.scrollWidth - 20;
    if ((b && window.event.clientY < 0) || window.event.altKey) {
    } else {
      sessionStorage.clear();
    }
  },
  methods: {
    //获取任务分类
    getTaskType() {
      getAjax("taskType/queryTaskType", {
        parentId: "0"
      }).then(res => {
        if (res.data.code == 200) {
          this.optionsFrist = res.data.data;
          this.optionsFrist.unshift({ taskTypeName: "全部", taskTypeId: "" });
          if (res.data.data.length) {
            this.searchInfo.fristvalue = res.data.data[0].taskTypeId;
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
        parentId: this.searchInfo.fristvalue
      }).then(res => {
        if (res.data.code == 200) {
          this.optionsSecond = res.data.data;
          this.optionsSecond.unshift({ taskTypeName: "全部", taskTypeId: "" });
          if (res.data.data.length) {
            this.searchInfo.secondvalue = res.data.data[0].taskTypeId;
          }
        }
      });
    },
    //获取单位列表
    getSection() {
      let _this = this;
      getAjax("org/queryOrgList").then(res => {
        if (res.data.code == 200) {
          this.optionsDuty = res.data.data;
          this.optionsDuty.unshift({ orgName: "全部", orgId: "" });
          if (res.data.data.length) {
            // this.searchInfo.dutyvalue = res.data.data[0].orgId;
          }
        }
      });
    },

    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      this.multipleSelection.forEach(res => {
        this.checkedPlanId.push(res.planId);
      });
    },
    //所有任务查询
    searchInfor() {
      this.sendObj = {
        taskTypeId:
          this.searchInfo.secondvalue != ""
            ? this.searchInfo.secondvalue
            : this.searchInfo.fristvalue,
        responsibleOrgId: this.searchInfo.dutyvalue,
        planState: this.searchInfo.statusvalue,
        taskEmphasisContent: this.searchInfo.select_word,
        pageNum: this.pageNum
      };
      let datas = qs.stringify(this.sendObj);
      postAjax("/taskPlan/queryAuditPlanList", datas).then(res => {
        if (res.data.code == 200) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.dataList;
          this.tableData.forEach(item => {
            if (item.planState == "02") {
              item.planState = "审核计划";
            }
          });
        }
      });
    },
    //审核列表查询
    auditList() {
      if (this.currentPageNum) {
        // alert(this.currentPageNum)
        this.pageNum = this.currentPageNum;
      } else {
        this.pageNum = this.pageNum;
      }
      let data = qs.stringify({ pageNum: this.pageNum });
      postAjax("taskPlan/queryAuditPlanList", data).then(res => {
        if (res.data.code == 200) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.dataList;
          this.tableData.forEach(item => {
            if (item.planState == "02") {
              item.planState = "审核计划";
            }
          });
        }
      });
    },
    //审核通过
    passAudit() {
      let passPlanId = qs.stringify({ planIds: this.checkedPlanId.toString() });
      // let _this=this
      // let checkeds = this.checkedPlanId.toString()
      postAjax("taskPlan/auditPass", passPlanId).then(res => {
        if (res.data.code == 200) {
          this.$message.success("已成功审核");
          this.auditList();
        }
      });
    },
    //审核详情
    planAuditInfo(data) {
      this.$router.push({
        name: "planAuditInfo",
        query: {
          planId: data.planId,
          taskId: data.taskId
        }
      });
    
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
    showInfo(row) {
      this.$router.push({
        name: "taskInfo2",
        query: {
          taskId: row.taskId,
          planId: row.planId
        }
      });
        sessionStorage.setItem("pageNum", this.pageNum);
    },
    search() {
      this.is_search = true;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.label-search {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.item-select {
  display: inline-block;
}
</style>
<style>
.el-table th > .cell,
.el-table .cell {
  text-align: center;
}
</style>
