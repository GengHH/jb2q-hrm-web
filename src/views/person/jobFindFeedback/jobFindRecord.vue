<!--
 * @Author: GengHH
 * @Date: 2020-12-16 10:36:25
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-23 18:29:16
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
      <el-tab-pane label="未查看" name="first">
        <pl-table
          :data="tableData"
          ref="serveTable1"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.date }}</span>
          </template>
        </pl-table>
      </el-tab-pane>
      <el-tab-pane label="待处理" name="second"
        ><pl-table
          :data="tableData"
          ref="serveTable2"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.date }}</span>
          </template>
        </pl-table></el-tab-pane
      >
      <el-tab-pane label="通知面试" name="third"
        ><pl-table
          :data="tableData"
          ref="serveTable3"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.date }}</span>
          </template>
        </pl-table></el-tab-pane
      >
      <el-tab-pane label="通知录用" name="fourth"
        ><pl-table
          :data="tableData"
          ref="serveTable4"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.date }}</span>
          </template>
        </pl-table></el-tab-pane
      >
      <el-tab-pane label="通知不录用" name="fifth"
        ><pl-table
          :data="tableData"
          ref="serveTable5"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.date }}</span>
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
        <el-form-item
          label="单位名称"
          prop="dwMc"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="jobEvaluationForm.dwMc"
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
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-form-item
            label="评价星级"
            prop="star"
            :label-width="formLabelWidth"
          >
            <el-rate
              v-model="jobEvaluationForm.star"
              show-text
              :texts="starText"
            >
            </el-rate>
          </el-form-item>
        </el-row>
        <el-form-item
          label="评价内容"
          prop="content"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            placeholder="请输入（1000字以内）"
            v-model="jobEvaluationForm.content"
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
        <el-button
          type="primary"
          @click="doPositionLike('jobEvaluationForm')"
          class="orange-btn btn-style"
          >保 存</el-button
        >
      </div>
    </el-dialog>
    <!-- 聊天弹框 -->
    <pl-wchat></pl-wchat>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';

export default {
  name: 'jobFindRecord',
  components: {
    BaseSearch
  },
  data() {
    return {
      activeName: 'first',
      labelPosition: 'right',
      formLabelWidth: '120px',
      dialog1: false,
      starText: this.$store.getters['dictionary/common_startext'],
      queryParam: {
        gjz: ''
      },
      jobEvaluationForm: {
        star: 0,
        dwMc: '',
        positionName: '',
        content: ''
      },
      rules: {},
      tableData: [
        {
          age: 20,
          date: '2019-05-01',
          star: null,
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200333,
          tag: '家',
          status: 0,
          actions: ['action1', 'action6']
        },
        {
          age: 20,
          date: '2019-05-04',
          star: null,
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1517 弄',
          zip: 200333,
          tag: '公司',
          status: 1,
          actions: ['action1']
        },
        {
          age: 20,
          date: '2019-05-03',
          star: null,
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1519 弄',
          zip: 200333,
          tag: '家',
          status: 0,
          actions: ['action1']
        },
        {
          age: 20,
          date: '2019-05-02',
          star: null,
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1516 弄',
          zip: 200333,
          tag: '公司',
          status: 0,
          actions: ['action1', 'action2', 'action3']
        },
        {
          age: 20,
          date: '2019-05-05',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1515 弄',
          zip: 200333,
          tag: '公司',
          status: 0,
          actions: ['action1', 'action2']
        }
      ]
    };
  },
  computed: {
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
          label: '单位名称',
          prop: 'name',
          rowSpan: 'all'
        },
        {
          label: '职位名称',
          prop: 'name',
          rowSpan: 'all'
        },
        {
          label: '职位薪资',
          prop: 'province',
          rowSpan: 'all'
        },
        {
          label: '工作地点',
          prop: 'city',
          rowSpan: 'all'
        },
        {
          label: '投递时间',
          prop: 'date',
          formatter: 'date',
          slotName: 'date'
        },
        { label: '类别', prop: 'type' },
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
                return !row.actions.find(c => c === item.id);
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
                return !row.actions.find(c => c === item.id);
              }
            },
            {
              id: 'action3',
              text: '聊天',
              icon: 'el-icon-chat-line-round',
              attrs: { round: true, size: 'small' },
              onClick: ({ row }) => {
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row.actions.find(c => c === item.id);
              }
            },
            {
              id: 'action4',
              text: '参加面试',
              icon: 'el-icon-chat-line-round',
              attrs: { round: true, size: 'small' },
              onClick: ({ row }) => {
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row.actions.find(c => c === item.id);
              }
            },
            {
              id: 'action5',
              text: '未参加面试',
              icon: 'el-icon-chat-line-round',
              attrs: { round: true, size: 'small' },
              onClick: ({ row }) => {
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row.actions.find(c => c === item.id);
              }
            },
            {
              id: 'action6',
              text: '评价',
              icon: 'el-icon-chat-edit',
              attrs: { round: true, size: 'small' },
              onClick: ({ row }) => {
                console.log(row);
                console.log(this);
                this.dialog1 = true;
              },
              hidden: ({ row }, item) => {
                return !row.actions.find(c => c === item.id);
              }
            }
          ]
        }
      ];
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    handleClose() {
      this.dialog1 = false;
    },
    queryJobRecordList(val) {
      this.$alert('暂时没有此Api接口，请稍后！');
    },
    deleteJob() {
      let that = this;
      if (this.selection && this.selection.length == 0) {
        this.$alert('请选择一条');
      } else {
        // TODO 删除数据
        that.tableData = that.tableData.filter(
          obj => !that.selection.some(i => obj.id === i.id)
        );
      }
    },
    bindEnter(val) {
      console.log(val);
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
    line-height: 50px !important;
  }
  textarea {
    height: 150px !important;
  }
}
</style>
