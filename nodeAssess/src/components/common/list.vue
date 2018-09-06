<template>
    <div class="y_list">
    <div class="table">
        <el-table :data="list" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" :key="ySearch.status">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="任务标题" >
                <a class="y_active" slot-scope="scope"  @click="showInfo(scope.row.taskId,scope.row.id)">{{ scope.row.taskTitle }}</a>
            </el-table-column>
            <el-table-column prop="responsibleOrganizationName" label="责任科室" ></el-table-column>
          <!--计划未上报-->
            <template v-if="ySearch.status=='01'">
              <el-table-column prop="useTime" label="下发时间"  ></el-table-column>
            </template>
            <el-table-column label="考核方式" >
                <span slot-scope="scope">{{ scope.row.evaluationMode==1?'定性考核':'定量考核' }}</span>
            </el-table-column>
            <el-table-column label="最新进展">
              <span slot-scope="scope">{{ scope.row.lastProgress?scope.row.lastProgress:'——' }}</span>
            </el-table-column>
            <el-table-column label="任务整体进度">
              <span slot-scope="scope">{{ scope.row.percentage?scope.row.percentage:'——' }}</span>
            </el-table-column>
            <el-table-column label="任务状态">
                <a slot-scope="scope">{{ getStatus(scope.row.planState) }}</a>
            </el-table-column>
          <template v-if="ycz">
            <!--计划未下发-->
          <el-table-column label="操作" v-if="ySearch.status=='00'">
            <a class="y_active" slot-scope="scope" @click="useTask(scope.row.id,scope.row.isReportPlan)">{{scope.row.planState=='00'?'下发':''}}</a>
          </el-table-column>
            <!--计划进行中-->
            <el-table-column  label="进展考核" v-if="ySearch.status=='04'">
              <a slot-scope="scope" :class="{y_color_red:scope.row.progressState=='0'}"
                 @click="showNewInfo(scope.row.taskId,scope.row.id,scope.row.progressState)">
                {{scope.row.progressState=='0'?'新进展':'已考核'}}</a>
            </el-table-column>
          </template>
           <template v-if="my">
            <!--上报计划-->
          <el-table-column label="操作" v-if="ySearch.status=='01'">
            <a class="y_active" slot-scope="scope" @click="reportTask(scope.row.taskId,scope.row.id)">{{scope.row.planState=='01'?'上报计划':''}}</a>
          </el-table-column>
          <el-table-column label="操作" v-if="ySearch.status=='03'">
            <a class="y_active" slot-scope="scope" @click="updateTask(scope.row.taskId,scope.row.id)">{{scope.row.planState=='03'?'修改计划':''}}</a>
          </el-table-column>
            <!--计划未通过-->
          </template>

          <template v-if="yshcz" >
            <el-table-column  label="操作" >
            <a class="y_active" slot-scope="scope" @click="showInfo(scope.row.taskId,scope.row.id)">{{scope.row.planState=='02'?'开始审核':'修改审核'}}</a>
            </el-table-column>
          </template>
          <template v-if="yjzcz" >
            <el-table-column  label="操作" >
              <a class="y_active" slot-scope="scope" @click="addNewInfo(scope.row.taskId,scope.row.id)">{{scope.row.planState=='04'?'上报进展':''}}</a>
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
    </div>
</template>

<script>
    import {postA,getA,oUrl} from '../../api/api.js';
    import qs from "qs";
    export default {
        name:'list',
        props: {
          ySearch: {
            type: Object
          },
          ycz:{
            type:Boolean
          },
          //审核操作
          yshcz:{
            type:Boolean
          },
          //进度上报
          yjzcz:{
            type:Boolean
          },
          //我负责的
          ywfz:{
            type:Boolean
          },
          my:{
            type:Boolean
          }
        },
        data() {
            return {
                list:[],
                urlImg:oUrl(),
                url:oUrl()+'oa_attachment/download_attachment?id=',
                page:1,
                pageSize:15,
                total:0,
                //详情
                select:{
                  planId:'',//点击详情时选择的计划id
                  status:'',//点击详情时选择的状态值
                },
                centerDialogVisible:false,//上报计划弹层
                auditText:'',//审核说明
                info:{},//详情内容
                newCycle:[],//最新周期
                allCycle:[],//全部周期
                markCycle:false,//周期显示标记 true：最新   false：全部
                selectId: [],//列表选中的id
                selectRow:[],
                del_list: [],
                is_search: false,
            }
        },
        created(){
            if(this.yshcz){
              this.getSHList();
            }else if(this.ywfz){
              this.getWFZList();
            } else {
              this.getList();
            }
            eventBus.$on('change', () => { //eventBus接收事件
              if(this.yshcz){
                this.getSHList();
              }else if(this.ywfz){
                this.getWFZList();
              }else {
                this.getList();
              }
          });
        },
        methods: {
            //获取列表
            judge(data){
              //taxStatus 布尔值
              return data.planState=='02' ? '开始审核' : '修改审核'
            },
            getList(){
                var _this=this.ySearch;
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
                        console.log( this.list);

                        this.pageSize = res.data.data.pageSize;
                        this.total = res.data.data.total;
                    }
                })
            },
            getSHList(){
            var _this=this.ySearch;
            getA('oa_task_plan/queryTaskPlanByAudit',
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
          getWFZList(){
            var _this=this.ySearch;
            getA('oa_task_plan/queryTaskPlanByUserId',
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
            //点击搜索
            search(){
              if(this.yshcz){
                this.getSHList();
              }else if(this.ywfz){
                this.getWFZList();
              }else {
                this.getList();
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
            //  标题 点击事件
            showInfo(taskId,planId){
                this.markCycle=false;
                if(taskId&&planId) {
                  this.$emit('infoEvent', taskId,planId);
                }else{
                  this.$message.error('服务器错误，请重试');
                }
            },
            //点击最新进展 1
            showNewInfo(taskId,planId,mark){
                if(mark=='0') {
                    if (taskId&&planId) {
                      this.$emit('infoNewEvent', taskId,planId);
                        // this.getInfo(taskId, planId);
                    }
                }else{
                    return false;
                }
            },
          reportTask(taskId,planId){
            this.$emit('shangbaoEvent', taskId,planId);
          },
          updateTask(taskId,planId){
            this.$emit('updateEvent', taskId,planId);
          },
            // 上报计划关闭弹层
             handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            //点击上报进展
            addNewInfo(taskId,planId){
              this.$emit('addNewEvent', taskId,planId);
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
                            if(this.yshcz){
                              this.getSHList();
                            }else {
                              this.getList();
                            }
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
                        if(this.yshcz){
                          this.getSHList();
                        }else {
                          this.getList();
                        }
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
                val.forEach(function (item) {
                    _this.selectId.push(item.id);
                });
              this.$emit('changeEvent', this.selectId,this.selectRow);
            },
            //分页
            handleCurrentChange(val){
                this.page = val;
                if(this.yshcz){
                  this.getSHList();
                }else if(this.ywfz){
                  this.getWFZList();
                }
                else {
                  this.getList();
                }
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
