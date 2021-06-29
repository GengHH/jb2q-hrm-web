<!--
 * @Author: GengHH
 * @Date: 2021-03-18 10:55:17
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-29 15:56:37
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobFair\jobFairResume.vue
-->

<template>
  <div id="resumeReceived">
    <div class="title-style">招聘会收到的简历</div>
    <el-form>
      <el-row :gutter="20">
        <el-col :span="8">
          <pl-input
            v-model="queryParam.gjz"
            autocomplete="off"
            label="关键字"
          ></pl-input>
        </el-col>
        <el-col :span="8">
          <el-col :span="11" class="text-left no-col-padding">
            <pl-input
              v-model.number="queryParam.ageMin"
              autocomplete="off"
              label="年龄（小）"
              @change="minAgeChange"
            ></pl-input>
          </el-col>
          <el-col :span="2" class="text-center no-col-padding">
            <span class="delimiter">-</span>
          </el-col>
          <el-col :span="11" class="text-right no-col-padding">
            <pl-input
              v-model.number="queryParam.ageMax"
              autocomplete="off"
              label="年龄（大）"
              @change="maxAgeChange"
            ></pl-input>
          </el-col>
        </el-col>
        <el-col :span="8">
          <pl-input
            v-model="queryParam.positionName"
            autocomplete="off"
            label="职位名称"
          ></pl-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <pl-select
            v-model="queryParam.workYear"
            :optionData="dicGznx"
            label="工作年限"
          >
          </pl-select>
        </el-col>
        <el-col :span="8">
          <pl-select
            v-model="queryParam.eduLevel"
            :optionData="$store.getters['dictionary/recruit_edu']"
            label="学历"
          >
          </pl-select>
        </el-col>
        <el-col :span="8" style="text-align:right">
          <el-radio-group v-model="queryParam.meetType" size="medium">
            <el-radio-button label="1">线上</el-radio-button>
            <el-radio-button label="2">线上及线下</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <pl-button
            v-if="activeName === '02' || activeName === '03'"
            class="orange-btn"
            icon="el-icon-edit"
            @click="bulkFeedback($event)"
            >批量反馈</pl-button
          >
        </el-col>
        <el-col :span="8"> </el-col>
        <el-col :span="8">
          <el-col :span="8" class="no-col-padding text-left">
            <pl-button
              class="orange-btn"
              icon="el-icon-search"
              @click="queryResumes('03')"
              >搜索</pl-button
            >
          </el-col>
          <el-col :span="8" class="no-col-padding text-center">
            <pl-button @click="clearQueryParam">清空</pl-button>
          </el-col>
          <el-col :span="8" class="no-col-padding text-right">
            <pl-button @click="advancedSearch($event)">高级搜索</pl-button>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <!-- 查询结果Tabs -->
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未查看" name="01">
        <pl-table
          :data="tableData01"
          :totalCount="totalCount01"
          ref="serveTable01"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange"
          @handleCurrentChangeOnBack="handlePageChange"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{ row.createTime }}</span>
          </template>
          <template #star="{row}">
            <el-rate v-model="row.star"></el-rate>
          </template>
        </pl-table>
      </el-tab-pane>
      <el-tab-pane label="已查看" name="02">
        <pl-table
          :data="tableData02"
          :totalCount="totalCount02"
          ref="serveTable02"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange"
          @handleCurrentChangeOnBack="handlePageChange"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{ row.createTime }}</span>
          </template>
          <template #star="{row}">
            <el-rate v-model="row.star"></el-rate>
          </template>
        </pl-table>
      </el-tab-pane>
      <el-tab-pane label="通知面试" name="03">
        <pl-table
          :data="tableData03"
          :totalCount="totalCount03"
          ref="serveTable03"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange"
          @handleCurrentChangeOnBack="handlePageChange"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{ row.createTime }}</span>
          </template>
          <template #reply="{row}">
            <span v-if="row.reply === '1'" style="color:green">是</span>
            <el-popover v-else trigger="hover" placement="top">
              <p><span style="color:red">原因</span>: {{ row.reason }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">否</el-tag>
              </div>
            </el-popover>
          </template>
        </pl-table>
      </el-tab-pane>
      <el-tab-pane label="通知录用" name="04">
        <pl-table
          :data="tableData04"
          :totalCount="totalCount04"
          ref="serveTable04"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange"
          @handleCurrentChangeOnBack="handlePageChange"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{ row.createTime }}</span>
          </template>
          <template #evaluationLevel="{row}">
            <span v-if="!row.evaluationLevel">暂未评价</span>
            <el-popover v-else trigger="hover" placement="top">
              <p>内容: {{ row.evaluationContent }}</p>
              <br />
              <p style="color:#999">时间: {{ row.evaluationTime }}</p>
              <el-rate
                slot="reference"
                v-model="row.evaluationLevel"
                disabled
              ></el-rate>
            </el-popover>
          </template>
        </pl-table>
      </el-tab-pane>
      <el-tab-pane label="通知不录用" name="05">
        <pl-table
          :data="tableData05"
          :totalCount="totalCount05"
          ref="serveTable05"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange"
          @handleCurrentChangeOnBack="handlePageChange"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{ row.createTime }}</span>
          </template>
          <template #evaluationLevel="{row}">
            <span v-if="!row.evaluationLevel">暂未评价</span>
            <el-popover v-else trigger="hover" placement="top">
              <p>内容: {{ row.evaluationContent }}</p>
              <br />
              <p style="color:#999">时间: {{ row.evaluationTime }}</p>
              <el-rate
                slot="reference"
                v-model="row.evaluationLevel"
                disabled
              ></el-rate>
            </el-popover>
          </template>
        </pl-table>
      </el-tab-pane>
    </el-tabs> -->
    <pl-table
      :data="tableData03"
      :totalCount="totalCount03"
      ref="serveTable03"
      :columns="columns"
      show-pager
      @selection-change="handleSelectionChange"
      @handleSizeChangeOnBack="handlePageChange"
      @handleCurrentChangeOnBack="handlePageChange"
    >
      <template #date="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 5px">{{ row.createTime }}</span>
      </template>
      <template #reply="{row}">
        <span v-if="row.reply === '1'" style="color:green">是</span>
        <el-popover v-else trigger="hover" placement="top">
          <p><span style="color:red">原因</span>: {{ row.reason }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">否</el-tag>
          </div>
        </el-popover>
      </template>
    </pl-table>
    <!-- 简历信息弹窗部分 -->
    <el-dialog
      v-if="dialog1"
      class="width75"
      :visible.sync="dialog1"
      :before-close="handleClose"
    >
      <BaseResumeInfo :resumeData="resumeData"></BaseResumeInfo>
    </el-dialog>

    <!-- 反馈功能弹窗部分 -->
    <el-dialog
      class="width75"
      :visible.sync="dialog2"
      :before-close="handleClose"
    >
      <!-- <div class="pup-btn">
        <p class="pup-tit"><i class="icon iconfont ico-no">&#xe648;</i>反馈</p>
      </div> -->
      <!-- 面试信息 -->
      <el-form
        v-if="!feedback.feedbackStatus || feedback.feedbackStatus === '03'"
        class="width70"
        :model="feedback"
        ref="feedback"
        :label-position="labelPosition"
        :rules="rules.feedback"
      >
        <el-form-item
          label="反馈结果"
          prop="feedbackStatus"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="feedback.feedbackStatus" size="medium">
            <el-radio-button v-if="activeName === '02'" label="03"
              >通知面试</el-radio-button
            >
            <el-radio-button label="04">意向录用</el-radio-button>
            <el-radio-button label="05">通知不录用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              class="input-one"
              label="面试日期"
              :label-width="formLabelWidth"
              prop="interviewDate"
            >
              <el-date-picker
                type="date"
                placeholder="面试日期"
                v-model="feedback.interviewDate"
                :picker-options="interviewDateOptions"
                value-format="yyyyMMdd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="input-two"
              label="面试时间"
              :label-width="formLabelWidth"
              prop="interviewTime"
            >
              <el-time-select
                v-model="feedback.interviewTime"
                placeholder="面试时间"
                :picker-options="{
                  start: '06:30',
                  step: '00:15',
                  end: '22:30'
                }"
              ></el-time-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="面试联系人"
          prop="interviewContactName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="feedback.interviewContactName"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="面试联系电话"
          prop="interviewContactPhone"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="feedback.interviewContactPhone"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="面试地址"
          prop="interviewAddress"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            placeholder="请输入（40字符）"
            v-model="feedback.interviewAddress"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="interviewRemarks"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            placeholder="请输入（2000字符）"
            v-model="feedback.interviewRemarks"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- --------  -->
      <!-- 报到信息  -->
      <!-- --------  -->
      <el-form
        v-else-if="feedback.feedbackStatus === '04'"
        class="width70"
        :model="feedback"
        ref="feedback"
        :label-position="labelPosition"
        :rules="rules.feedback"
      >
        <el-form-item
          label="反馈结果"
          prop="feedbackStatus"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="feedback.feedbackStatus" size="medium">
            <el-radio-button v-if="activeName === '02'" label="03"
              >通知面试</el-radio-button
            >
            <el-radio-button label="04">意向录用</el-radio-button>
            <el-radio-button label="05">通知不录用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              class="input-one"
              label="报到日期"
              :label-width="formLabelWidth"
              prop="reportDate"
            >
              <el-date-picker
                type="date"
                placeholder="报到日期"
                v-model="feedback.reportDate"
                value-format="yyyyMMdd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="input-two"
              label="报到时间"
              :label-width="formLabelWidth"
              prop="reportTime"
            >
              <el-time-picker
                placeholder="报到时间"
                v-model="feedback.reportTime"
                value-format="HHmmss"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="报到联系人"
          prop="reportContactName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="feedback.reportContactName"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="报到联系电话"
          prop="reportContactPhone"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="feedback.reportContactPhone"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="报到地址"
          prop="reportAddress"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            placeholder="请输入（40字符）"
            v-model="feedback.reportAddress"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="reportRemarks"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            placeholder="请输入（2000字符）"
            v-model="feedback.reportRemarks"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- ----------  -->
      <!-- 不录用信息  -->
      <!-- ----------  -->
      <el-form
        v-else
        class="width70"
        :model="feedback"
        ref="feedback"
        :label-position="labelPosition"
        :rules="rules.feedback"
      >
        <el-form-item
          label="反馈结果"
          prop="feedbackStatus"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="feedback.feedbackStatus" size="medium">
            <el-radio-button v-if="activeName === '02'" label="03"
              >通知面试</el-radio-button
            >
            <el-radio-button label="04">意向录用</el-radio-button>
            <el-radio-button label="05">通知不录用</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-show="feedback.feedbackStatus !== '05'"
          id="dialog2Btn"
          @click="dialogClear('feedback')"
          class="white-btn btn-style"
          >还 原</el-button
        >
        <el-button
          type="primary"
          @click="doFeedback()"
          class="orange-btn btn-style"
          >反 馈</el-button
        >
      </div>
    </el-dialog>

    <!-- 聊天框 弹窗部分 -->
    <el-dialog
      v-if="dialog3"
      class="width75 dialog-content-full-screen"
      :visible.sync="dialog3"
      :before-close="handleClose"
    >
      <pl-wchat
        :targetObjId="targetObjId"
        :targetObjName="targetObjName"
      ></pl-wchat>
    </el-dialog>
  </div>
</template>

<script>
import BaseResumeInfo from '@/components/common/BaseResumeInfo';
import JwChat from '@/components/common/BaseWChat';
import {
  queryReceiveResume,
  queryMeetingReceiveResume,
  queryResumeInfo,
  doFeedBack
} from '@/api/corporationApi';
import { phonePattern, telephonePattern } from '@/utils/regexp';
import { niceScroll, niceScrollUpdate } from '@/utils';
export default {
  name: 'resumeReceived',
  components: {
    BaseResumeInfo,
    JwChat
  },
  data() {
    /**
     *自定义校验规则
     */
    var validatePhone = (rule, value, callback) => {
      if (!phonePattern.test(value) && !telephonePattern.test(value)) {
        return callback(new Error('请输入正确格式的手机号码或者固定电话号'));
      } else {
        callback();
      }
    };
    return {
      yes: true,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      labelPosition: 'right',
      formLabelWidth: '150px',
      activeName: '03',
      batch: false,
      selects: [],
      unshowCjmsColumn: true,
      unshowPjColumn: true,
      rules: {
        feedback: {
          interviewDate: [
            { required: true, message: '请输入面试日期', trigger: 'blur' }
          ],
          interviewTime: [
            { required: true, message: '请输入面试时间', trigger: 'blur' }
          ],
          interviewContactName: [
            { required: true, message: '请输入面试联系人', trigger: 'blur' }
          ],
          interviewContactPhone: [
            { required: true, message: '请输面试联系电话', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
            // {
            //   pattern: phonePattern,
            //   message: '请输入正确格式的手机号码或者固定电话号',
            //   trigger: ['blur', 'change']
            // },
            // {
            //   pattern: telephonePattern,
            //   message: '请输入正确格式的手机号码或者固定电话号',
            //   trigger: ['blur', 'change']
            // }
          ],
          interviewAddress: [
            { required: true, message: '面试地址', trigger: 'blur' },
            {
              max: 40,
              message: '最长不可超过40字符',
              trigger: ['blur', 'change']
            }
          ],
          feedbackStatus: [
            { required: true, message: '反馈结果', trigger: 'blur' }
          ],
          interviewRemarks: [
            // { required: true, message: '备注', trigger: 'blur' },
            {
              max: 2000,
              message: '最长不可超过2000字符',
              trigger: ['blur', 'change']
            }
          ],
          reportDate: [
            { required: true, message: '请输入报到日期', trigger: 'blur' }
          ],
          reportTime: [
            { required: true, message: '请输入报到时间', trigger: 'blur' }
          ],
          reportContactName: [
            { required: true, message: '请输入报到联系人', trigger: 'blur' }
          ],
          reportContactPhone: [
            { required: true, message: '请输报到联系电话', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],
          reportAddress: [
            { required: true, message: '报到地址', trigger: 'blur' },
            {
              max: 40,
              message: '最长不可超过40字符',
              trigger: ['blur', 'change']
            }
          ],
          reportRemarks: [
            // { required: true, message: '备注', trigger: 'blur' },
            {
              max: 2000,
              message: '最长不可超过2000字符',
              trigger: ['blur', 'change']
            }
          ]
        }
      },
      queryParam: {
        feedBackStatus: '',
        gjz: '',
        ageMin: '',
        ageMax: '',
        positionName: '',
        workYear: '',
        eduLevel: '',
        pageParam: {
          pageSize: 10,
          pageIndex: 0
        },
        meetType: '1'
      },
      dicGznx: this.$store.getters['dictionary/recruit_work_year'],
      tableData01: [],
      totalCount01: 0,
      tableData02: [],
      totalCount02: 0,
      tableData03: [],
      totalCount03: 0,
      tableData04: [],
      totalCount04: 0,
      tableData05: [],
      totalCount05: 0,
      resumeData: {},
      feedback: {
        applyforIdList: [],
        applyforId: '',
        feedbackStatus: '',
        interviewDate: '',
        interviewTime: '',
        interviewContactName: '',
        interviewContactPhone: '',
        interviewAddress: '',
        interviewRemarks: '',
        reportDate: '',
        reportTime: '',
        reportContactName: '',
        reportContactPhone: '',
        reportAddress: '',
        reportRemarks: ''
      },
      interviewDateOptions: {
        //控制时间范围
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      targetObjId: '',
      targetObjName: ''
    };
  },
  computed: {
    /**
     *根据按钮的多少判断列宽
     */
    colwidth() {
      return this.activeName === '02' || this.activeName === '03' ? 100 : 0;
    },
    columns() {
      return [
        { attrs: { type: 'selection' } },
        {
          label: '行序号',
          attrs: { type: 'index', width: 100 },
          rowSpan: [
            [0, 1],
            [2, 4]
          ]
        },
        {
          label: '招聘会名称',
          prop: 'meetName',
          rowSpan: 'all' //tranBaseSymbol
        },
        {
          label: '姓名',
          prop: 'xm',
          rowSpan: 'all' //tranBaseSymbol
        },
        {
          label: '职位名称',
          prop: 'positionName',
          attrs: { showOverflowTooltip: true },
          rowSpan: 'all'
        },
        {
          label: '年龄',
          prop: 'age',
          rowSpan: 'all'
        },
        // {
        //   label: '工作年限',
        //   prop: 'workYear',
        //   customerRenderText: ({ row }) => {
        //     const { workYear } = row;
        //     const data =
        //       this.$store.getters['dictionary/recruit_work_year'] || [];
        //     return (
        //       data.find(element => element.value === workYear)?.label ||
        //       workYear
        //     );
        //   },
        //   rowSpan: 'all'
        // },
        // {
        //   label: '学历',
        //   prop: 'eduLevel',
        //   customerRenderText: ({ row }) => {
        //     const { eduLevel } = row;
        //     const data = this.$store.getters['dictionary/recruit_edu'] || [];
        //     return (
        //       data.find(element => element.value === eduLevel)?.label ||
        //       eduLevel
        //     );
        //   },
        //   rowSpan: 'all'
        // },
        {
          label: '投递时间',
          prop: 'createTime',
          attrs: { showOverflowTooltip: true },
          formatter: 'date',
          slotName: 'date'
        },
        {
          label: '是否参加面试',
          prop: 'reply',
          slotName: 'reply',
          unshow: this.unshowCjmsColumn
        },
        {
          label: '评分',
          prop: 'evaluationLevel',
          slotName: 'evaluationLevel',
          unshow: this.unshowPjColumn
        },
        // {
        //   label: '地址',
        //   attrs: { showOverflowTooltip: true },
        //   customerRenderText: ({ row, $index }) => {
        //     //console.log($index);
        //     const { province, city, address } = row;
        //     return province + city + address;
        //   }
        // },
        {
          label: '操作',
          attrs: { width: 240 + Number(this.colwidth) }, //340
          actions: [
            {
              id: 'action1',
              text: '查看简历',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-view',
              onClick: ({ row }) => {
                //console.log(row);
                if (row.applyforId) {
                  this.queryResumesInfo(row.applyforId);
                } else {
                  //无法获取简历信息
                  this.$message({ type: 'error', message: '无法获取简历信息' });
                }
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action2',
              text: '反馈',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-edit-outline',
              onClick: ({ row }) => {
                if (row.applyforId) {
                  //非批量
                  this.batch = false;
                  this.dialog2 = true;
                  this.feedback.applyforId = row.applyforId;
                  if (this.activeName === '02') {
                    this.feedback.feedbackStatus = '03';
                  } else if (this.activeName === '03') {
                    this.feedback.feedbackStatus = '04';
                  } else {
                    this.feedback.feedbackStatus = '';
                  }
                } else {
                  this.$message({ type: 'error', message: '无法反馈信息' });
                }
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action3',
              text: '聊天',
              needBadge: true,
              icon: 'el-icon-chat-line-round',
              attrs: { round: true, size: 'small' },
              onClick: ({ row }) => {
                console.log(row);
                this.targetObjId = row.pid || '';
                this.targetObjName = row.xm || '';
                this.dialog3 = true;
                row.notReadCount = '0';
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            }
          ]
        }
      ];
    }
  },
  created() {
    //this.queryResumes('all');
    this.queryResumes('03');
  },
  methods: {
    handleClick(tab, event) {
      // 动态显示列
      if (tab.name === '03') {
        this.unshowCjmsColumn = false;
        this.unshowPjColumn = true;
      } else if (tab.name === '04' || tab.name === '05') {
        this.unshowPjColumn = false;
        this.unshowCjmsColumn = true;
      } else {
        this.unshowCjmsColumn = true;
        this.unshowPjColumn = true;
      }
    },
    handleSelectionChange(val) {
      //console.log(val);
    },
    handleClose() {
      this.dialog1 = false;
      this.dialog2 = false;
      this.dialog3 = false;
    },
    dialogClear(formName) {
      //清空弹出框
      this.$refs[formName].resetFields();
    },
    /**
     *搜索简历信息列表
     */
    queryResumes(witchTable) {
      if (witchTable === 'all') {
        // 分别查询5种状态的数据
        // this.queryParam.pageParam.pageSize = 10;
        // this.queryParam.pageParam.pageIndex = 0;
        this.queryParam.pageSize = 10;
        this.queryParam.pageIndex = 0;
        for (let i = 1; i < 6; i++) {
          let params = { ...this.queryParam };
          params.feedBackStatus = '0' + i;
          queryMeetingReceiveResume(params).then(queryRes => {
            if (queryRes && queryRes.status == 200) {
              this['tableData0' + i] = queryRes.result.pageresult.data || [];
              this['totalCount0' + i] = queryRes.result.pageresult.total || 0;
              this['tableData0' + i].forEach(element => {
                if (i === 1) {
                  element.actions = ['action1', 'action3'];
                } else if (i === 2 || i === 3) {
                  element.actions = ['action1', 'action2', 'action3'];
                } else {
                  element.actions = ['action1', 'action3'];
                }
              });
            } else if (queryRes) {
              this.$message({ type: 'error', message: '查询失败' });
            }
          });
        }
      } else {
        //单独查询一种类型
        let _pageSize = this.$refs['serveTable' + witchTable]?.pageSize || 10,
          _pageIndex =
            this.$refs['serveTable' + witchTable]?.currentPage - 1 || 0;
        let params = { ...this.queryParam };
        params.feedBackStatus = witchTable;
        params.pageParam.pageSize = _pageSize;
        params.pageParam.pageIndex = _pageIndex;
        queryMeetingReceiveResume(params).then(queryRes => {
          if (queryRes && queryRes.status == 200) {
            this.$message({ type: 'success', message: '查询成功' });
            this['tableData' + witchTable] =
              queryRes.result.pageresult.data || [];
            this['totalCount' + witchTable] =
              queryRes.result.pageresult.total || 0;
            this['tableData' + witchTable].forEach(element => {
              if (witchTable === '01') {
                element.actions = ['action1', 'action3'];
              } else if (witchTable === '02' || witchTable === '03') {
                element.actions = ['action1', 'action2', 'action3'];
              } else {
                element.actions = ['action1', 'action3'];
              }
            });
          } else if (queryRes) {
            this.$message({ type: 'error', message: '查询失败' });
          }
        });
      }
    },
    /**
     *搜索简历详细信息
     */
    async queryResumesInfo(applyforId) {
      let getRes = await queryResumeInfo({
        applyforId: applyforId
      });
      if (getRes && getRes.status == 200) {
        this.$set(this, 'resumeData', getRes.result.data || {});
        this.dialog1 = true;
        //回显数据
        //this.queryResumes('all');
        this.queryResumes('03');
      } else if (getRes) {
        this.$message({ type: 'error', message: '简历查询失败' });
      }
    },
    /**
     * 后端分页
     */
    handlePageChange() {
      this.queryResumes(this.activeName);
    },
    /**
     * 反馈 (batch:true 批量反馈; selects:选中的数据)
     */
    doFeedback() {
      this.$refs.feedback.validate(valid => {
        if (valid) {
          if (this.batch && Array.isArray(this.selects)) {
            //批量数据
            this.selects.forEach(i => {
              if (i.applyforId) this.feedback.applyforIdList.push(i.applyforId);
            });
          } else if (this.feedback.applyforId) {
            // 单个数据
            this.feedback.applyforIdList.push(this.feedback.applyforId);
          } else {
            this.$alert('没有需要反馈的信息');
            return;
          }
          //去重
          this.feedback.applyforIdList = [
            ...new Set(this.feedback.applyforIdList)
          ];
          doFeedBack(this.feedback).then(backRes => {
            if (backRes && backRes.status === 200) {
              //回显数据
              //this.queryResumes('all');
              this.queryResumes('03');
              this.$message({
                type: 'success',
                message: '反馈成功'
              });
              this.dialog2 = false;
            } else if (backRes) {
              this.$message({
                type: 'error',
                message: '反馈失败'
              });
            }
          });
        }
      });
    },
    /**
     * 批量反馈
     */
    bulkFeedback() {
      //判断是不是有选中的数据
      let selects = this.$refs['serveTable' + this.activeName]
        .multipleSelection;
      if (selects && selects.length) {
        this.batch = true;
        this.dialog2 = true;
        this.selects = selects;
      } else {
        this.$alert('请选择数据');
      }
    },
    minAgeChange() {
      if (!this.queryParam.ageMin) {
        return;
      }
      if (this.queryParam.ageMin && isNaN(Number(this.queryParam.ageMin))) {
        this.$alert('请输入数字');
        this.queryParam.ageMin = '';
      } else if (this.queryParam.ageMin < 16) {
        this.$alert('年龄下限不得低于16周岁');
        this.queryParam.ageMin = '';
      }
      // else if (this.queryParam.ageMin > 60) {
      //   this.$alert('年龄下限不得超过60周岁');
      //   this.queryParam.ageMin = '';
      // }
    },
    maxAgeChange() {
      if (!this.queryParam.ageMax) {
        return;
      }
      if (this.queryParam.ageMax && isNaN(Number(this.queryParam.ageMax))) {
        this.$alert('请输入数字');
        this.queryParam.ageMax = '';
      } else if (this.queryParam.ageMax < 16) {
        this.$alert('年龄上限不得低于16周岁');
        this.queryParam.ageMax = '';
      }
      // else if (this.queryParam.ageMax > 60) {
      //   this.$alert('年龄下限不得超过60周岁');
      //   this.queryParam.ageMax = '';
      // } else if (
      //   this.queryParam.ageMin &&
      //   this.queryParam.ageMin * 3 < this.queryParam.ageMax
      // ) {
      //   this.$alert('年龄上限不得超过年龄下限的三倍');
      //   this.queryParam.ageMax = '';
      // }
    },
    clearQueryParam() {
      this.queryParam = {
        feedBackStatus: '',
        gjz: '',
        ageMin: '',
        ageMax: '',
        positionName: '',
        workYear: '',
        eduLevel: '',
        pageParam: {
          pageSize: 10,
          pageIndex: 0
        }
      };
    },
    advancedSearch(done) {
      this.$alert('此功能暂时未开放');
      done();
    }
  },
  mounted() {
    niceScroll('#indexApp');
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
  }
};
</script>

<style lang="scss" scoped>
#resumeReceived {
  .title-style {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    line-height: 40px;
    border-bottom: 1px solid #e9eef3;
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 10px;
    position: relative;
  }
  .title-style::before {
    content: '';
    width: 4px;
    height: 16px;
    background: #fc7a43;
    position: absolute;
    left: 12px;
    top: 13px;
  }
  .el-row {
    & > .el-col {
      margin: 10px 0;
    }
    .delimiter {
      line-height: 40px;
    }
    .no-col-padding {
      button {
        width: 100px;
      }
    }
  }
  .el-date-editor {
    width: 100%;
  }
}
</style>
