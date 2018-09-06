<template>
  <div class="y_list">
    <el-row >
      <el-col :span="24" style="margin-bottom: 20px;margin-top: -10px">
        <el-button type="warning" plain :disabled="!selectId.length"  @click="passList">审核通过</el-button>
      </el-col>
    </el-row>
    <searchList @searchEvent="searchEvent" :yshcz="true"></searchList>
    <list :ySearch="searchList"  ref="listFun" :yshcz="true" @infoEvent="infoEvent" @infoNewEvent="infoNewEvent" @changeEvent="changeEvent"></list>
    <info :yInfo="select" v-if="select.infoModel" :yshcz="true"></info>
  </div>
</template>

<script>

  import {postA,getA,oUrl} from '../../api/api.js';
  import Schart from 'vue-schart';
  import searchList from '../common/search';
  import list from '../common/list';
  import info from '../common/info';
  import qs from "qs";
  export default {
    components: {
      Schart,
      list,
      searchList,
      info
    },
    data() {
      return {
        searchList:{
          type:"",//任务类型
          typeChild:"",//任务子类型
          status:'',// 任务状态   ''全部任务 00任务未下发 01计划未上报 02计划待审核 03计划未通过 04计划进行中 05任务已完成
          company:'',//单位
          time:'',//任务时间
          text:'',//关键字
        },
        //详情yyyyyyyyyyyyy
        select:{
          planId:'',//点击详情时选择的计划id
          taskId:'',//点击详情时选择的任务id
          infoModel:false,//详情弹窗
          innerVisible:false,//详情审核弹窗
          newInfo:false,//是否为新进展
        },
        data1:[],//图表数据
        options1: {
          title: '总体完成量',
          bgColor: '#607d8b',
          titleColor: '#ffffff',
          fillColor: '#e0f2f1',
          axisColor: '#ffffff',
          contentColor: '#999'
        },
        // urlImg:oUrl(),
        // url:oUrl()+'oa_attachment/download_attachment?id=',

        // auditText:'',//审核说明

        info:{},//详情内容
        // newCycle:[],//最新周期
        // allCycle:[],//全部周期
        markCycle:false,//周期显示标记 true：最新   false：全部
        selectId: [],//列表选中的id
        selectRow:[],
        del_list: [],
        is_search: false,
      }
    },
    created(){},
    methods: {
      //点击搜索
      searchEvent(...data){
        this.searchList.type=data[0].type;
        this.searchList.typeChild=data[0].typeChild;
        this.searchList.status=data[0].status;
        this.searchList.company=data[0].company;
        this.searchList.text=data[0].text;
        this.$refs.listFun.search();
      },
      //点击标题
      infoEvent(taskid,palnid){
        this.select.planId=palnid;
        this.select.taskId=taskid;
        this.select.infoModel=true;
      },
      //点击新进展
      infoNewEvent(taskid,palnid){
        this.select.planId=palnid;
        this.select.taskId=taskid;
        this.select.infoModel=true;
        this.select.newInfo=true;
      },
      changeEvent(selectId,selectRow){
        this.selectId=selectId;
        this.selectRow=selectRow;
      },
      //点击通过审核  1
      passList(){
        this.$confirm("确定要审核通过已选择的计划吗？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj=qs.stringify({'ids':this.selectId.toString(),'planState':'04'});
          postA('oa_task_plan/audit', obj).then((res) => {
            if (res.data.code == 200) {
              this.$message({type: 'success', message: '审核通过成功!'});
              this.$refs.listFun.getSHList();
            } else {
              this.$message.error('审核通过失败，请重试');
            }
          })
        }).catch(() => {
        })
      },
    }
  }
</script>

<style scoped>
  .el-form-item{
    margin-bottom: 0;
  }
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
  .el-dialog__body{
    padding-top: 10px;
  }
  .box-card{
    margin-bottom: 10px;
  }
  .box-card>div{
    padding: 10px 20px!important;
  }
  .y_card_footer span{
    display: inline-block;
    width: 24%;
  }
  .y_color_red{
    color: #F56C6C;
  }
  .y_card_main{
    border-top:1px solid #ebeef5;border-bottom:1px solid #ebeef5;padding: 15px 20px;margin: 8px -20px
  }

  .el-dialog__body>div::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  .el-dialog__body>div::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .el-dialog__body>div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  .el-form{
    margin-right: 10px;
  }
  .el-tabs{
    margin-right: 10px;
  }
  .echarts {
    float: left;
    width: 500px;
    height: 400px;
  }
  .content-title{
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
  }
  .mix-echarts{
    width:900px;
    height:600px;
  }
  .y_un_m_b{
    margin-bottom: -9px;
  }
</style>
