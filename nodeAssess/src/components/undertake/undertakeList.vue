<template>
    <div class="y_list">
    <div class="table">
        <div class="handle-box">
            <el-row >
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
                                <el-option v-for="item in taskStatus" :key="item.code" :label="item.name"  :value="item.code" v-if="item.code!='00'"></el-option>
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
                <a class="y_active"  slot-scope="scope" @click="showInfoTitle(scope.row.taskId,scope.row.id)">{{ scope.row.taskTitle }}</a>
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
                <a class="y_active" slot-scope="scope" @click="showInfoTitle(scope.row.taskId,scope.row.id,true)" >上报进展</a>
            </el-table-column>
            </template>
            <!--计划未上报 审核中 未通过-->
            <template v-if="searchList.status=='00'||searchList.status=='02'||searchList.status=='03'">
                <el-table-column prop="useTime" label="下发时间"  ></el-table-column>
            </template>
            <!--计划未上报 计划未通过-->
            <template v-if="searchList.status=='01'||searchList.status=='03'">
                <el-table-column label="操作">
                    <a class="y_active" slot-scope="scope" @click="showInfo(scope.row.taskId,scope.row.id,scope.row.planState)">{{searchList.status=='03'?'修改计划':'上报计划'}}</a>
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
        <el-dialog title="上报计划" :visible.sync="infoModel" width="70%" top="4vh" >
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
                    <el-form-item class="y_text_left" v-if="info.attachments.length" >
                        <div class="y_img" v-for="item in info.attachments" :key="item.id">
                           <div class="y_img" v-html="fileType(item.attachmentName,item.id)"></div>
                           <div class="y_down"><a :href="url+item.id">下载</a></div>
                        </div>
                    </el-form-item>
                    <el-form-item label="备注：" class="y_text_left y_ms_xs" >
                        <div>{{info.remark}}</div>
                    </el-form-item>
                     <!-- 选择上报计划人员 -->
                    <div class="divStyle preson" v-if="select.status=='01'">
                        <label>分管负责人:</label>
                         <el-select v-model="ResponsiblePresonId"  @change="fzrChange" placeholder="请选择" style="width:120px" >
                            <el-option
                            v-for="item in ResponsiblePreson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                              <label style="margin-left:10px;">责任科室:</label>
                            <el-select v-model="checkPreson" @change="zrksChange" placeholder="选择科室" style="width:120px">
                            <el-option
                            v-for="item in PreChecked"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>

                        <label style="margin-left:10px;">科室负责人:</label>
                         <el-select v-model="branchedPresonId" @change="kszfrChange" placeholder="请选择" style="width:120px">
                            <el-option
                            v-for="item in branchedPreson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <label style="margin-left:10px;">具体负责人:</label>
                        <el-select v-model="specificPresonId" @change="jtzfrChange" placeholder="请选择" style="width:120px">
                            <el-option
                            v-for="item in specificPreson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <!-- 计划周期 -->
                    <div class="c_contentBox" style="margin-bottom:10px" v-if="select.status=='01'" :key="index" v-for="(elem,index) in newArray">
                        <div style="margin-bottom:10px;">
                            <label>计划周期:</label>
                            <el-date-picker style="margin-left:10px"
                            v-model="elem.dataTime"
                            type="daterange"
                            range-separator="至"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="timeList(index)">
                            </el-date-picker>
                        </div>
                        <el-input type="textarea" v-model="elem.periodContent" :autosize="{ minRows: 4, maxRows: 6}" style="width:100%"></el-input>
                        <div class="divStyle preson" >
                        <label>分管负责人:</label>
                         <el-select v-model="elem.responsiblePerson" placeholder="请选择" style="width:100px">
                            <el-option
                            v-for="item in ResponsiblePreson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                              <label style="margin-left:10px;">责任科室:</label>
                            <el-select v-model="elem.responsibleOfficeId " @change="zrksChange1(index)" placeholder="选择科室" style="width:120px">
                            <el-option
                            v-for="item in PreChecked"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>

                        <label style="margin-left:10px;">科室负责人:</label>
                         <el-select v-model="elem.responsibleOfficePerson" placeholder="请选择" style="width:100px">
                            <el-option
                            v-for="item in branchedPreson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <label style="margin-left:10px;">具体负责人:</label>
                        <el-select v-model="elem.person" placeholder="请选择" style="width:100px">
                            <el-option
                            v-for="item in specificPreson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    </div>
                    <div class="divStyle" style="text-align:center" v-if="select.status=='01'">
                        <el-button type="info" icon="el-icon-plus" @click="addPlan">新增计划</el-button>
                    </div>
                    <div v-if="select.status=='01'">
                    <el-form-item label="上传附件:">
                    <el-upload
                    class="upload-demo"
                    :action="uploadImg"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :onSuccess="uploadSuccess"
                    :onError="uploadError"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">上传模板只能是doc、docx、PPT、pptx、xlsx、xls、pdf、jpg、png、bmp 格式!</div>
                    </el-upload>
                </el-form-item>
                <label>备注：</label>
                <el-input type="textarea" v-model=" planContent" :autosize="{ minRows: 4, maxRows: 6}" style="width:100%"></el-input>
                <div style="text-align:center;margin-top:10px;">
                    <el-button type="primary"     @click="saveTaskPlan">提交计划</el-button>
                </div>

                    </div>
                    <!-- 计划修改 -->
                       <div class="divStyle preson" v-if="select.status=='03'">
                        <label>分管负责人:</label>
                         <el-select v-model="ResponsiblePresonId" placeholder="请选择" style="width:120px" >
                            <el-option
                            v-for="item in ResponsiblePreson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                              <label style="margin-left:10px;">责任科室:</label>
                            <el-select v-model="checkPreson" placeholder="选择科室" style="width:120px">
                            <el-option
                            v-for="item in PreChecked"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>

                        <label style="margin-left:10px;">科室负责人:</label>
                         <el-select v-model="branchedPresonId" placeholder="请选择" style="width:120px">
                            <el-option
                            v-for="item in branchedPreson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <label style="margin-left:10px;">具体负责人:</label>
                        <el-select v-model="specificPresonId" placeholder="请选择" style="width:120px">
                            <el-option
                            v-for="item in specificPreson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="c_contentBox" style="margin-bottom:10px" v-if="select.status=='03'" :key="index" v-for="(elem,index) in newArray">
                        <div style="margin-bottom:10px;">
                            <label>计划周期:</label>
                            <el-date-picker style="margin-left:10px"
                            v-model="elem.dataTime"
                            type="daterange"
                            range-separator="至"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="timeList(index)">
                            </el-date-picker>
                        </div>
                        <el-input type="textarea" v-model="elem.periodContent" :autosize="{ minRows: 4, maxRows: 6}" style="width:100%"></el-input>
                        <div class="divStyle preson" >
                        <label>分管负责人:</label>
                         <el-select v-model="elem.responsiblePerson" placeholder="请选择" style="width:100px">
                            <el-option
                            v-for="item in ResponsiblePreson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                              <label style="margin-left:10px;">责任科室:</label>
                            <el-select v-model="elem.responsibleOfficeId " placeholder="选择科室" style="width:120px">
                            <el-option
                            v-for="item in PreChecked"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>

                        <label style="margin-left:10px;">科室负责人:</label>
                         <el-select v-model="elem.responsibleOfficePerson" placeholder="请选择" style="width:100px">
                            <el-option
                            v-for="item in branchedPreson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <label style="margin-left:10px;">具体负责人:</label>
                        <el-select v-model="elem.person" placeholder="请选择" style="width:100px">
                            <el-option
                            v-for="item in specificPreson"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    </div>
                    <div class="divStyle" style="text-align:center" v-if="select.status=='03'">
                        <el-button type="info" icon="el-icon-plus" @click="addPlan">新增计划</el-button>
                    </div>
                    <div v-if="select.status=='03'">
                    <el-form-item label="上传附件:">
                    <el-upload
                    class="upload-demo"
                    :action="uploadImg"
                    :on-preview="handlePreview"
                    :on-remove="handleRemoves"
                    :file-list="fileList1"
                    :onSuccess="uploadSuccess"
                    :onError="uploadError"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">上传模板只能是doc、docx、PPT、pptx、xlsx、xls、pdf、jpg、png、bmp 格式!</div>
                    </el-upload>
                </el-form-item>
                <label>备注：</label>
                <el-input type="textarea" v-model=" planContent" :autosize="{ minRows: 4, maxRows: 6}" style="width:100%"></el-input>
                 <div style="text-align:center;margin-top:10px;">
                    <el-button type="primary"     @click="saveTaskPlan">提交计划</el-button>
                </div>
                    </div>
                    <!--计划进行中&&定量考核-->
                    <!--定量考核 0   定性考核 1-->
                    <template  v-if="select.status=='04'&&info.evaluationMode=='0'">
                    <el-form-item label="任务进度（任务进行中）：" class="y_text_left">
                    </el-form-item>
                    <el-form-item class="y_text_left">
                       <schart canvasId="line" width="550" height="300" :data="data1" type="line" :options="options1"></schart>
                    </el-form-item>
                    </template>
                </el-form>
            </div>
        </el-dialog>

        <!--yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy  详情弹窗-->
        <el-dialog :title="getStatus(select.status)" :visible.sync="showModel" width="70%" top="4vh" >
            <div style="max-height:570px;overflow-y: auto; padding-right: 10px;" v-if="showModel">
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
                    <template v-if="select.status!='02'&&select.status!='03'&&select.status!='01'">
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
                        <template v-if="select.status=='04'||select.status=='05'">
                            <el-form-item label="任务进度（任务进行中）：" class="y_text_left">
                            </el-form-item>
                            <el-form-item class="y_text_left">
                                <schart canvasId="line" width="550" height="300" :data="data1" type="line" :options="options1"></schart>
                            </el-form-item>
                        </template>
                    </template>
                </el-form>
                <!--计划进行中-->
                <template v-if="(select.status=='04'&&!markJZ)||select.status=='05'">
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
                                        <div>计划进度</div>
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
                                <el-form-item label="审核人：" class="y_text_left" v-if="select.status=='03'" >
                                    <div>李立</div>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </template>
                <!--上报进度-->
                <template v-if="select.status=='04'&&allCycle.length&&markJZ">
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
                            <span>责任科室：{{item.responsibleOfficeName}}</span>
                            <span>科室负责人：{{item.responsibleOfficePersonName}}</span>
                            <span>具体负责人：{{item.personName}}</span>
                        </div>
                    </div>
                    <div  class="text item" style="margin:15px 0">
                        <div>计划进度填报</div>
                        <div>
                            <el-input type="textarea" :row="3" v-model="desc" style="padding: 3px 0 5px 0"></el-input>
                        </div>
                        <!--定量考核-->
                        <!--<div v-if="info.evaluationMode=='0'">-->
                           <el-col :span="24" style="margin-bottom: 15px">
                                <el-col :span="3" style="margin-top: 7px">计划完成百分比：</el-col>
                                <el-col :span="21"><el-slider v-model="proc" show-input></el-slider></el-col>
                           </el-col>
                        <!--</div>-->
                    </div>
                    <div >
                        <label style="float: left">纪实材料：</label>
                        <el-upload
                                class="upload-demo"
                                :action="uploadImg"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove1"
                                :file-list="uploadFile"
                                :onSuccess="uploadSuccess1"
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
            </div>
        </el-dialog>


    </div>
</template>

<script>
import { postA, getA,oUrl,uploadImg} from "../../api/api.js";
import Schart from "vue-schart";
import qs from "qs";
export default {
  components: {
    Schart
  },
  data() {
    return {
      uploadImg:uploadImg(),
      proc:0,//百分比
      uploadFile:[],
      desc:'',//周期进展填报
      zhouqi:'',//周期id
      markJZ:false,//是否为进展弹窗
      page:1,
      pageSize:15,
      total:0,
      urlImg:oUrl(),
      url:oUrl()+'oa_attachment/download_attachment?id=',
      newCycle:[],//最新周期
      allCycle:[],//全部周期
      // markCycle:false,//周期显示标记 true：最新   false：全部
      select: {
        // taskId:'',//点击详情时选择的任务id
        // planId:'',//点击详情时选择的计划id
        status: "" //点击详情时选择的状态值
      },
    //  wwwwwwwwwwwwwwwwwwwwwwwwwww start
      taskId:'',//所属任务的ID
      selectPreson: "", //组织机构ID
      PreChecked: [], //组织机构数据
      checkPreson: "", //组织机构人员选中ID
      branchedPreson: [], //科室负责人数据
      branchedPresonId: "", //科室负责人ID
      ResponsiblePreson: [], //分管负责人
      ResponsiblePresonId: "", //分管负责人
      specificPreson: [], //具体负责人数据
      specificPresonId: "", //具体负责人Id
      fileList: [],
      fileList1: [],
      attachmentsId:[],//上传附件的ID
      newArray:[],//新增计划
      planContent: "",
      //计划周期时间
      //计划周期内容
    //wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww end
      list: [],
      taskType: [], //任务类型
      taskTypeChild: [], //任务类型
      taskStatus: [], //任务状态
      taskCompany: [], //单位筛选
      auditText: "", //审核说明
      infoModel: false, //操作弹窗
      showModel: false, //详情弹窗
      info: {}, //详情内容
      cur_page: 1,
      selectId: [], //列表选中的id
      selectRow: [],
      // select_cate: '',
      // select_word: '',
      del_list: [],
      is_search: false,
      innerVisible: false,
      searchList: {
        type: "", //任务类型
        typeChild: "", //任务子类型
        status: "", // 任务状态   ''全部任务 00任务未下发 01计划未上报 02计划待审核 03计划未通过 04计划进行中 05任务已完成
        company: "", //单位
        time: "", //任务时间
        text: "" //关键字
      },
      data1: [],
      options1: {
        title: "总体完成量",
        bgColor: "#607d8b",
        titleColor: "#ffffff",
        fillColor: "#e0f2f1",
        axisColor: "#ffffff",
        contentColor: "#999"
      },
      props: {
        value: "value",
        children: "cities"
      }
    };
  },
  watch: {
      ResponsiblePresonId:function(newsss,oldsss){
        // alert('newsss:'+newsss);
        // alert('oldsss:'+oldsss);
        // this.elem.responsiblePerson=newsss;
        // alert( this.elem.responsiblePerson )
      }
  },
  created() {
    this.getTaskType();
    this.getTaskStatus();
    this.getTaskCompany();
    this.getList();
  },
  computed: {
    // fullName: {
    // getter
    //     get: function () {
    //       return this.firstName + ' ' + this.lastName
    //     },
    //     // setter
    //     set: function (newValue) {
    //       var names = newValue.split(' ')
    //       this.firstName = names[0]
    //       this.lastName = names[names.length - 1]
    //     }
    //   }
    //     presonId() {
    //     //     this.newArray.forEach(function (item) {
    //     //     return item.presonId;
    //     // })
    //  },
    // },
    //        watch: {
    //         presonId(newValue, oldValue) {
    //             console.log("aaaa");
    //             console.log(newValue,oldValue)
    // 　　　　  },
  },
  methods: {
    edit() {
      this.$router.push({
        name: "editTask",
        params: {
          id: this.selectId.toString()
        }
      });
    },
    // 负责人 下拉改变
    fzrChange(){
      var _this=this;
      this.newArray.forEach(function (item) {
         item.responsiblePerson=_this.ResponsiblePresonId;
      });
    },
    //  责任科室 下拉改变
   zrksChange(){
       var _this=this;
       this.sectionList();
       this.newArray.forEach(function (item) {
           item.responsibleOfficeId=_this.checkPreson;
       });
   },
   zrksChange1(index){
       var _this=this;
       this.sectionList();
       // this.newArray[index].
       // this.newArray.forEach(function (item) {
       //     item.responsibleOfficeId=_this.checkPreson;
       // });
   },
    //  科室负责人 下拉改变
    kszfrChange(){
        var _this=this;
        this.newArray.forEach(function (item) {
            item.responsibleOfficePerson=_this.branchedPresonId;
        });
    },
   // 具体负责人 下拉改变
    jtzfrChange(){
        var _this=this;
        this.newArray.forEach(function (item) {
            item.person=_this.specificPresonId;
        });
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
    getList() {
      var _this = this.searchList;
      getA("oa_task_plan/queryTaskPlanHasPercentages", {
        taskTypeParentId: _this.type,
        taskTypeId: _this.typeChild,
        responsibleOrganizationId: _this.company,
        status: _this.status,
        taskTitle: _this.text,
        pageNum:this.page,
        flag:'b'
      }).then(res => {
        if (res.data.code == 200) {
          this.list = res.data.data.dataList;
          this.pageSize = res.data.data.pageSize;
          this.total = res.data.data.total;
        }else{
           this.$message.error('服务器错误');
        }
      });
    },
    //获取分类
    getTaskType() {
      getA("oa_data_dictionary/query_data_dictionary_list", {
        type: "task_type"
      }).then(res => {
        if (res.data.code == 200) {
          this.taskType = res.data.data;
        }else{
           this.$message.error('服务器错误');
        }
      });
    },
    //获取子分类
    getTaskTypeChild() {
      getA("oa_data_dictionary/query_data_dictionary_child", {
        parentId: this.searchList.type
      }).then(res => {
        if (res.data.code == 200) {
          this.taskTypeChild = res.data.data;
        }else{
           this.$message.error('服务器错误');
        }
      });
    },
    //任务主分类改变时
    changeTask() {
      if (this.searchList.type != "") {
        this.getTaskTypeChild();
      } else {
        this.searchList.typeChild = "";
      }
    },
    //获取状态
    getTaskStatus() {
      getA("oa_data_dictionary/query_data_dictionary_list", {
        type: "task_state"
      }).then(res => {
        if (res.data.code == 200) {
          this.taskStatus = res.data.data;
        }else{
           this.$message.error('服务器错误');
        }
      });
    },
    //获取单位
    getTaskCompany() {
      getA("oa_org/query_org", { organizationType: "D" }).then(res => {
        if (res.data.code == 200) {
          res.data.data.forEach(function(item) {
            item["cities"] = [];
          });
          this.taskCompany = res.data.data;
        }else{
           this.$message.error('服务器错误');
        }
      });
    },
    //获取单位子分类
    handleItemChange(val) {
      getA("oa_org/query_org", { parentId: val[0]}).then(res => {
        if (res.data.code == 200) {
          this.taskCompany.forEach(function(item) {
            if (item.id == val) {
              item.cities = res.data.data;
            }
          });
        }else{
           this.$message.error('服务器错误');
        }
      });
    },
    //获取改变单位选择的值
    handleChange(value) {
      this.searchList.company = value[1];
    },
    //修改计划状态
    changeStatus() {
      this.getList();
    },
    //点击搜索
    search() {
      this.getList();
    },

    //  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww  start
    //分管负责人
    marklist() {
      getA("oa_person/query_person_all", {
        organizationId: this.selectPreson
      }).then(res => {
        if (res.data.code == 200) {
          // console.log(res)
          var _this = this;
            this.ResponsiblePreson=[];
          res.data.data.forEach(function(res) {
            _this.ResponsiblePreson.push({ value: res.id, label: res.name });
          });
          this.ResponsiblePresonId = res.data.data[0].id;
          this.newArray[0].responsiblePerson = res.data.data[0].id;
        }else{
           this.$message.error('服务器错误');
        }
      });
    },
    //获取责任科室
    selectLists() {
      getA("oa_org/query_org", {
        parentId: this.selectPreson,
        rganizationType: "k"
      }).then(res => {
        if (res.data.code == 200) {
          var _this = this;
            this.PreChecked=[];
          res.data.data.forEach(function(res) {
            _this.PreChecked.push({ value: res.id, label: res.label });
          });
          this.checkPreson = res.data.data[0].id;
          this.newArray[0].responsibleOfficeId = res.data.data[0].id;
          this.sectionList();
        }else{
           this.$message.error('服务器错误');
        }
      });
    },
    //获取科室负责人
    sectionList() {
      getA("oa_person/query_person", { organizationId: this.checkPreson }).then(
        res => {
          if (res.data.code == 200) {
            var _this = this;
              this.branchedPreson=[];
              this.specificPreson=[];
             if(res.data.data.length) {
                 res.data.data.forEach(function (res) {
                     _this.branchedPreson.push({value: res.id, label: res.name});
                     _this.specificPreson.push({value: res.id, label: res.name});
                 });
                 this.branchedPresonId = res.data.data[0].id;
                 this.specificPresonId = res.data.data[0].id;
                 this.newArray[0].responsibleOfficePerson = res.data.data[0].id;
                 this.newArray[0].person = res.data.data[0].id;
             }else{
                 this.branchedPresonId ='';
                 this.specificPresonId ='';
                 this.newArray[0].responsibleOfficePerson ='';
                 this.newArray[0].person ='';
             }
          }else{
           this.$message.error('服务器错误');
        }
        }
      );
    },
        //计划详情
    planDetails() {
      getA("oa_task_plan/fetchById", { id: this.taskId }).then(
        res => {
          if (res.data.code == 200) {

              var item = res.data.data
              this.ResponsiblePresonId=item.responsibleOrganizationPerson;
              this.checkPreson=item.responsibleOrganizationId
              this.branchedPresonId=item.responsibleOrganizationPerson
              this.specificPresonId=item.responsiblePerson
              this.planContent =item.spare2
              var _this=this
              this.fileList1=[];
              this.attachmentsId=[];
              item.attachments.forEach(function(res){
                _this.attachmentsId.push(res.id)
                 _this.fileList1.push({name:res.attachmentName,url:`${uploading}?id=${res.id}`,id:res.id})
              })
            var _this=this
            item.periodVOS.forEach(function(res){
                var time=[];
                time.push(res.periodBeginTime);
                 time.push(res.periodEndTime);
                _this.newArray.push({periodContent:res.periodContent,periodBeginTime:res.periodBeginTime,periodEndTime:res.periodEndTime,planId:res.id,person:res.person,responsiblePerson:res.responsiblePerson,responsibleOfficeId:res.responsibleOfficeId,
                responsibleOfficePerson:res.responsibleOfficePerson,dataTime:time})
            })


          }else{
           this.$message.error('服务器错误');
        }
        }
      );
    },
    //提交计划时间拆分
    timeList(index){
       this.newArray[index].periodBeginTime = this.newArray[index].dataTime[0]
       this.newArray[index].periodEndTime = this.newArray[index].dataTime[1]
       console.log(this.dataTime);
    //    console.log(this.periodBeginTime,this.periodEndTime)
    },
    // timeList(value){
    //     console.log(value)
    // },
    //新增计划
    addPlan() {
      this.newArray.push({
        periodContent: "",
        dataTime:[],
        periodBeginTime:'',
        periodEndTime :'',
        responsiblePerson: this.ResponsiblePresonId,
        responsibleOfficeId:this.checkPreson ,
        responsibleOfficePerson:this.branchedPresonId,
        person:this.specificPresonId,
        planId:this.taskId,
      });
    },
    //上报计划
      saveTaskPlan() {
        this.newArray.forEach(function(item){
            delete item.dataTime;
        });
        var data=({
        id: this.taskId,
        responsibleOrganizationPerson:this.ResponsiblePresonId,
        responsibleOfficeId:this.checkPreson,
        responsibleOfficePerson:this.branchedPresonId,
        responsiblePerson:this.specificPresonId,
         periodDTOS:this.newArray,
        planContent:this.planContent,
        attachments:this.attachmentsId.toString()
        });
      postA("oa_task_plan/report_task_plan",data).then(res => {
        if (res.data.code == 200) {
          this.$message({ type: "success", message: "保存成功!" });
          this.infoModel=false;
        }else{
           this.$message.error('服务器错误');
        }
      });
    },
    //附件上传成功的返回值
    uploadSuccess(response, file, fileList) {
      this.attachmentsId.push(response.data.id);
    },
    //  yyyyyyyyyyyyyy
    //进度附件上传成功的返回值
    uploadSuccess1(response, file, fileList) {
        console.log(fileList);
        this.uploadFile=fileList;
    },
    // 删除上传
    handleRemove1(file, fileList) {
        this.uploadFile=fileList;
    },
    //  yyyyyyyyyyyyyyyy   end
    //附件上传失败的返回值
    uploadError(err, file, fileList) {},
    handlePreview(file) {
      console.log(file);
    },
    //上传附件删除
    handleRemove(file, fileList) {
      console.log(file);
      getA("oa_attachment/delete_attachment", {
        id: file.response.data.id
      }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
        } else {
          this.$message.error("服务器错误");
        }
      });
    },
        //上传附件删除
    handleRemoves(file, fileList1) {
      getA("oa_attachment/delete_attachment", {
        id: file.id?file.id:file.response.data.id
      }).then(res => {
        if (res.data.code == 200) {
          var _this=this
          this.attachmentsId=[];
        fileList1.forEach(function(res){
          _this.attachmentsId.push(res.id)
        })
        } else {
          this.$message.error("服务器错误");
        }
      });
    },
    //  标题 点击事件
    showInfo(taskId, planId ,planState) {
       this.taskId=planId;
        if(planState=='03'){
        //    修改
        this.newArray=[];
        this.planDetails()
        }
        if(planState=='01'){
        this.newArray=[
        {
          periodContent: "",
          responsiblePerson: "",
          responsibleOfficeId: "",
          responsibleOfficePerson: "",
          person: "",
          dataTime:[],
          periodBeginTime:'',
          periodEndTime:'',
          planId:this.taskId,
        }
      ];
        }
      if (taskId) {
        getA("oa_task_plan/fetchTaskById", {
          taskId: taskId,
          planId: planId
        }).then(res => {
          if (res.data.code == 200) {
            this.select.status = res.data.data.taskPlanVOS[0].planState;
            this.info = res.data.data;
            this.infoModel = true;
            this.selectPreson =
              res.data.data.taskPlanVOS[0].responsibleOrganizationId;

             this.selectLists();
            this.marklist();
            this.newArray[0].planId=this.taskId;
          } else {
            this.$message.error("服务器错误，请重试");
          }
        });
      }
    },
    //   ResponsiblePresonChange(){
    //             console.log(this.ResponsiblePresonId)
    //             var _this = this
    //             this.newArray.forEach(function(res){
    //                 res .parentId=_this.ResponsiblePresonId;
    //                 console.log(res.parentId)

    //             })

    //         },
    //
    //checked 复选框改变
    handleSelectionChange(val) {
      var _this = this;
      _this.selectId = [];
      _this.selectRow = val;
      val.forEach(function(item) {
        _this.selectId.push(item.taskId);
      });
    },
    //分页
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
      //  判断文件类型
    fileType(file,url){
          if(file&&url) {
              let i = file.lastIndexOf(".");
              if (i > -1) {
                  let type = file.substring(i);
                  switch (type) {
                      case '.png':
                      case'.jpeg':
                      case '.jpg':
                      case '.gif':
                      case '.bmp':
                          return `<img  src="${this.urlImg}oa_attachment/download_attachment?id=${url}">`;
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
    showInfoTitle(taskId,planId,mark){
        if(mark){
            this.markJZ=true;
        }else{
            this.markJZ=false;
        }
        if(taskId) {
            this.getInfo(taskId,planId);
        }
    },
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
                      this.zhouqi=obj[0].id;
                      obj.forEach(function (item) {
                          if(item.progressVOS.length){
                              if(item.progressVOS[0].progressState=='0') {
                                  _this.newCycle.push(item);
                              }
                          }
                      })
                  }
                  this.showModel = true;
              }else{
                  this.$message.error('服务器错误，请重试');
              }
          });
          this.getEchart(planId);
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
  //   提交进度提报
    saveProess(mark){
        //0定量考核
        var bfb='';
        if(mark=='0') {
            bfb = this.proc;
        }
        var file=[];
        this.uploadFile.forEach(function (item) {
            file.push(item.response.data.id);
        });
        var obj=qs.stringify({'id':this.select.planId,'periodId':this.zhouqi,
            'planProgressContent':this.desc,'planCompletionPercentage':bfb,'attachments':file});
        postA('oa_progress/save', obj).then((res) => {
            if (res.data.code == 200) {
                this.$message({type: 'success', message: '提交成功!'});
            }else{
                this.$message.error('提交失败，请重试');
            }
        })
    }
  }
};
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
  color: #f56c6c;
}
.y_card_main {
    border-top:1px solid #ebeef5;border-bottom:1px solid #ebeef5;padding: 15px 20px;margin: 8px -20px
}
.y_img {
  width: 130px;
  height: 130px;
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
.divStyle {
  margin: 10px 0;
}
.preson span {
  color: #3a8ee6;
  cursor: pointer;
}
.c_contentBox {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
}
</style>
