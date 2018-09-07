<template>
  <div class="y_list">
    <div class="table">
      <div class="handle-box">
        <el-row >
          <el-col :span="24" class="y_m_b_15">
            <el-button type="primary" plain  @click="$router.push('/newTask')" >新建任务</el-button>
            <el-button type="success" plain @click="edit" :disabled="selectId.length!=1" v-if="searchList.status=='00'" >编辑任务</el-button>
            <!--在“计划待审核”及“计划未通过”页面可点击操作，其他页面处于不可操作状态-->
            <el-button type="warning" plain :disabled="!selectId.length" v-if="searchList.status=='02'||searchList.status=='03'" @click="passList">审核通过</el-button>
            <el-button type="danger" plain :disabled="!selectId.length" @click="delList">删除任务</el-button>
            <el-button type="info" plain :disabled="!selectId.length" @click="finishList" v-if="searchList.status=='04'">完成任务</el-button>
          </el-col>
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
                  <el-option label="全部"  value=""></el-option>
                  <el-option v-for="item in taskTypeChild" :key="item.id" :label="item.name"  :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="单位筛选:">
                <div class="block">
                  <el-cascader
                    placeholder="试试搜索单位名称"
                    :options="taskCompany"
                    filterable
                    :show-all-levels="false"
                    :clearable="true"
                    @active-item-change="handleItemChange"
                    :props="props"
                    @change="handleChange"
                  ></el-cascader>
                </div>
              </el-form-item>

            </el-col>
            <el-col :span="24">
              <el-form-item label="任务状态:">
                <el-select v-model="searchList.status" placeholder="任务状态" @change="changeStatus">
                  <el-option label="全部任务" :key="" value=""></el-option>
                  <el-option v-for="item in taskStatus" :key="item.code" :label="item.name"  :value="item.code"></el-option>
                </el-select>
              </el-form-item>
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
              <el-form-item >
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchList.text" style="width: 400px"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <el-table :data="list" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" :key="searchList.status">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="任务标题" >
          <a class="y_active" slot-scope="scope"  @click="showInfo(scope.row.taskId,scope.row.id)">{{ scope.row.taskTitle }}</a>
        </el-table-column>
        <el-table-column prop="responsibleOrganizationName" label="责任单位" ></el-table-column>
        <!--全部任务列表 ，计划进行中，任务已完成-->
        <template v-if="searchList.status==''||searchList.status=='04'||searchList.status=='05'">
          <el-table-column label="考核方式" >
            <span slot-scope="scope">{{ scope.row.evaluationMode==1?'定性考核':'定量考核' }}</span>
          </el-table-column>
          <el-table-column prop="lastProgress" label="最新进展"></el-table-column>
          <el-table-column prop="percentage" label="任务整体进度"></el-table-column>
          <el-table-column label="任务状态" v-if="searchList.status!='04'">
            <a slot-scope="scope">{{ getStatus(scope.row.planState) }}</a>
          </el-table-column>
          <el-table-column  label="进展考核" v-if="searchList.status=='04'">
            <a slot-scope="scope" :class="{y_color_red:scope.row.progressState=='0'}" @click="showNewInfo(scope.row.taskId,scope.row.id,scope.row.progressState)">
              {{scope.row.progressState=='0'?'新进展':'已考核'}}</a>
          </el-table-column>
        </template>
        <!--任务未下发-->
        <template v-if="searchList.status=='00'">
          <el-table-column prop="createTime" label="创建时间"  ></el-table-column>
          <el-table-column label="任务下发">
            <a class="y_active" slot-scope="scope" @click="useTask(scope.row.id,scope.row.isReportPlan)">下发</a>
          </el-table-column>
        </template>
        <!--计划未上报-->
        <template v-if="searchList.status=='01'">
          <el-table-column prop="useTime" label="下发时间"  ></el-table-column>
        </template>
        <!--计划待审核，计划审核未通过-->
        <template v-if="searchList.status=='02'||searchList.status=='03'">
          <el-table-column prop="planReportTime" label="上报时间"  ></el-table-column>
          <el-table-column label="计划审核">
            <a class="y_active" slot-scope="scope" @click="showInfo(scope.row.taskId,scope.row.id)">{{searchList.status=='02'?'开始审核':'修改审核'}}</a>
          </el-table-column>
        </template>
      </el-table>
      <div class="pagination">
        <!--分页-->
        <el-pagination @current-change="handleCurrentChange"
                       :current-page.sync="page" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total" class='y_page'>
        </el-pagination>
      </div>
    </div>
    <!--弹窗-->
    <!--<el-dialog title="进度考核" :visible.sync="infoModel" width="70%" top="4vh" fullscreen="true" :modal="false" :close-on-click-modal="false" style="float: right;margin: 0">-->
    <el-dialog :title="getStatus(select.status)" :visible.sync="infoModel" width="70%" top="4vh" >
      <div style="max-height:570px;overflow-y: auto; padding-right: 10px;" v-if="infoModel">
        <el-form >
          <el-form-item label="任务分类：" class="y_text_left" >
            <div>{{info.taskTypeName}}</div>
          </el-form-item>
          <el-form-item label="任务主题：" class="y_text_left" >
            <div>{{info.taskTitle}}</div>
          </el-form-item>
          <el-form-item label="责任单位：" class="y_text_left">
            <div>{{info.taskPlanVOS[0].responsibleOrganizationName}}</div>
          </el-form-item>
          <el-col :span="24">
            <template v-if="select.status!='00'">
              <el-col :span="12">
                <el-form-item label="下发日期：" class="y_text_left">
                  <div>{{info.taskPlanVOS[0].useTime}}</div>
                </el-form-item>
              </el-col>
            </template>
            <el-col :span="12">
              <el-form-item label="完成时限：" class="y_text_left">
                <div>{{info.taskPlanVOS[0].planEndTime}}</div>
              </el-form-item>
            </el-col>
          </el-col>
          <template v-if="select.status=='04'||select.status=='05'">
            <el-col :span="12">
              <el-form-item label="计划审核通过时间：" class="y_text_left">
                <div>{{info.taskPlanVOS[0].planAuditTime}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label=" 审核人：" class="y_text_left">
                <div>{{info.taskPlanVOS[0].planAuditor?info.taskPlanVOS[0].planAuditor:'李立'}} </div>
              </el-form-item>
            </el-col>
          </template>
          <el-col :span="24">
            <el-form-item label="任务描述：" class="y_text_left y_ms" >
              <div>{{info.taskTarget}}
              </div>
            </el-form-item>
          </el-col>
          <el-form-item label="任务附件资料：" class="y_text_left">
            <div v-if="!info.attachments.length">暂无</div>
          </el-form-item>
          <el-form-item  v-if="info.attachments.length" >
            <div class="y_img" v-for="item in info.attachments" :key="item.id">
              <div class="y_img" v-html="fileType(item.attachmentName,item.id)"></div>
              <div class="y_down"><a :href="url+item.id">下载</a></div>
            </div>
          </el-form-item>
          <el-form-item label="备注：" class="y_text_left y_ms_xs" >
            <div>{{info.remark}}</div>
          </el-form-item>
          <template v-if="select.status!='02'&&select.status!='03'">
            <el-form-item label="计划附件资料：">
              <div v-if="!info.taskPlanVOS[0].attachments.length">暂无</div>
            </el-form-item>
            <el-form-item  v-if="info.taskPlanVOS[0].attachments.length" >
              <div class="y_img" v-for="item in info.taskPlanVOS[0].attachments" :key="item.id">
                <div class="y_img" v-html="fileType(item.attachmentName,item.id)"></div>
                <div class="y_down"><a :href="url+item.id">下载</a></div>
              </div>
            </el-form-item >
          </template>

          <!--计划进行中 已完成 &&定量考核&&-->
          <!--定量考核 0   定性考核 1-->
          <template  v-if="info.evaluationMode=='0'&&data1.length">
            <template v-if="(select.status=='04'&&!markCycle)||select.status=='05'">
              <el-form-item label="任务进度（任务进行中）：" class="y_text_left">
              </el-form-item>
              <el-form-item class="y_text_left">
                <schart canvasId="line" width="550" height="300" :data="data1" type="line" :options="options1"></schart>
              </el-form-item>
            </template>
          </template>
        </el-form>
        <!--计划进行中-->
        <template  v-if="select.status=='04'">
          <!--计划进行中  进展考核  展示该计划下的最新周期-->
          <el-tabs type="border-card" v-if="newCycle.length&&markCycle">
            <el-tab-pane :label="'考核'+(index+1)" v-for="(item,index) in newCycle" :key="item.id">
              <div>
                <el-card class="box-card">
                  <div  class="text item">
                    <div><span>{{item.periodBeginTime}}—{{item.periodEndTime}}  计划</span></div>
                    <div  class="y_card_main">
                      {{item.periodContent}}
                    </div>
                    <div class="y_card_footer">
                      <span>分管负责人：{{item.responsiblePersonName}}</span>
                      <span>责任科室：{{item.responsibleOfficeName}}</span>
                      <span>科室负责人：{{item.responsibleOfficePersonName}}</span>
                      <span>具体负责人：{{item.personName}}</span>
                    </div>
                  </div>
                </el-card>
                <el-card class="box-card">
                  <div  class="text item" >
                    <div>计划进度
                      <!--<span class="y_color_red">（2018-04-01 17:36）</span>-->
                    </div>
                    <div class="y_card_main" :class="{y_un_m_b:info.evaluationMode!='0'}">
                      {{item.progressVOS[0].planProgressContent}}
                    </div>
                    <!--定量考核-->
                    <div class="y_card_footer" v-if="info.evaluationMode=='0'">
                      <div>任务完成百分比：<el-progress :percentage="item.progressVOS[0].planCompletionPercentage?item.progressVOS[0].planCompletionPercentage:0" ></el-progress></div>
                    </div>
                  </div>
                </el-card>
                <div style="line-height: 40px">
                  <div>纪实材料：</div>
                  <div class="y_img" v-for="item in item.progressVOS[0].attachments" :key="item.id">
                    <div class="y_img" v-html="fileType(item.attachmentName,item.id)"></div>
                    <div class="y_down"><a :href="url+item.id">下载</a></div>
                  </div>
                  <!--<div>-->
                  <!--&lt;!&ndash;{{item.progressVOS[0].attachments}}&ndash;&gt;-->
                  <!--<img class="y_img" src="../../../static/img/img.jpg">-->
                  <!--<img class="y_img" src="../../../static/img/img.jpg">-->
                  <!--<img class="y_img" src="../../../static/img/img.jpg">-->
                  <!--</div>-->
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
        <template v-if="(select.status=='04'&&!markCycle)||select.status=='05'">
          <!--计划进行中  详情页面  展示该计划下的所有周期-->
          <el-tabs type="border-card" v-if="allCycle.length">
            <el-tab-pane
              v-for="(item,index) in allCycle"
              :key="index"
              :label="'考核'+(index+1)">
              <div>
                <el-card class="box-card">
                  <div  class="text item">
                    <div><span>{{item.periodBeginTime}}—{{item.periodEndTime}}  计划</span></div>
                    <div  class="y_card_main">
                      {{item.periodContent}}
                    </div>
                    <div class="y_card_footer">
                      <span>分管负责人：{{item.responsiblePersonName}}</span>
                      <span>责任科室：{{item.responsibleOfficeName}}</span>
                      <span>科室负责人：{{item.responsibleOfficePersonName}}</span>
                      <span>具体负责人：{{item.personName}}</span>
                    </div>
                  </div>
                </el-card>
                <el-card class="box-card" v-if="item.progressVOS.length">
                  <div  class="text item">
                    <div>计划进度
                      <span class="y_color_red" v-if="item.reportTime">（{{item.reportTime}}）</span>
                    </div>
                    <div class="y_card_main" :class="{y_un_m_b:info.evaluationMode!='0'}">
                      {{item.progressVOS[0].planProgressContent}}
                    </div>
                    <!--定量考核-->
                    <div class="y_card_footer" v-if="info.evaluationMode=='0'">
                      <div>任务完成百分比：<el-progress :percentage="item.progressVOS[0].planCompletionPercentage?item.progressVOS[0].planCompletionPercentage:0" ></el-progress></div>
                    </div>
                  </div>
                </el-card>
                <div style="line-height: 40px" v-if="item.progressVOS.length">
                  <div>纪实材料：</div>
                  <div class="y_img" v-for="item in item.progressVOS[0].attachments" :key="item.id">
                    <div class="y_img" v-html="fileType(item.attachmentName,item.id)"></div>
                    <div class="y_down"><a :href="url+item.id">下载</a></div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
        <!--计划审核中,审核未通过-->
        <template  v-if="select.status=='02'||select.status=='03'">
          <div>
            <div style="margin-bottom: 10px" class="y_color_red" v-if="select.status=='02'">
                            <span v-if="info.taskPlanVOS[0].planAuditTime||info.taskPlanVOS[0].spare3">任务计划审核（
                            <span>{{info.taskPlanVOS[0].planAuditTime}}</span>
                            <span v-if="info.taskPlanVOS[0].spare3">第{{info.taskPlanVOS[0].spare3}}次上报</span>）
                            </span>
            </div>
            <!--<div style="margin-bottom: 10px" class="y_color_red" v-if="select.status=='03'">任务计划审核（未通过审核）</div>-->
            <el-card class="box-card" v-for="(item,index) in allCycle" :key="item.id">
              <div  class="text item">
                <div>{{item.periodBeginTime}}—{{item.periodEndTime}}
                  <!--<span class="y_color_red">（有修改）</span>-->
                </div>
                <div  class="y_card_main">
                  {{item.periodContent}}
                </div>
                <div class="y_card_footer">
                  <span>分管负责人：{{item.responsiblePersonName}}</span>
                  <span>责任科室：{{item.responsibleOfficeName}}</span>
                  <span>科室负责人：{{item.responsibleOfficePersonName}}</span>
                  <span>具体负责人：{{item.personName}}</span>
                </div>
              </div>
            </el-card>
            <div style="line-height: 40px">
              <div>计划附件资料：<span v-if="!info.taskPlanVOS[0].attachments.length">暂无</span></div>
              <div class="y_img"  v-for="item in info.taskPlanVOS[0].attachments" :key="item.id" v-if="info.taskPlanVOS[0].attachments.length">
                <div class="y_img" v-html="fileType(item.attachmentName,item.id)"></div>
                <div class="y_down"><a :href="url+item.id">下载</a></div>
              </div>
              <el-form>
                <el-form-item label="备注：" class="y_text_left y_ms_xs" >
                  <div>{{info.taskPlanVOS[0].spare1}}</div>
                </el-form-item>
                <el-form-item label="原因：" class="y_text_left y_ms_xs" v-if="select.status=='03'" >
                  <div >{{info.taskPlanVOS[0].spare2}}</div>
                </el-form-item>
                <el-form-item label="审核人：" class="y_text_left" >
                  <div>李立</div>
                </el-form-item>
                <!--计划审核中-->
              </el-form>
            </div>
          </div>
        </template>
      </div>
      <template  v-if="select.status=='02'||select.status=='03'">
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="infoModel = false">取 消</el-button>
          <el-button type="success"  size="medium"  @click="passList(true)" plain>通过</el-button>
          <el-button type="warning"  size="medium"  @click="innerVisible=true" plain>不通过</el-button>
        </div>
      </template>
      <!--审核说明-->
      <el-dialog
        width="30%"
        title="审核说明"
        :visible.sync="innerVisible"
        append-to-body>
        <el-input type="textarea" :rows="3" v-model="auditText" placeholder="请输入审核说明"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="innerVisible = false">取 消</el-button>
          <el-button type="primary"  size="medium" @click="noPassList" plain>确定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import {postA,getA,oUrl} from '../../api/api.js';
  import Schart from 'vue-schart';
  import qs from "qs";
  export default {
    components: {
      Schart
    },
    data() {
      return {
        select:{
          // taskId:'',//点击详情时选择的任务id
          planId:'',//点击详情时选择的计划id
          status:'',//点击详情时选择的状态值
        },
        list:[],
        urlImg:oUrl(),
        url:oUrl()+'oa_attachment/download_attachment?id=',
        taskType:[],//任务类型
        taskTypeChild:[],//任务类型
        taskStatus:[],//任务状态
        taskCompany:[],//单位筛选
        auditText:'',//审核说明
        infoModel:false,//详情弹窗
        info:{},//详情内容
        newCycle:[],//最新周期
        allCycle:[],//全部周期
        markCycle:false,//周期显示标记 true：最新   false：全部
        selectId: [],//列表选中的id
        selectRow:[],
        del_list: [],
        is_search: false,
        innerVisible:false,
        searchList:{
          type:"",//任务类型
          typeChild:"",//任务子类型
          status:'',// 任务状态   ''全部任务 00任务未下发 01计划未上报 02计划待审核 03计划未通过 04计划进行中 05任务已完成
          company:'',//单位$options
          time:'',//任务时间
          text:'',//关键字
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
        props: {
          value: 'value',
          children: 'cities'
        },
        page:1,
        pageSize:15,
        total:0
      }
    },
    created(){
      this.getTaskType();
      this.getTaskStatus();
      this.getTaskCompany();
      this.getList();
    },
    // computed: {
    //
    // },
    methods: {
      edit(){
        this.$router.push({
          name: "editTask",
          params: {
            id: this.selectId.toString()
          }
        });
      },
      statusClass(status){
        switch (status){
          case "3": return "danger";break;
          case "2": return "warning";break;
          default: return "";
        }
      },
      getStatus(status){
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
      //获取列表
      getList(){
        var _this=this.searchList;
        console.log(_this.company);
        getA('oa_task_plan/queryTaskPlanHasPercentages',
          {
            'taskTypeParentId':_this.type,
            'taskTypeId':_this.typeChild,
            'responsibleOrganizationId':_this.company,
            'status':_this.status,
            'taskTitle':_this.text,
            'pageNum':this.page,
          }).then((res) => {
          if (res.data.code == 200) {
            this.list = res.data.data.dataList;
            this.pageSize = res.data.data.pageSize;
            this.total = res.data.data.total;
          }
        })
      },
      //获取分类
      getTaskType(){
        getA('oa_data_dictionary/query_data_dictionary_list', {'type':'task_type'}).then((res) => {
          if (res.data.code == 200) {
            this.taskType=res.data.data;
          }
        })
      },
      //获取子分类
      getTaskTypeChild(){
        getA('oa_data_dictionary/query_data_dictionary_child', {'parentId': this.searchList.type}).then((res) => {
          if (res.data.code == 200) {
            this.taskTypeChild=res.data.data;
          }
        })
      },
      //任务主分类改变时
      changeTask(){
        if(this.searchList.type!='') {
          this.getTaskTypeChild();
        }else{
          this.searchList.typeChild='';
        }
      },
      //获取状态
      getTaskStatus(){
        getA('oa_data_dictionary/query_data_dictionary_list', {'type':'task_state'}).then((res) => {
          if (res.data.code == 200) {
            this.taskStatus=res.data.data;
          }
        })
      },
      //获取单位
      getTaskCompany(){
        getA('oa_org/query_org',{'organizationType':'D'}).then((res) => {
          if (res.data.code == 200) {
            res.data.data.forEach(function (item) {
              item["cities"]=[];
            });
            this.taskCompany=res.data.data;
          }
        })
      },
      //获取单位子分类
      handleItemChange(val) {
        getA('oa_org/query_org',{'parentId':val[0]}).then((res) => {
          if (res.data.code == 200) {
            this.taskCompany.forEach(function (item) {
              if(item.id==val){
                item.cities=res.data.data;
              }
            })
          }
        })
      },
      //获取改变单位选择的值
      handleChange(value) {
        this.searchList.company=value[1];
      },
      //修改计划状态
      changeStatus(){
        this.getList();
      },
      //点击搜索
      search(){
        this.getList();
      },
      //  标题 点击事件
      showInfo(taskId,planId){
        this.markCycle=false;
        if(taskId) {
          this.getInfo(taskId,planId);
        }
      },
      //点击最新进展 1
      showNewInfo(taskId,planId,mark){
        this.markCycle=true;
        if(mark=='0') {
          if (taskId) {
            this.getInfo(taskId, planId);
          }
        }else{
          return false;
        }
      },
      //获取详情 1
      getInfo(taskId,planId){
        var _this=this;
        _this.select.planId=planId;
        getA('oa_task_plan/fetchTaskById', {'taskId': taskId,'planId':planId}).then((res) => {
          if (res.data.code == 200) {

            this.select.status = res.data.data.taskPlanVOS[0].planState;
            this.info = res.data.data;
            var obj=res.data.data.taskPlanVOS[0].periodVOS;//全部周期
            _this.newCycle=[];//最新周期
            _this.allCycle=obj;
            if(obj.length){
              obj.forEach(function (item) {
                if(item.progressVOS.length){
                  if(item.progressVOS[0].progressState=='0') {
                    _this.newCycle.push(item);
                  }
                }
              })
            }
            this.infoModel = true;
          }else{
            this.$message.error('服务器错误，请重试');
          }
        });
        this.getEchart(planId);
      },
      //点击下发任务 1
      useTask(id,status){
        var planState="";
        if(status=='1'){
          planState='01'
        }else{
          planState='04'
        }
        postA('oa_task_plan/use_task_plan', qs.stringify({id:id,'planState':planState})).then((res) => {
          if (res.data.code == 200) {
            this.$message({type: 'success', message: '下发成功!'});
            this.getList();
          } else {
            this.$message.error('下发失败，请重试');
          }
        })
      },
      //点击通过审核  1
      passList(mark){
        var ids="";
        var str="";
        if(mark){
          //单独审核
          this.infoModel = false;
          ids=this.select.planId;
          str="确定要审核通过此计划吗？"
        }else{
          //批量审核
          ids=this.selectId.toString();
          str="确定要审核通过已选择的计划吗？"
        }
        this.$confirm(str, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj=qs.stringify({'ids':ids,'planState':'04'});
          postA('oa_task_plan/audit', obj).then((res) => {
            if (res.data.code == 200) {
              this.$message({type: 'success', message: '审核通过成功!'});
              this.getList();
            } else {
              this.$message.error('审核通过失败，请重试');
            }
          })
        }).catch(() => {
        })
      },
      //点击不通过审核
      noPassList(){
        let obj1=qs.stringify({'ids':this.select.planId,'planState':'03','auditContent':this.auditText});
        postA('oa_task_plan/audit', obj1).then((res) => {
          if (res.data.code == 200) {
            this.$message({type: 'success', message: '操作成功!'});
            this.infoModel = false;
            this.auditText="";
            this.innerVisible = false;
            this.getList();
          } else {
            this.$message.error('操作成功，请重试');
          }
        })
      },
      //点击删除 1
      delList(){
        this.$confirm('确定要删除已选择的任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getA('oa_task_plan/delete_task_plan', {id: this.selectId.toString()}).then((res) => {
            if (res.data.code == 200) {
              this.$message({type: 'success', message: '删除成功!'});
              this.getList();
            } else {
              this.$message.error('删除失败，请重试');
            }
          })
        }).catch(() => {
        })
      },
      //点击完成任务 1
      finishList(){
        let obj=qs.stringify({ids: this.selectId.toString(),planState:'05'});
        postA('oa_task_plan/end_task_plan', obj).then((res) => {
          if (res.data.code == 200) {
            this.$message({type: 'success', message: '操作成功!'});
            this.getList();
          } else {
            this.$message.error('操作失败，请重试');
          }
        })
      },
      //checked 复选框改变
      handleSelectionChange(val) {
        var _this=this;
        _this.selectId=[];
        _this.selectRow=val;
        // console.log(val)
        val.forEach(function (item) {
          _this.selectId.push(item.id);
          // _this.planId.push(item.id);
        });
      },
      //分页
      handleCurrentChange(val){
        this.page = val;
        this.getList();
      },
      //  判断文件类型
      fileType(file,id){
        if(file&&id) {
          let i = file.lastIndexOf(".");
          if (i > -1) {
            let type = file.substring(i);
            switch (type) {
              case '.png':
              case '.jpg':
              case '.jpeg':
              case '.gif':
              case '.bmp':
                return `<img  src="${this.urlImg}oa_attachment/download_attachment?id=${id}">`;
                break;
              case '.xls':
              case '.xlsx':
                return '<img  src="../../../static/img/elx.png">';
                break;
              case '.doc':
              case '.docx':
                return '<img  src="../../../static/img/doc.png">';
                break;
              case '.pdf':
                return '<img src="../../../static/img/pdf.png">';
                break;
              case '.ppt':
              case '.pptx':
                return '<img src="../../../static/img/ppt.png">';
                break;
              default:
                return '';
            }
          }
        }
      },
      //  获取详情图表
      getEchart(id){
        getA('oa_task_plan/queryPeriodLastPercentage', {'planId':id}).then((res) => {
          if (res.data.code == 200) {
            var _this=this;
            _this.data1=[];
            for(var i=0;i<res.data.data.length;i++){
              _this.data1.push({'name':i+1,'value':res.data.data[i].lastPercentage})
            }
            console.log(_this.data1)
          }
        })
      }
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
