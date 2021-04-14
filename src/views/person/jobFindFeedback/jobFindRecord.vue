<!--
 * @Author: GengHH
 * @Date: 2020-12-16 10:36:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-14 14:50:53
 * @Description: 求职记录子页面
 * @FilePath: \jb2q-hrm-web\src\views\person\jobFindFeedback\jobFindRecord.vue
-->

<template>
  <div id="jobFindRecord">
    <div class="title-style">求职记录</div>
    <el-row>
      <el-col :span="12">
        <pl-button type="danger" icon="el-icon-delete" @click="deleteJob"
          >删除</pl-button
        >
      </el-col>
      <el-col :span="12">
        <BaseSearch @clickButton="queryJobRecordList($event)"></BaseSearch>
      </el-col>
    </el-row>
    <!-- 查询结果Tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未查看" name="unread">
        <pl-table
          :data="tableData1"
          ref="dataTable1"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
        >
          <template #createTime="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.createTime }}</span>
          </template>
        </pl-table>
      </el-tab-pane>
      <el-tab-pane label="待处理" name="readed"
        ><pl-table
          :data="tableData2"
          ref="dataTable2"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
        >
          <template #createTime="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.createTime }}</span>
          </template>
        </pl-table></el-tab-pane
      >
      <el-tab-pane label="通知面试" name="interview"
        ><pl-table
          :data="tableData3"
          ref="dataTable3"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
        >
          <template #createTime="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.createTime }}</span>
          </template>
        </pl-table></el-tab-pane
      >
      <el-tab-pane label="通知录用" name="hire"
        ><pl-table
          :data="tableData4"
          ref="dataTable4"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
        >
          <template #createTime="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.createTime }}</span>
          </template>
        </pl-table></el-tab-pane
      >
      <el-tab-pane label="通知不录用" name="unhire"
        ><pl-table
          :data="tableData5"
          ref="dataTable5"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
        >
          <template #createTime="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.createTime }}</span>
          </template>
        </pl-table></el-tab-pane
      >
    </el-tabs>
    <!----------------------->
    <!-- 评价弹窗部分 -->
    <!----------------------->
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
    <!-- 聊天弹框 -->
    <el-dialog
      class="width75 dialog-content-full-screen"
      :visible.sync="wchatDialog"
      :before-close="wchatHandleClose"
    >
      <pl-wchat></pl-wchat>
    </el-dialog>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import { findRecord, doEvaluateJob } from '@/api/personApi';
export default {
  name: 'jobFindRecord',
  components: {
    BaseSearch
  },
  data() {
    return {
      activeName: 'unread',
      labelPosition: 'right',
      formLabelWidth: '120px',
      dialog1: false,
      wchatDialog: false,
      pid: this.$store.getters['person/pid'],
      evaluationLevelText: this.$store.getters[
        'dictionary/common_evaluationLeveltext'
      ],
      queryParam: {
        gjz: ''
      },
      jobEvaluationForm: {
        applyforId: '',
        evaluationLevel: 0,
        corpName: '',
        positionName: '',
        evaluationContent: ''
      },
      rules: {},
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: []
    };
  },
  computed: {
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
          label: '职位名称',
          prop: 'positionName',
          attrs: { showOverflowTooltip: true },
          rowSpan: 'all'
        },
        {
          label: '职位薪资',
          prop: 'salaryScope',
          rowSpan: 'all'
        },
        {
          label: '工作地点',
          prop: 'workArea',
          rowSpan: 'all',
          customerRenderText: ({ row }) => {
            const { workArea } = row;
            const data = this.$store.getters['dictionary/ggjbxx_qx'] || [];
            return (
              data.find(element => (element.value = workArea)).label || workArea
            );
          }
        },
        {
          label: '投递时间',
          prop: 'createTime',
          formatter: 'date',
          slotName: 'createTime'
        },
        { label: '类别', prop: 'type' },
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
          attrs: { width: 340 },
          actions: [
            {
              id: 'action1',
              text: '查看详情',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-view',
              onClick: ({ row }) => {
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row.actions || !row.actions.find(c => c === item.id);
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
                return !row.actions || !row.actions.find(c => c === item.id);
              }
            },
            {
              id: 'action3',
              text: '聊天',
              icon: 'el-icon-chat-line-round',
              attrs: { round: true, size: 'small' },
              onClick: ({ row }) => {
                //console.log(row);
                this.wchatDialog = true;
              },
              hidden: ({ row }, item) => {
                return !row.actions || !row.actions.find(c => c === item.id);
              }
            },
            {
              id: 'action4',
              text: '是否参加面试',
              icon: 'el-icon-chat-line-round',
              attrs: { round: true, size: 'small' },
              onClick: ({ row }) => {
                console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row.actions || !row.actions.find(c => c === item.id);
              }
            },
            // {
            //   id: 'action5',
            //   text: '未参加面试',
            //   icon: 'el-icon-chat-line-round',
            //   attrs: { round: true, size: 'small' },
            //   onClick: ({ row }) => {
            //     //console.log(row);
            //   },
            //   hidden: ({ row }, item) => {
            //     return !row.actions || !row.actions.find(c => c === item.id);
            //   }
            // },
            {
              id: 'action6',
              text: '评价',
              icon: 'el-icon-connection',
              attrs: { round: true, size: 'small' },
              onClick: ({ row }) => {
                this.jobEvaluationForm.applyforId = row.applyforId;
                this.jobEvaluationForm.corpName = row.corpName;
                this.jobEvaluationForm.positionName = row.positionName;
                this.dialog1 = true;
              },
              hidden: ({ row }, item) => {
                return !row.actions || !row.actions.find(c => c === item.id);
              }
            }
          ]
        }
      ];
    },
    selection1() {
      return this.$refs.dataTable1.multipleSelection;
    },
    selection2() {
      return this.$refs.dataTable2.multipleSelection;
    },
    selection3() {
      return this.$refs.dataTable3.multipleSelection;
    },
    selection4() {
      return this.$refs.dataTable4.multipleSelection;
    },
    selection5() {
      return this.$refs.dataTable5.multipleSelection;
    }
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    handleSelectionChange(val) {
      //console.log(val);
    },
    handleClose() {
      this.dialog1 = false;
    },
    wchatHandleClose() {
      this.wchatDialog = false;
    },
    deleteJob() {
      let that = this;

      // TODO 删除数据
      switch (this.activeName) {
        case 'unread':
          if (
            !that.selection1 ||
            (that.selection1 && that.selection1.length == 0)
          ) {
            that.$alert('请选择一条');
          } else {
            that.tableData1 = that.tableData1.filter(
              obj => !that.selection1.some(i => obj.id === i.id)
            );
          }
          break;
        case 'readed':
          if (
            !that.selection2 ||
            (that.selection2 && that.selection2.length == 0)
          ) {
            that.$alert('请选择一条');
          } else {
            that.tableData2 = that.tableData2.filter(
              obj => !that.selection2.some(i => obj.id === i.id)
            );
          }
          break;
        case 'interview':
          if (
            !that.selection3 ||
            (that.selection3 && that.selection3.length == 0)
          ) {
            that.$alert('请选择一条');
          } else {
            that.tableData3 = that.tableData3.filter(
              obj => !that.selection3.some(i => obj.id === i.id)
            );
          }
          break;
        case 'hire':
          if (
            !that.selection4 ||
            (that.selection4 && that.selection4.length == 0)
          ) {
            that.$alert('请选择一条');
          } else {
            that.tableData4 = that.tableData4.filter(
              obj => !that.selection4.some(i => obj.id === i.id)
            );
          }
          break;
        case 'unhire':
          if (
            !that.selection5 ||
            (that.selection5 && that.selection5.length == 0)
          ) {
            that.$alert('请选择一条');
          } else {
            that.tableData5 = that.tableData5.filter(
              obj => !that.selection5.some(i => obj.id === i.id)
            );
          }
          break;
      }
    },
    bindEnter(val) {
      console.log(val);
    },
    /**
     * unread : 未读
     * readed ：已读
     * interview ： 面试邀请
     * hire ： 雇佣
     * unhire ： 未雇佣
     */
    async queryJobRecordList(val) {
      // this.$alert('暂时没有此Api接口，请稍后！');
      let that = this;
      let queryResult = await findRecord(this.activeName, {
        pid: this.pid,
        content: val
      });
      if (queryResult.status === 200) {
        let _data = queryResult.result.data;
        switch (this.activeName) {
          case 'unread':
            _data.forEach(element => {
              element.actions = ['action1', 'action2', 'action3'];
            });
            that.tableData1 = _data;
            break;
          case 'readed':
            _data.forEach(element => {
              element.actions = ['action1', 'action2', 'action3'];
            });
            that.tableData2 = _data;
            break;
          case 'interview':
            _data.forEach(element => {
              element.actions = ['action1', 'action4', 'action3'];
            });
            that.tableData3 = _data;
            break;
          case 'hire':
            _data.forEach(element => {
              element.actions = ['action1', 'action4', 'action3'];
            });
            that.tableData4 = _data;
            break;
          case 'unhire':
            _data.forEach(element => {
              element.actions = ['action1', 'action2', 'action3'];
            });
            that.tableData5 = _data;
            break;
        }
      }
    },
    doEvaluateJob(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let params = this.$refs[formName].model;
          params.pid = this.pid;
          let result = await doEvaluateJob(params);
          if (result.status == 200) {
            this.$message({ type: 'success', message: '评价成功' });
          } else {
            this.$message({ type: 'error', message: '评价失败' });
          }
        }
      });
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
</style>
