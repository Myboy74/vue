<template>
  <!--有且只有一个根节点-->
  <div class="handle-box">
    <el-row>
      <el-form :inline="true" :model="searchList" class="demo-ruleForm">
        <el-col :span="24" class="y_m_b_15">
          <el-form-item label="任务分类:">
            <el-select v-model="searchList.type" placeholder="任务分类" @change="changeTask">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in taskType" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchList.typeChild" placeholder="任务分类">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in taskTypeChild" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="科室筛选:">-->
            <!--<div class="block">-->
              <!--<el-cascader-->
                <!--placeholder="试试搜索科室名称"-->
                <!--:options="taskCompany"-->
                <!--filterable-->
                <!--:show-all-levels="false"-->
                <!--:clearable="true"-->
                <!--@active-item-change="handleItemChange"-->
                <!--:props="props"-->
                <!--@change="handleChange"-->
              <!--&gt;</el-cascader>-->
            <!--</div>-->
          <!--</el-form-item>-->
          <el-form-item label="科室筛选:">
            <div class="block">
              <el-cascader
                placeholder="试试搜索科室名称"
                :options="taskCompany"
                filterable
                :show-all-levels="false"
                :clearable="true"
                @change="handleChange"
              ></el-cascader>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <template v-if="!yshcz&&!yjzcz&&!my">
          <el-form-item label="任务状态:">
            <el-select v-model="searchList.status" placeholder="任务状态" @change="changeStatus">
              <el-option label="全部任务" :key="" value=""></el-option>
              <el-option v-for="item in taskStatus" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          </template>
          <template v-if="yshcz">
            <el-form-item label="任务状态:">
              <el-select v-model="searchList.status" placeholder="任务状态" @change="changeStatus">
                <el-option label="全部任务" :key="" value=""></el-option>
                <el-option v-if="item.code=='02'||item.code=='03'" v-for="item in taskStatus" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <template v-if="yjzcz">
            <el-form-item label="任务状态:">
              <el-select v-model="searchList.status" placeholder="任务状态" @change="changeStatus">
                <!--<el-option label="全部任务" :key="" value=""></el-option>-->
                <el-option v-if="item.code=='04'" v-for="item in taskStatus" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <template v-if="my">
            <el-form-item label="任务状态:">
              <el-select v-model="searchList.status" placeholder="任务状态" @change="changeStatus">
                <el-option v-if="item.code=='01'||item.code=='03'" v-for="item in taskStatus" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <!-- <template v-if="my04">
            <el-form-item label="任务状态:">
              <el-select v-model="searchList.status" placeholder="任务状态" @change="changeStatus">
                <el-option v-if="item.code=='04'" v-for="item in taskStatus" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </template> -->
          <!--<el-form-item label="任务时间:" >-->
          <!--<div class="block">-->
          <!--<el-date-picker-->
          <!--value-format="yyyy-MM-dd"-->
          <!--v-model="searchList.time"-->
          <!--type="daterange"-->
          <!--range-separator="至"-->
          <!--start-placeholder="开始日期"-->
          <!--end-placeholder="结束日期">-->
          <!--</el-date-picker>-->
          <!--</div>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchList.text"
                      style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  import {postA, getA, oUrl} from '../../api/api.js';

  export default {
    name: 'list',
    props: {
      ySearch: {
        type: Object
      },
      yshcz: {
        type: Boolean
      },
      yjzcz: {
        type: Boolean
      },
      my:{
        type:Boolean
      },
    },
    data() {
      return {
        name: 'searchList',
        taskType:[],//任务类型
        taskTypeChild:[],//任务类型
        taskStatus:[],//任务状态
        taskCompany:[],//单位筛选
        searchList: {
          type: "",//任务类型
          typeChild: "",//任务子类型
          status: '',// 任务状态   ''全部任务 00任务未下发 01计划未上报 02计划待审核 03计划未通过 04计划进行中 05任务已完成
          company: '',//单位
          time: '',//任务时间
          text: '',//关键字
        },
        props: {
          value: 'value',
          children: 'cities'
        },
      }
    },
    created() {
      this.getTaskType();
      this.getTaskStatus();
      this.getTaskCompany();
       if(this.yjzcz){
        this.searchList.status='04';
      }else if(this.my){
        this.searchList.status='01';
      }
    },
    methods: {
      //点击搜索
      search() {
        //把值传上父组件
        this.$emit('searchEvent', this.searchList);
      },
      //修改计划状态
      changeStatus() {
        // this.getList();
      },
      //获取主分类
      getTaskType() {
        getA('oa_data_dictionary/query_data_dictionary_list', {'type': 'task_type'}).then((res) => {
          if (res.data.code == 200) {
            this.taskType = res.data.data;
          }
        })
      },
      //获取子分类
      getTaskTypeChild() {
        getA('oa_data_dictionary/query_data_dictionary_child', {'parentId': this.searchList.type}).then((res) => {
          if (res.data.code == 200) {
            this.taskTypeChild = res.data.data;
          }
        })
      },
      //任务主分类改变时
      changeTask() {
        if (this.searchList.type != '') {
          this.getTaskTypeChild();
        } else {
          this.searchList.typeChild = '';
        }
      },
      //获取状态
      getTaskStatus() {
        getA('oa_data_dictionary/query_data_dictionary_list', {'type': 'task_state'}).then((res) => {
          if (res.data.code == 200) {
            this.taskStatus = res.data.data;
          }
        })
      },
      getTaskCompany() {
        getA('oa_org/query_org_office').then((res) => {
          if (res.data.code == 200) {
            // res.data.data.forEach(function (item) {
            //   item["cities"] = [];
            // });
            this.taskCompany = res.data.data;
          }
        })
      },
      // //获取单位
      // getTaskCompany() {
      //   getA('oa_org/query_org', {'organizationType': 'D'}).then((res) => {
      //     if (res.data.code == 200) {
      //       res.data.data.forEach(function (item) {
      //         item["cities"] = [];
      //       });
      //       this.taskCompany = res.data.data;
      //     }
      //   })
      // },
      //获取单位子分类
      // handleItemChange(val) {
      //   getA('oa_org/query_org', {'parentId': val[0]}).then((res) => {
      //     if (res.data.code == 200) {
      //       this.taskCompany.forEach(function (item) {
      //         if (item.id == val) {
      //           item.cities = res.data.data;
      //         }
      //       })
      //     }
      //   })
      // },
      //获取改变单位选择的值
      handleChange(value) {
        this.searchList.company = value[0];
      },
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0;
  }

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

  .el-dialog__body {
    padding-top: 10px;
  }

  .box-card {
    margin-bottom: 10px;
  }

  .box-card > div {
    padding: 10px 20px !important;
  }

  .y_card_footer span {
    display: inline-block;
    width: 24%;
  }

  .y_color_red {
    color: #F56C6C;
  }

  .y_card_main {
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    padding: 15px 20px;
    margin: 8px -20px
  }

  .el-dialog__body > div::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  .el-dialog__body > div::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .el-dialog__body > div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  .el-form {
    margin-right: 10px;
  }

  .el-tabs {
    margin-right: 10px;
  }

  .echarts {
    float: left;
    width: 500px;
    height: 400px;
  }

  .content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
  }

  .mix-echarts {
    width: 900px;
    height: 600px;
  }

  .y_un_m_b {
    margin-bottom: -9px;
  }
</style>
