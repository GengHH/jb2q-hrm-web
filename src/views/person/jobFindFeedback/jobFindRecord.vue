<!--
 * @Author: GengHH
 * @Date: 2020-12-16 10:36:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-08 16:48:44
 * @Description: 求职记录子页面
 * @FilePath: \jb2q-hrm-web\src\views\person\jobFindFeedback\jobFindRecord.vue
-->

<template>
  <div id="jobFindRecord" v-loading="loading" element-loading-text="拼命加载中">
    <div class="title-style">求职记录</div>
    <el-row>
      <el-col :span="6">
        <!-- <pl-button type="danger" icon="el-icon-delete" @click="deleteJob"
          >删除</pl-button
        > -->
        <pl-button
          v-if="activeName === '02' || activeName === '03'"
          class="orange-btn"
          icon="el-icon-edit"
          @click="bulkFeedback($event)"
          >批量反馈</pl-button
        >
      </el-col>
      <el-col :span="8" style="text-align:right">
        <el-date-picker
          v-model="queryParam.dateInterval"
          type="monthrange"
          align="right"
          unlink-panels
          label="123"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="10">
        <BaseSearch
          @clickButton="queryJobRecordList('all', $event)"
        ></BaseSearch>
      </el-col>
    </el-row>
    <!-- 查询结果Tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="labelCount01" name="01">
        <pl-table
          :data="tableData01"
          :totalCount="totalCount01"
          ref="serveTable01"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange"
          @handleCurrentChangeOnBack="handlePageChange"
          @cell-click="showJobDetialByCell"
          max-height="620"
        >
          <template #positionName="{row}">
            <span style="color:#fc6f3d;cursor: pointer;">{{
              row.positionName
            }}</span>
          </template>
          <template #createTime="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.createTime }}</span>
          </template>
        </pl-table>
      </el-tab-pane>
      <el-tab-pane :label="labelCount02" name="02"
        ><pl-table
          :data="tableData02"
          :totalCount="totalCount02"
          ref="serveTable02"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange"
          @handleCurrentChangeOnBack="handlePageChange"
          @cell-click="showJobDetialByCell"
          max-height="620"
        >
          <template #positionName="{row}">
            <span style="color:#fc6f3d;cursor: pointer;">{{
              row.positionName
            }}</span>
          </template>
          <template #createTime="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.createTime }}</span>
          </template>
        </pl-table></el-tab-pane
      >
      <el-tab-pane :label="labelCount03" name="03"
        ><pl-table
          :data="tableData03"
          :totalCount="totalCount03"
          ref="serveTable03"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange"
          @handleCurrentChangeOnBack="handlePageChange"
          @cell-click="showJobDetialByCell"
          max-height="620"
        >
          <template #positionName="{row}">
            <span style="color:#fc6f3d;cursor: pointer;">{{
              row.positionName
            }}</span>
          </template>
          <template #createTime="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.createTime }}</span>
          </template>
          <template #reply="{row}">
            <span v-if="row.reply === '1'" style="color:green">是</span>
            <el-popover
              v-else-if="row.reply === '0'"
              trigger="hover"
              placement="top"
            >
              <p><span style="color:red">原因</span>: {{ row.reason }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">否</el-tag>
              </div>
            </el-popover>
          </template>
        </pl-table></el-tab-pane
      >
      <el-tab-pane :label="labelCount04" name="04"
        ><pl-table
          :data="tableData04"
          :totalCount="totalCount04"
          ref="serveTable04"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange"
          @handleCurrentChangeOnBack="handlePageChange"
          @cell-click="showJobDetialByCell"
          max-height="620"
        >
          <template #positionName="{row}">
            <span style="color:#fc6f3d;cursor: pointer;">{{
              row.positionName
            }}</span>
          </template>
          <template #createTime="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.createTime }}</span>
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
          </template> </pl-table
      ></el-tab-pane>
      <el-tab-pane :label="labelCount05" name="05"
        ><pl-table
          :data="tableData05"
          :totalCount="totalCount05"
          ref="serveTable05"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange"
          @handleCurrentChangeOnBack="handlePageChange"
          @cell-click="showJobDetialByCell"
          max-height="620"
        >
          <template #positionName="{row}">
            <span style="color:#fc6f3d;cursor: pointer;">{{
              row.positionName
            }}</span>
          </template>
          <template #createTime="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.createTime }}</span>
          </template>
        </pl-table></el-tab-pane
      >
    </el-tabs>
    <!-- 评价弹窗部分 -->
    <el-dialog
      class="width75"
      :visible.sync="dialog1"
      :before-close="handleClose"
    >
      <div class="pup-btn">
        <p class="pup-tit">
          <i class="icon iconfont ico-no">&#xe648;</i>职位评价
        </p>
      </div>
      <el-form
        class="width70"
        :model="jobEvaluationForm"
        ref="jobEvaluationForm"
        :label-position="labelPosition"
        :rules="rules"
      >
        <!-- <el-form-item
          v-if="0 !== 0"
          label="所评价的投递面试记录id"
          prop="applyforId"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="jobEvaluationForm.applyforId"
            :disabled="true"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <el-form-item
          label="单位名称"
          prop="corpName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="jobEvaluationForm.corpName"
            :disabled="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="职位名称"
          prop="positionName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="jobEvaluationForm.positionName"
            :disabled="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-form-item
            label="评价星级"
            prop="evaluationLevel"
            :label-width="formLabelWidth"
          >
            <el-rate
              v-model="jobEvaluationForm.evaluationLevel"
              show-text
              :texts="evaluationLevelText"
            >
            </el-rate>
          </el-form-item>
        </el-row>
        <el-form-item
          label="评价内容"
          prop="evaluationContent"
          :label-width="formLabelWidth"
        >
          <el-input
            class="evaluationLevel-textarea"
            type="textarea"
            placeholder="请输入（1000字以内）"
            v-model="jobEvaluationForm.evaluationContent"
          ></el-input>
        </el-form-item>
      </el-form>
      <p class="fourteen-opacity font-or tac line20">
        注：请按岗位真实性、HR反馈速度、面试体验、招聘规范性几方面评价
        <br />个人填写的相关评价，对企业不可见。
      </p>

      <div slot="footer" class="dialog-footer">
        <el-button
          id="dialog1Btn"
          @click="dialogClear('jobEvaluationForm')"
          class="white-btn btn-style"
          >清 空</el-button
        >
        <pl-button
          type="primary"
          @click="doEvaluateJob('jobEvaluationForm')"
          class="orange-btn btn-style"
          >保 存</pl-button
        >
      </div>
    </el-dialog>

    <!-- 不参见面试弹框 -->

    <el-dialog title="" :visible.sync="dialog2" :before-close="handleClose">
      <pl-input
        type="textarea"
        label="请输入不参加面试原因（1000字符）"
        v-model="reason"
      ></pl-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button type="primary" @click="dontInterView">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 面试详情弹框 -->

    <el-dialog
      class="info-dialog"
      width="40%"
      title="面试详情"
      :visible.sync="dialog3"
      :before-close="handleClose"
    >
      <div>
        <span class="info-dialog-label">单位名称：</span
        >{{ currentRow.corpName }}
      </div>
      <div>
        <span class="info-dialog-label">职位名称：</span
        >{{ currentRow.positionName }}
      </div>
      <div>
        <span class="info-dialog-label">通知面试时间：</span
        >{{ currentRow.noticeInterview }}
      </div>
      <div>
        <span class="info-dialog-label">面试日期：</span
        >{{
          currentRow.interviewDate.substr(0, 4) +
            '-' +
            currentRow.interviewDate.substr(4, 2) +
            '-' +
            currentRow.interviewDate.substr(6, 2)
        }}
      </div>
      <div>
        <span class="info-dialog-label">面试时间：</span
        >{{
          currentRow.interviewTime.substr(0, 2) +
            ':' +
            currentRow.interviewTime.substr(2, 2)
        }}
      </div>
      <div>
        <span class="info-dialog-label">面试地址：</span
        >{{ currentRow.interviewAddress }}
      </div>
      <div>
        <span class="info-dialog-label">面试联系人：</span
        >{{ currentRow.interviewContactName }}
      </div>
      <div>
        <span class="info-dialog-label">面试联系电话：</span
        >{{ currentRow.interviewContactPhone }}
      </div>
      <div>
        <span class="info-dialog-label">面试备注：</span
        >{{ currentRow.interviewRemarks }}
      </div>
    </el-dialog>

    <!-- 报到详情弹框 -->

    <el-dialog
      class="info-dialog"
      width="40%"
      title="报到详情"
      :visible.sync="dialog4"
      :before-close="handleClose"
    >
      <div>
        <span class="info-dialog-label">单位名称：</span
        >{{ currentRow.corpName }}
      </div>
      <div>
        <span class="info-dialog-label">职位名称：</span
        >{{ currentRow.positionName }}
      </div>
      <div>
        <span class="info-dialog-label">报到日期：</span>
        {{
          currentRow.reportDate.substr(0, 4) +
            '-' +
            currentRow.reportDate.substr(4, 2) +
            '-' +
            currentRow.reportDate.substr(6, 2)
        }}
      </div>
      <div>
        <span class="info-dialog-label">报到时间：</span>
        {{
          currentRow.reportTime.substr(0, 2) +
            ':' +
            currentRow.reportTime.substr(2, 2)
        }}
      </div>
      <div>
        <span class="info-dialog-label">报到地址：</span
        >{{ currentRow.reportAddress }}
      </div>
      <div>
        <span class="info-dialog-label">报到联系人：</span
        >{{ currentRow.reportContactName }}
      </div>
      <div>
        <span class="info-dialog-label">报到联系电话：</span
        >{{ currentRow.reportContactPhone }}
      </div>
      <div>
        <span class="info-dialog-label">报到备注：</span
        >{{ currentRow.reportRemarks }}
      </div>
    </el-dialog>

    <!-- 聊天弹框 -->

    <el-dialog
      v-if="wchatDialog"
      class="width75 dialog-content-full-screen"
      :visible.sync="wchatDialog"
      :before-close="wchatHandleClose"
    >
      <pl-wchat
        :targetObjId="targetObjId"
        :targetObjName="targetObjName"
      ></pl-wchat>
    </el-dialog>

    <!-- 职位详细信息 弹窗部分 -->

    <el-dialog
      width="75%"
      v-if="detailsDialog"
      :visible.sync="detailsDialog"
      :before-close="detailsHandleClose"
    >
      <job-details :positionData="onePosition" disabled></job-details>
    </el-dialog>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import JobDetails from '@/views/person/jobDetails.vue';
import {
  findRecord,
  doEvaluateJob,
  doFeedBack,
  queryPositionDetail
} from '@/api/personApi';
import { getDicText, niceScrollUpdate, getCurrentTime } from '@/utils';
export default {
  name: 'jobFindRecord',
  components: {
    BaseSearch,
    JobDetails
  },
  data() {
    return {
      loading: false,
      actionColWidth: 100,
      activeName: '01',
      labelPosition: 'right',
      formLabelWidth: '120px',
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      wchatDialog: false,
      detailsDialog: false,
      batch: false,
      selects: [],
      reason: '',
      unshowCjmsColumn: true,
      unshowPjColumn: true,
      pid: this.$store.getters['person/pid'],
      evaluationLevelText: this.$store.getters[
        'dictionary/common_evaluationLeveltext'
      ],
      queryParam: {
        gjz: '',
        feedbackStatus: '',
        corpName: '',
        positionName: '',
        dateInterval: [],
        pageParam: {
          pageSize: 10,
          pageIndex: 0
        }
      },
      jobEvaluationForm: {
        applyforId: '',
        evaluationLevel: 0,
        corpName: '',
        positionName: '',
        evaluationContent: ''
      },
      rules: {},
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
      currentRow: {
        interviewDate: '00000000',
        interviewTime: '000000',
        reportDate: '00000000',
        reportTime: '000000'
      },
      targetObjId: '',
      targetObjName: '',
      onePosition: {},
      pickerOptions: {
        shortcuts: [
          {
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 3);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      }
    };
  },
  computed: {
    labelCount01() {
      return this.totalCount01
        ? '简历未被查看（' + this.totalCount01 + '）'
        : '简历未被查看';
    },
    labelCount02() {
      return this.totalCount02
        ? '简历已被查看（' + this.totalCount02 + '）'
        : '简历已被查看';
    },
    labelCount03() {
      return this.totalCount03
        ? '通知面试（' + this.totalCount03 + '）'
        : '通知面试';
    },
    labelCount04() {
      return this.totalCount04
        ? '通知录用（' + this.totalCount04 + '）'
        : '通知录用';
    },
    labelCount05() {
      return this.totalCount05
        ? '通知不录用（' + this.totalCount05 + '）'
        : '通知不录用';
    },
    columns() {
      return [
        { attrs: { type: 'selection' } },
        {
          label: '序号',
          attrs: { type: 'index', width: 60 },
          rowSpan: [
            [0, 1],
            [2, 4]
          ]
        },
        {
          label: '单位名称',
          prop: 'corpName',
          attrs: { showOverflowTooltip: true },
          rowSpan: 'all'
        },
        {
          label: '职位编号',
          prop: 'positionCode',
          attrs: { showOverflowTooltip: true },
          rowSpan: 'all'
        },
        {
          label: '职位名称',
          prop: 'positionName',
          attrs: { showOverflowTooltip: true },
          slotName: 'positionName',
          rowSpan: 'all'
        },
        {
          label: '职位薪资',
          prop: 'salaryScope',
          rowSpan: 'all'
        },
        {
          label: '工作性质',
          prop: 'workNature',
          rowSpan: 'all',
          customerRenderText: ({ row }) => {
            const { workNature } = row;
            const data =
              this.$store.getters['dictionary/recruit_work_nature'] || [];
            return (
              data.find(element => element.value === workNature)?.label ||
              workNature
            );
          }
        },
        {
          label: '工作地点',
          prop: 'workArea',
          rowSpan: 'all',
          customerRenderText: ({ row }) => {
            const { workArea } = row;
            const data = this.$store.getters['dictionary/ggjbxx_qx'] || [];
            return (
              data.find(element => element.value === workArea)?.label ||
              workArea
            );
          }
        },
        {
          label: '投递时间',
          prop: 'createTime',
          attrs: { showOverflowTooltip: true },
          formatter: 'date',
          slotName: 'createTime'
        },
        {
          label: '应聘来源',
          prop: 'source',
          rowSpan: 'all',
          customerRenderText: ({ row }) => {
            const { source } = row;
            const data =
              this.$store.getters['dictionary/recruit_applyfor_source'] || [];
            return (
              data.find(element => element.value === source)?.label || source
            );
          }
        },
        {
          label: '是否参见面试',
          prop: 'reply',
          slotName: 'reply',
          unshow: this.unshowCjmsColumn
          // customerRenderText: ({ row }) => {
          //   const { reply } = row;
          //   const data = this.$store.getters['dictionary/yesno'] || [];
          //   return (
          //     data.find(element => element.value === reply)?.label || reply
          //   );
          // }
        },
        {
          label: '评分',
          prop: 'evaluationLevel',
          slotName: 'evaluationLevel',
          unshow: this.unshowPjColumn
        },
        // { label: '类别', prop: 'type' },
        // {
        //   label: '地址',
        //   attrs: { showOverflowTooltip: true },
        //   customerRenderText: ({ row, $index }) => {
        //     //console.log($index);
        //     const { salaryScope, workArea, address } = row;
        //     return salaryScope + workArea + address;
        //   }
        // },
        {
          label: '操作',
          attrs: { width: this.actionColWidth },
          actions: [
            {
              id: 'action1',
              text: '查看详情',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-view',
              onClick: ({ row }) => {
                if (row.applyforId) {
                  this.currentRow = row;
                  if (this.activeName == '03') {
                    this.dialog3 = true;
                  } else if (this.activeName == '04') {
                    this.dialog4 = true;
                  } else {
                    //查看职位信息
                    this.queryPositionDetail(row);
                  }
                } else {
                  this.$alert('没有可查看的数据');
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
                //console.log(row);
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
                // TODO
                this.targetObjId = row.cid || '';
                this.targetObjName = row.corpName || '';
                this.wchatDialog = true;
                row.notReadCount = '0';
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action4',
              text: '参加面试',
              icon: 'el-icon-chat-line-round',
              confirmType: 'pop',
              popConfig: () => ({
                title: '确认参加面试？'
              }),
              confirm: ({ row }, done) => {
                if (row.applyforId) {
                  this.currentRow = row;
                  this.doInterView();
                } else {
                  this.$alert('没有可查看的数据');
                }
                //row.actions = ['action1', 'action3', 'action6'];
                done();
              },
              attrs: { round: true, size: 'small' },
              onClick: ({ row }) => {
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action5',
              text: '不参加面试',
              icon: 'el-icon-chat-line-round',
              confirmType: 'pop',
              popConfig: () => ({
                title: '确认不参加面试？'
              }),
              confirm: ({ row }, done) => {
                // TODO变成评价按钮
                this.dialog2 = true;
                this.currentRow = row;
                // row.actions = ['action1', 'action3', 'action6'];
                done();
              },
              attrs: { round: true, size: 'small' },
              onClick: ({ row }) => {
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action6',
              text: '评价',
              icon: 'el-icon-connection',
              attrs: { round: true, size: 'small' },
              onClick: ({ row }) => {
                this.currentRow = row;
                this.jobEvaluationForm.applyforId = row.applyforId;
                this.jobEvaluationForm.corpName = row.corpName;
                this.jobEvaluationForm.positionName = row.positionName;
                this.dialog1 = true;
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            }
          ]
        }
      ];
    }
    // selection1() {
    //   return this.$refs.serveTable01.multipleSelection;
    // },
    // selection2() {
    //   return this.$refs.serveTable02.multipleSelection;
    // },
    // selection3() {
    //   return this.$refs.serveTable03.multipleSelection;
    // },
    // selection4() {
    //   return this.$refs.serveTable04.multipleSelection;
    // },
    // selection5() {
    //   return this.$refs.serveTable05.multipleSelection;
    // }
  },
  watch: {
    activeName: function(val) {
      if (val === '03') {
        this.actionColWidth = 420;
        this.unshowCjmsColumn = false;
        this.unshowPjColumn = true;
      } else if (val === '04') {
        this.actionColWidth = 300;
        this.unshowPjColumn = false;
        this.unshowCjmsColumn = true;
      } else {
        // if (val === '01') {
        //   this.actionColWidth = 100;
        // } else {
        //   this.actionColWidth = 250;
        // }
        this.actionColWidth = 100;
        this.unshowPjColumn = true;
        this.unshowCjmsColumn = true;
      }
    }
  },
  created() {
    this.queryJobRecordList('all');
  },
  mounted() {
    //niceScroll('.el-table__body-wrapper');
  },
  updated() {
    this._.throttle(niceScrollUpdate, 500)();
  },
  methods: {
    handleClick(tab, event) {
      //   if (tab.name === '03') {
      //     this.actionColWidth = 420;
      //     this.unshowCjmsColumn = false;
      //     this.unshowPjColumn = true;
      //   } else if (tab.name === '04') {
      //     this.unshowPjColumn = false;
      //     this.unshowCjmsColumn = true;
      //   } else {
      //     if (tab.name === '01') {
      //       this.actionColWidth = 150;
      //     } else {
      //       this.actionColWidth = 280;
      //     }
      //     this.unshowPjColumn = true;
      //     this.unshowCjmsColumn = true;
      //   }
    },
    handleSelectionChange(val) {
      //console.log(val);
    },
    handleClose() {
      this.dialog1 = false;
      this.dialog2 = false;
      this.dialog3 = false;
      this.dialog4 = false;
    },
    wchatHandleClose() {
      this.wchatDialog = false;
    },
    deleteJob() {
      let that = this;

      // TODO 删除数据
      // switch (this.activeName) {
      //   // unread
      //   case '01':
      //     if (
      //       !that.selection1 ||
      //       (that.selection1 && that.selection1.length == 0)
      //     ) {
      //       that.$alert('请选择一条');
      //     } else {
      //       that.tableData01 = that.tableData01.filter(
      //         obj => !that.selection1.some(i => obj.id === i.id)
      //       );
      //     }
      //     break;
      //   //case 'readed':
      //   case '02':
      //     if (
      //       !that.selection2 ||
      //       (that.selection2 && that.selection2.length == 0)
      //     ) {
      //       that.$alert('请选择一条');
      //     } else {
      //       that.tableData02 = that.tableData02.filter(
      //         obj => !that.selection2.some(i => obj.id === i.id)
      //       );
      //     }
      //     break;
      //   // case 'interview':
      //   case '03':
      //     if (
      //       !that.selection3 ||
      //       (that.selection3 && that.selection3.length == 0)
      //     ) {
      //       that.$alert('请选择一条');
      //     } else {
      //       that.tableData03 = that.tableData03.filter(
      //         obj => !that.selection3.some(i => obj.id === i.id)
      //       );
      //     }
      //     break;
      //   // case 'hire':
      //   case '04':
      //     if (
      //       !that.selection4 ||
      //       (that.selection4 && that.selection4.length == 0)
      //     ) {
      //       that.$alert('请选择一条');
      //     } else {
      //       that.tableData04 = that.tableData04.filter(
      //         obj => !that.selection4.some(i => obj.id === i.id)
      //       );
      //     }
      //     break;
      //   //case 'unhire':
      //   case '05':
      //     if (
      //       !that.selection5 ||
      //       (that.selection5 && that.selection5.length == 0)
      //     ) {
      //       that.$alert('请选择一条');
      //     } else {
      //       that.tableData05 = that.tableData05.filter(
      //         obj => !that.selection5.some(i => obj.id === i.id)
      //       );
      //     }
      //     break;
      // }
      //判断是不是有选中的数据
      this.selects = this.$refs[
        'serveTable' + this.activeName
      ].multipleSelection;
      if (this.selects && this.selects.length) {
        // this.batch = true;
        this.$confirm('此操作将删除该所属记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // TODO批量删除数据
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      } else {
        // this.batch = false;
        this.$alert('请选择数据');
      }
    },
    /**
     * 01 unread : 未读
     * 02 readed ：已读
     * 03 interview ： 面试邀请
     * 04 hire ： 雇佣
     * 05 unhire ： 未雇佣
     */
    async queryJobRecordList(witchTable, val) {
      this.queryParam.gjz = val;
      let that = this;
      if (witchTable === 'all') {
        // 分别查询5种状态的数据
        this.queryParam.pageParam.pageSize = 10;
        this.queryParam.pageParam.pageIndex = 0;
        for (let i = 1; i < 6; i++) {
          let params = { ...this.queryParam };
          params.feedbackStatus = '0' + i;
          this.loading = true;
          findRecord(params).then(queryRes => {
            if (queryRes && queryRes.status === 200) {
              this['tableData0' + i] = queryRes.result.pageresult.data || [];
              this['totalCount0' + i] = queryRes.result.pageresult.total || 0;
              this['tableData0' + i].forEach(element => {
                switch (i) {
                  case 1:
                    element.actions = ['action3'];
                    break;
                  case 2:
                    element.actions = ['action3'];
                    break;
                  case 3:
                    if (element.reply) {
                      element.actions = ['action3', 'action1'];
                    } else {
                      element.actions = [
                        'action5',
                        'action3',
                        'action4',
                        'action1'
                      ];
                    }
                    break;
                  case 4:
                    if (element.evaluationTime) {
                      element.actions = ['action1', 'action3'];
                    } else {
                      element.actions = ['action1', 'action3', 'action6'];
                    }
                    break;
                  case 5:
                    element.actions = ['action3'];
                    break;
                }
              });
            }
            this.loading = false;
          });
        }
      } else {
        //单独查询一种类型
        let _pageSize = this.$refs['serveTable' + witchTable]?.pageSize || 10,
          _pageIndex =
            this.$refs['serveTable' + witchTable]?.currentPage - 1 || 0;
        let params = { ...this.queryParam };
        params.feedbackStatus = witchTable;
        params.pageParam.pageSize = _pageSize;
        params.pageParam.pageIndex = _pageIndex;
        this.loading = true;
        findRecord(params).then(queryRes => {
          if (queryRes && queryRes.status == 200) {
            this.$message({ type: 'success', message: '查询成功' });
            this['tableData' + witchTable] =
              queryRes.result.pageresult.data || [];
            this['totalCount' + witchTable] =
              queryRes.result.pageresult.total || 0;
            this['tableData' + witchTable].forEach(element => {
              switch (witchTable) {
                case '01':
                  element.actions = ['action1', 'action3'];
                  break;
                case '02':
                  element.actions = ['action1', 'action3'];
                  break;
                case '03':
                  if (element.reply) {
                    element.actions = ['action3', 'action1'];
                  } else {
                    element.actions = [
                      'action5',
                      'action3',
                      'action4',
                      'action1'
                    ];
                  }
                  break;
                case '04':
                  if (element.evaluationTime) {
                    element.actions = ['action1', 'action3'];
                  } else {
                    element.actions = ['action1', 'action3', 'action6'];
                  }
                  break;
                case '05':
                  element.actions = ['action1', 'action3'];
                  break;
              }
            });
          } else if (queryRes) {
            this.$message({ type: 'error', message: '查询失败' });
          }
          this.loading = false;
        });
      }
    },
    /**
     *评价职位
     */
    doEvaluateJob(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let params = this.$refs[formName].model;
          params.pid = this.pid;
          let result = await doEvaluateJob(params);
          if (result.status == 200) {
            this.currentRow.actions = ['action1', 'action3'];
            this.currentRow.evaluationLevel = params.evaluationLevel;
            this.currentRow.evaluationContent = params.evaluationContent;
            this.currentRow.evaluationTime = getCurrentTime();
            this.dialog1 = false;
            this.$refs['serveTable' + this.activeName].$refs.table.doLayout();
            this.$message({ type: 'success', message: '评价成功' });
          } else {
            this.$message({ type: 'error', message: '评价失败' });
          }
        }
      });
    },
    /**
     * 后端分页
     */
    handlePageChange() {
      this.queryJobRecordList(this.activeName);
    },
    /**
     * 参加面试
     */
    doInterView() {
      doFeedBack({
        applyforId: this.currentRow.applyforId,
        reply: '1'
      }).then(backRes => {
        if (backRes && backRes.status === 200) {
          //this.queryJobRecordList(this.activeName);
          // 更新按钮
          this.currentRow.actions = ['action1', 'action3'];
          this.currentRow.reply = '1';
          // this.dialog2 = false;
          // this.$refs[
          //   'serveTable' + this.activeName
          // ].$refs.table.toggleRowSelection(this.currentRow, false);
          this.$refs['serveTable' + this.activeName].$refs.table.doLayout();
          this.$alert('反馈成功');

          // this.$message({
          //   type: 'success',
          //   message: '反馈成功'
          // });
        } else if (backRes) {
          this.$message({
            type: 'error',
            message: '反馈失败'
          });
        }
      });
    },
    /**
     * 不参加面试
     */
    dontInterView() {
      if (!this.reason) {
        this.$alert('请输入不参见面试原因');
      } else {
        doFeedBack({
          applyforId: this.currentRow.applyforId,
          reply: '0',
          reason: this.reason
        }).then(backRes => {
          if (backRes && backRes.status === 200) {
            //this.queryJobRecordList(this.activeName);
            // 更新按钮
            this.currentRow.actions = ['action1', 'action3'];
            this.currentRow.reply = '0';
            this.currentRow.reason = this.reason;
            this.dialog2 = false;
            this.$refs['serveTable' + this.activeName].$refs.table.doLayout();
            this.$message({
              type: 'success',
              message: '反馈成功'
            });
          } else if (backRes) {
            this.$message({
              type: 'error',
              message: '反馈失败'
            });
          }
        });
      }
    },
    bulkFeedback() {
      this.$alert('此功能暂未开通！');
    },
    detailsHandleClose() {
      this.detailsDialog = false;
    },
    /**
     * 获取职位的详细信息
     */
    async queryPositionDetail(row) {
      console.log(
        '%c 🍒 row: ',
        'font-size:20px;background-color: #F5CE50;color:#fff;',
        row
      );
      this.loading = true;
      let queryRes = await queryPositionDetail({
        positionId: row.positionId || '',
        pid: this.$store.getters['person/pid']
      });
      if (queryRes && queryRes.status === 200) {
        let item = queryRes.result.data || {};
        if (item.workArea) {
          item.workAreaText = getDicText(
            this.$store.getters['dictionary/ggjbxx_qx'],
            item.workArea
          );
        }
        if (item.eduRequire) {
          item.eduRequireText = getDicText(
            this.$store.getters['dictionary/recruit_edu'],
            item.eduRequire
          );
        }
        if (item.workNature) {
          item.workNatureText = getDicText(
            this.$store.getters['dictionary/recruit_work_nature'],
            item.workNature
          );
        }
        if (item.corpNature) {
          item.corpNatureText = getDicText(
            this.$store.getters['dictionary/recruit_corp_nature'],
            item.corpNature
          );
        }
        if (item.industryType) {
          item.industryTypeText = getDicText(
            this.$store.getters['dictionary/recruit_industry_type'],
            item.industryType
          );
        }
        if (item.workYearNeed) {
          item.workYearNeedText = getDicText(
            this.$store.getters['dictionary/recruit_work_year'],
            item.workYearNeed
          );
        }
        if (item.salaryPayType) {
          item.salaryPayTypeText =
            '元/' +
            getDicText(
              this.$store.getters['dictionary/recruit_salary_pay_type'],
              item.salaryPayType
            );
        }
        this.onePosition = item || {};
        this.detailsDialog = true;
      } else if (queryRes) {
        this.$message.error('获取职位详细信息失败');
      }
      this.loading = false;
    },
    /**
     * 双击职位cell，显示职位详情
     */
    showJobDetialByCell(row, column) {
      if (column && column.property === 'positionName') {
        this.queryPositionDetail(row);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#jobFindRecord {
  #seek-box {
    margin: 0;
    ::v-deep #seek-box-input {
      height: 40px !important;
    }
  }
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
  ::v-deep .el-table {
    .cell {
      padding: 0 !important;
    }
    th {
      .cell {
        padding: 0 !important;
      }
    }
  }
  .pup-btn {
    text-align: center;
    position: absolute;
    top: 0;
    width: 100%;
    background: #f7f7f7;
    left: 0;
    padding: 5px 0;
    z-index: 2;
    border-bottom: 1px solid #e6e6e6;
    .pup-tit {
      text-align: left;
      font-size: 14px;
      color: #fc6f3d;
      font-weight: bold;
      padding: 0 20px;
      line-height: 30px;
      i {
        margin-right: 6px;
      }
    }
  }
  .el-rate {
    height: 100%;
    padding-top: 10px;
  }
  ::v-deep .evaluationLevel-textarea {
    textarea {
      height: 150px !important;
    }
  }
}
.info-dialog {
  .el-dialog__body {
    padding-top: 5px;
    & > div {
      font-size: 16px;
      margin: 20px 0;
    }
  }
  .info-dialog-label {
    color: #999;
  }
}
</style>
