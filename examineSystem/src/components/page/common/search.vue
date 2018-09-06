<template>

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
            <div class="item-select"  v-if="!user">
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
                <label class="label-search" v-if="!stateSearch">任务状态:</label>
                <el-select v-model="searchInfo.statusvalue" placeholder="全部" v-if="!stateSearch">
                    <el-option
                    v-for="item in optionsStatus"
                    :key="item.dicCode"
                    :label="item.dicName"
                    :value="item.dicCode">
                    </el-option>
                </el-select>
                
                <el-input v-model="searchInfo.select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="searchInfor">搜索</el-button>
            </div>  
            
           
            
        </div>
</template>

<script>
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
export default {
  props:['user','stateSearch'],
  data() {
    return {
      is_search: false, 
      state:"",

      optionsFrist: [], //任务类型
      optionsSecond: [], //任务类型子
      optionsDuty: [], //责任科室
      optionsStatus: [], //任务状态
      searchInfo: {
        fristvalue: "", //任务类型
        secondvalue: "", //任务类型子选项
        dutyvalue: "", //责任科室
        statusvalue: "", //任务状态
        select_word: "" //搜索关键词
       
      }
    };
  },
  created() {
    this.getTaskType();
    this.getSection();
    this.getstatus();
  },

  methods: {
    //获取任务分类
    getTaskType() {
      getAjax("taskType/queryTaskType", {
        parentId: "0"
      }).then(res => {
        if (res.data.code == 200) {
          this.optionsFrist = res.data.data;
          this.optionsFrist.unshift({taskTypeName:'全部',taskTypeId:''})
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
          this.optionsSecond.unshift({taskTypeName:'全部',taskTypeId:''})
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
          this.optionsDuty.unshift({orgName:'全部',orgId:''})
          if (res.data.data.length) {
            // this.searchInfo.dutyvalue = res.data.data[0].orgId;
          }
        }
      });
    },
    //获取任务状态
    getstatus() {
      let _this = this;
      getAjax("dic/queryPlanStatus").then(res => {
        if (res.data.code == 200) {
          this.optionsStatus = res.data.data;
          this.optionsStatus.unshift({dicName:'全部',dicCode:''})
          if (res.data.data.length) {
            // this.searchInfo.statusvalue = res.data.data[0].dicCode;
          }
        }
      });
    },
    //向父组件传递参数
    searchInfor() {
      this.is_search = true;
      this.$emit("searchEvent", this.searchInfo);
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
