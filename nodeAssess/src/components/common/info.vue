<template>
  <div>
  <el-dialog :title="getStatus(status)" :visible.sync="yInfo.infoModel" width="70%" top="4vh" :key="yInfo.planId">
    <div style="max-height:570px;overflow-y: auto; padding-right: 10px;" v-if="yInfo.infoModel">
      <el-form >
        <el-form-item label="任务分类：" class="y_text_left" >
          <div>{{info.taskTypeName}}</div>
        </el-form-item>
        <el-form-item label="任务主题：" class="y_text_left" >
          <div>{{info.taskTitle}}</div>
        </el-form-item>
        <el-form-item label="责任单位：" class="y_text_left">
          <div>{{infoPlan.responsibleOrganizationName}}</div>
        </el-form-item>
        <el-col :span="24">
          <template v-if="status!='00'">
            <el-col :span="12">
              <el-form-item label="下发日期：" class="y_text_left">
                <div>{{infoPlan.useTime}}</div>
              </el-form-item>
            </el-col>
          </template>
          <el-col :span="12">
            <el-form-item label="完成时限：" class="y_text_left">
              <div>{{missionDeadline}}</div>
            </el-form-item>
          </el-col>
        </el-col>
        <!--进行中，已完成的-->
        <template v-if="status=='04'||status=='05'">
          <el-col :span="12">
            <el-form-item label="计划审核通过时间：" class="y_text_left">
              <div>{{infoPlan.planAuditTime}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 审核人：" class="y_text_left">
              <div>{{infoPlan.planAuditorName}} </div>
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
        <el-form-item  v-if="info.attachments.length">
          <div class="y_img" v-for="item in info.attachments" :key="item.id">
            <div class="y_img" v-html="fileType(item.attachmentName,item.id)"></div>
            <div class="y_down"><a :href="url+item.id">下载</a></div>
          </div>
        </el-form-item>
        <!-- <el-form-item label="备注：" class="y_text_left y_ms_xs" >
          <div>{{infoPlan.remark}}</div>
        </el-form-item> -->
        <!--以上为公用部分详情   计划未下发 计划未上报-->

        <!--计划不为待审核和未通过时 计划附件的显示方式  （计划为待审核和未通过时 显示方式不同 参照下面 status=='02'||status=='03'）-->
        <template v-if="status!='02'&&status!='03'">
          <el-form-item label="计划附件资料：">
            <div v-if="!infoPlan.attachments.length">暂无</div>
          </el-form-item>
          <el-form-item  v-if="infoPlan.attachments.length" >
            <div class="y_img" v-for="item in infoPlan.attachments" :key="item.id">
              <div class="y_img" v-html="fileType(item.attachmentName,item.id)"></div>
              <div class="y_down"><a :href="url+item.id">下载</a></div>
            </div>
          </el-form-item >
        </template>

        <!--计划进行中 已完成 &&定量考核&&-->
        <!--定量考核 0   定性考核 1-->
      </el-form>
      <!--计划审核中,审核未通过-->
      <template  v-if="status=='02'||status=='03'">
        <div>
          <div style="margin-bottom: 10px" class="y_color_red" v-if="status=='02'">
                            <span v-if="infoPlan.planAuditTime||infoPlan.spare3">任务计划审核（
                            <span>{{infoPlan.planAuditTime}}</span>
                            <span v-if="infoPlan.spare3">第{{infoPlan.spare3}}次上报</span>）
                            </span>
          </div>
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
            <div>计划附件资料：<span v-if="!infoPlan.attachments.length">暂无</span></div>
            <div class="y_img"  v-for="item in infoPlan.attachments" :key="item.id" v-if="infoPlan.attachments.length">
              <div class="y_img" v-html="fileType(item.attachmentName,item.id)"></div>
              <div class="y_down"><a :href="url+item.id">下载</a></div>
            </div>
            <el-form>
              <el-form-item label="备注：" class="y_text_left y_ms_xs" >
                <div>{{infoPlan.spare1}}</div>
              </el-form-item>
              <el-form-item label="原因：" class="y_text_left y_ms_xs" v-if="status=='03'" >
                <div >{{infoPlan.spare2}}</div>
              </el-form-item>
              <el-form-item label="审核人：" class="y_text_left" >
                <div>李立</div>
              </el-form-item>
              <!--计划审核中-->
            </el-form>
          </div>
        </div>
      </template>
      <!--计划进行中  进展考核  展示该计划下的最新周期-->
      <!--新进展-->
      <template  v-if="status=='04'&&yInfo.newInfo">
        <el-tabs type="border-card" v-if="newCycle.length">
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
                    <div>任务完成百分比：<el-progress :percentage="item.progressVOS[0].planCompletionPercentage||0" ></el-progress></div>
                  </div>
                </div>
              </el-card>
              <div style="line-height: 40px">
                <div>纪实材料：</div>
                <div class="y_img" v-for="item1 in item.progressVOS[0].attachments" :key="item1.id">
                  <div class="y_img" v-html="fileType(item1.attachmentName,item.id)"></div>
                  <div class="y_down"><a :href="url+item1.id">下载</a></div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
      <!--全部周期  点击标题-->
      <template v-if="(status=='04'&&!yInfo.newInfo)||status=='05'">
        <!--定量考核 显示折线图-->
        <template  v-if="info.evaluationMode=='0'&&data1.length">
          <label class="y_text_left" style="line-height: 40px">任务进度：</label>
          <div class="y_text_left">
            <schart canvasId="line" width="550" height="300" :data="data1" type="line" :options="options1"></schart>
          </div>
        </template>
        <!--上报进度-->
        <template v-if="yjzcz&&yInfo.jzMark">
          <template v-if="allCycle.length">
            <div>计划周期：
              <el-select v-model="zhouqi" placeholder="请选择计划周期">
                <el-option
                  v-for="item in allCycle"
                  :key="item.id"
                  :label="item.periodBeginTime+'—'+item.periodEndTime"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div  v-for="item in allCycle" v-if="item.id==zhouqi">
              <div class="text item" style="margin:15px 0">
                <div><span>{{item.periodBeginTime}}—{{item.periodEndTime}}  计划</span></div>
                <el-input type="textarea" :row="3" v-model="item.periodContent" disabled style="margin: 3px 0 5px 0"></el-input>
                <div class="y_card_footer">
                  <span>分管负责人：{{item.responsiblePersonName}}</span>
                  <!--<span>责任科室：{{item.responsibleOfficeName}}</span>-->
                  <!--<span>科室负责人：{{item.responsibleOfficePersonName}}</span>-->
                  <!--<span>具体负责人：{{item.personName}}</span>-->
                </div>
              </div>
              <div  class="text item" style="margin:15px 0">
                <div>计划进度填报</div>
                <div>
                  <el-input type="textarea" :row="3" v-model="desc" style="padding: 3px 0 5px 0"></el-input>
                </div>
                <!--定量考核-->
                <div v-if="info.evaluationMode=='0'">
                <el-col :span="24" style="margin-bottom: 15px">
                  <el-col :span="3" style="margin-top: 7px">计划完成百分比：</el-col>
                  <el-col :span="21"><el-slider v-model="proc" show-input></el-slider></el-col>
                </el-col>
                </div>
              </div>
              <div >
                <label style="float: left">纪实材料：</label>
                <el-upload
                  class="upload-demo"
                  :action="uploadImg"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="uploadFile"
                  :onSuccess="uploadSuccess"
                  :onError="uploadError"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">上传模板只能是doc、docx、PPT、pptx、xlsx、xls、pdf、jpg、png、bmp 格式!</div>
                </el-upload>
                <label>备注：</label>
                <el-input type="textarea" v-model=" planContent" :autosize="{ minRows: 4, maxRows: 6}" style="width:100%"></el-input>
                <div style="text-align:center;margin-top:10px;">
                  <el-button type="primary"   @click="saveProess(info.evaluationMode)">提交进度</el-button>
                </div>
              </div>

            </div>
          </template>
        </template>
        <!--计划进行中  详情页面  展示该计划下的所有周期-->
        <template v-else>
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
                      <!--<span>责任科室：{{item.responsibleOfficeName}}</span>-->
                      <!--<span>科室负责人：{{item.responsibleOfficePersonName}}</span>-->
                      <!--<span>具体负责人：{{item.personName}}</span>-->
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
      </template>
    </div>
    <template  v-if="yshcz">
      <div slot="footer" class="dialog-footer" v-if="status=='02'||status=='03'">
        <el-button size="medium" @click="yInfo.infoModel = false">取 消</el-button>
        <el-button type="success"  size="medium"  @click="passList()" plain>通过</el-button>
        <el-button type="warning"  size="medium"  @click="yInfo.innerVisible=true" plain>不通过</el-button>
      </div>
    </template>
  </el-dialog>
  <!--审核说明-->
  <el-dialog
    width="30%"
    title="审核说明"
    :visible.sync="yInfo.innerVisible"
    append-to-body>
    <el-input type="textarea" :rows="3" v-model="auditText" placeholder="请输入审核说明"></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="yInfo.innerVisible = false">取 消</el-button>
      <el-button type="primary"  size="medium" @click="noPassList" plain>确定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
    import {postA,getA,oUrl,uploadImg} from '../../api/api.js';
    import Schart from 'vue-schart';
    import qs from "qs";
    export default {
        name:'list',
        props: {
          yInfo:{
            type: Object
          },
          yshcz:{
            type: Boolean
          },
          yjzcz:{
            type: Boolean
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
                missionDeadline:'',
                status:'',
                auditText:'',//审核说明
                // infoModel:false,//详情弹窗
                info:{
                  attachments:[]
                },//详情内容
                infoPlan:{
                  attachments:[]
                },//详情内容计划
                newCycle:[],//最新周期 新进展
                allCycle:[],//全部周期
                markCycle:false,//周期显示标记 true：最新   false：全部
                data1:[],//图表数据
                options1: {
                  title: '总体完成量',
                  bgColor: '#607d8b',
                  titleColor: '#ffffff',
                  fillColor: '#e0f2f1',
                  axisColor: '#ffffff',
                  contentColor: '#999'
                },
                zhouqi:'',
                desc:'',
                proc:0,
                uploadImg:uploadImg(),
                uploadFile:[],
                planContent:''//备注
                // del_list: [],
                // is_search: false,
                // innerVisible:false,
            }
        },
        components: {
          Schart
        },
        mounted(){
          this.getInfo();
          console.log(this.yInfo)
        },
        methods: {
          //获取详情 1
          getInfo(){
            var _this=this;
            // _this.select.planId=this.yInfo.planId;
            getA('oa_task_plan/fetchTaskById', {'taskId': this.yInfo.taskId,'planId':this.yInfo.planId}).then((res) => {
              if (res.data.code == 200) {

                _this.status = res.data.data.taskPlanVOS[0].planState;
                _this.info = res.data.data;
                _this.infoPlan = res.data.data.taskPlanVOS[0];
                _this.missionDeadline=res.data.data.missionDeadline.slice(0,10);
                var obj=res.data.data.taskPlanVOS[0].periodVOS;//全部周期
                _this.newCycle=[];//最新周期
                _this.allCycle=obj;
                if(obj.length){
                  this.zhouqi=obj[0].id;
                  obj.forEach(function (item) {
                    if(item.progressVOS.length){
                      if(item.progressVOS[0].progressState=='0') {
                        _this.newCycle.push(item);
                      }
                    }
                  })
                }
                this.infoModel = true;
                // if(_this.info.evaluationMode=='0'){
                this.getEchart(this.yInfo.planId);
                // }

              }else{
                this.$message.error('服务器错误，请重试');
              }
            });

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
            passList(){
                this.$confirm("确定要审核通过此计划吗", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let obj=qs.stringify({'ids':this.yInfo.planId,'planState':'04'});
                    postA('oa_task_plan/audit', obj).then((res) => {
                        if (res.data.code == 200) {
                          this.$message({type: 'success', message: '审核通过成功!'});
                          this.yInfo.infoModel = false;
                          eventBus.$emit('change'); //Hub触发事件
                        } else {
                            this.$message.error('审核通过失败，请重试');
                        }
                    })
                }).catch(() => {
                })
            },
            //点击不通过审核
            noPassList(){
           
                var _this=this;
                    let obj1=qs.stringify({'ids':this.yInfo.planId,'planState':'03','auditContent':this.auditText});
                    if(!this.auditText){
                      this.$message.error('请输入审核说明');
                      return false;
                    }
                    if(this.auditText.length>200){
                      this.$message.error("审核说明内容字符不能超过200！");
                      return false;
                    }
                    postA('oa_task_plan/audit', obj1).then((res) => {
                        if (res.data.code == 200) {
                            this.$message({type: 'success', message: '操作成功!'});
                            this.yInfo.innerVisible=false;
                            setTimeout(function () {
                              _this.yInfo.infoModel = false;
                            },0);
                            this.auditText="";
                            eventBus.$emit('change'); //Hub触发事件
                        } else {
                            this.$message.error('操作成功，请重试');
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
                    }
                })
            },
          //上报进度
          //提交进度提报
          saveProess(mark){
            if(!this.desc){
          this.$message.error("填报进度内容不能为空！");
            return false;
          }
          if(this.desc.length>200){
            this.$message.error("填报进度内容字符不能超过200！");
            return false;
          }
           if(this.planContent.length>200){
            this.$message.error("备注内容字符不能超过200！");
            return false;
          }
            //0定量考核
            var bfb='';
            if(mark=='0') {
              bfb = this.proc;
            }
            var file=[];
            this.uploadFile.forEach(function (item) {
              file.push(item.response.data.id);
            });
            var obj=qs.stringify({'id':this.yInfo.planId,'periodId':this.zhouqi,
              'planProgressContent':this.desc,'planCompletionPercentage':bfb,'attachments':file});
            postA('oa_progress/save', obj).then((res) => {
              if (res.data.code == 200) {
                this.yInfo.infoModel = false;
                this.$message({type: 'success', message: '提交成功!'});
              }else{
                this.$message.error('提交失败，请重试');
              }
            })
          },
          //进度附件上传成功的返回值
          uploadSuccess(response, file, fileList) {
            // console.log(fileList);
            this.uploadFile=fileList;
          },
          // 删除上传
          handleRemove(file, fileList) {
            this.uploadFile=fileList;
          },
          //附件上传失败的返回值
          uploadError(err, file, fileList) {},
          handlePreview(file) {
            console.log(file);
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
