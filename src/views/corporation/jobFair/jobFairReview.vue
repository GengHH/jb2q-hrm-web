<!--
 * @Author: GengHH
 * @Date: 2020-12-31 17:09:37
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-15 18:06:52
 * @Description: 报名审核结果子页面
-->
<template>
  <div id="jobFairReview">
    <div class="title-style">报名审核结果</div>
    <el-row>
      <el-col :span="12"> </el-col>
      <el-col :span="12">
        <BaseSearch @clickButton="queryResultByBtn($event)"></BaseSearch>
      </el-col>
    </el-row>
    <!-- 查询结果Tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 职位展示位onlineFair -->
      <el-tab-pane label="线上招聘会" name="1">
        <pl-table
          :data="tableData1"
          :totalCount="totalCount1"
          ref="fairTable1"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange1"
          @handleCurrentChangeOnBack="handlePageChange1"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.feedbackTime }}</span>
          </template>
          <template #applyResult="{row}">
            <span v-if="row.applyResult === '1'" style="color:green">通过</span>
            <el-popover
              v-else-if="row.applyResult === '0'"
              trigger="hover"
              placement="top"
            >
              <p><span style="color:red">原因</span>: {{ row.applyMemo }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">驳回</el-tag>
              </div>
            </el-popover>
            <span v-else>待审核</span>
          </template>
        </pl-table>
      </el-tab-pane>
      <!-- 职位展示位 -->

      <el-tab-pane label="线上及线下招聘会" name="2">
        <pl-table
          :data="tableData2"
          :totalCount="totalCount2"
          ref="fairTable2"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange2"
          @handleCurrentChangeOnBack="handlePageChange2"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.feedbackTime }}</span>
          </template>
          <template #applyResult="{row}">
            <span v-if="row.applyResult === '1'" style="color:green">通过</span>
            <el-popover
              v-else-if="row.applyResult === '0'"
              trigger="hover"
              placement="top"
            >
              <p><span style="color:red">原因</span>: {{ row.applyMemo }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">驳回</el-tag>
              </div>
            </el-popover>
            <span v-else>待审核</span>
          </template>
        </pl-table>
      </el-tab-pane>
    </el-tabs>
    <!------------------>
    <!-- 报到详情弹框 -->
    <!------------------>
    <el-dialog
      class="info-dialog"
      width="40%"
      title="招聘会反馈详情"
      :visible.sync="dialog"
      :before-close="handleClose"
    >
      <div>
        <span class="info-dialog-label">招聘会名称：</span
        >{{ currentRow.meetName ? currentRow.meetName : '无' }}
      </div>
      <div>
        <span class="info-dialog-label">单位名称：</span
        >{{ currentRow.corpName ? currentRow.corpName : '无' }}
      </div>
      <div>
        <span class="info-dialog-label">招聘会类型：</span
        >{{ currentRow.meetType === '2' ? '线上及线下招聘会' : '线上招聘会' }}
      </div>
      <!-- <div>
        <span class="info-dialog-label">报到日期：</span>
        {{
          currentRow.reportDate.substr(0, 4) +
            '-' +
            currentRow.reportDate.substr(4, 2) +
            '-' +
            currentRow.reportDate.substr(6, 2)
        }}
      </div> -->
      <div>
        <span class="info-dialog-label">报名时间：</span
        >{{ currentRow.applyTime ? currentRow.applyTime : '无' }}
      </div>
      <div>
        <span class="info-dialog-label">备注：</span
        >{{ currentRow.memo ? currentRow.memo : '无' }}
      </div>
      <div>
        <span class="info-dialog-label">区或现场联系人：</span
        >{{ currentRow.meetContactName ? currentRow.meetContactName : '无' }}
      </div>
      <div>
        <span class="info-dialog-label">区或现场联系电话：</span
        >{{ currentRow.meetContactPhone ? currentRow.meetContactPhone : '无' }}
      </div>
      <div>
        <span class="info-dialog-label">反馈时间：</span
        >{{ currentRow.feedbackTime ? currentRow.feedbackTime : '无' }}
      </div>
      <div>
        <span class="info-dialog-label">参会回执：</span>
        <span v-if="currentRow.applyResult === '1'" style="color:green"
          >通过</span
        >
        <span v-else-if="currentRow.applyResult === '0'" style="color:red"
          >不通过</span
        >
        <span v-else>无</span>
      </div>
      <div v-if="activeName === '2'">
        <span class="info-dialog-label">展位号 ：</span
        >{{ currentRow.boothSeq ? currentRow.boothSeq : '无' }}
      </div>
      <div v-if="activeName === '2'">
        <span class="info-dialog-label">入场时间 ：</span
        >{{ currentRow.admisstionTime ? currentRow.admisstionTime : '无' }}
      </div>
      <div v-if="currentRow.applyResult === '0'">
        <span class="info-dialog-label" style="color:red">不通过原因：</span
        >{{ currentRow.applyMemo ? currentRow.applyMemo : '无' }}
      </div>
      <div>
        <span class="info-dialog-label">注意事项：</span
        >{{ currentRow.precautions ? currentRow.precautions : '无' }}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import { queryFairResult, queryFairDetailsResult } from '@/api/corporationApi';
// const STATUS_TAG_MAP = {
//   1: { text: '待审核', type: 'info' },
//   2: { text: '审核通过', type: 'success' },
//   3: { text: '驳回', type: 'danger' }
// };
export default {
  name: 'jobFairReview',
  components: {
    BaseSearch
  },
  data() {
    return {
      activeName: '1',
      dialog: false,
      currentRow: {},
      totalCount1: 0,
      totalCount2: 0,
      meetName: '',
      corpName: '',
      tableData1: [],
      tableData2: []
    };
  },
  computed: {
    columns() {
      return [
        // { attrs: { type: 'selection' } },
        {
          label: '序号',
          attrs: { type: 'index', width: 60 },
          rowSpan: [
            [0, 1],
            [2, 4]
          ]
        },
        {
          label: '招聘会名称',
          prop: 'meetName',
          rowSpan: 'all'
        },
        {
          label: '操作时间',
          prop: 'feedbackTime',
          formatter: 'date',
          slotName: 'date'
        },
        {
          label: '审核状态',
          prop: 'applyResult',
          rowSpan: 'all',
          slotName: 'applyResult'
        },
        {
          label: '操作',
          attrs: { width: 120 },
          actions: [
            {
              id: 'action1',
              text: '查看详情',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-view',
              onClick: ({ row }) => {
                //console.log(row);
                this.currentRow = row;
                this.queryFairDetailsResult();
                this.dialog = true;
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            }
          ]
        }
      ];
    }
    // selection() {
    //   return this.$refs['fairTable' + this.activeName].multipleSelection;
    // }
  },
  mounted() {
    this.queryResult('1');
    this.queryResult('2');
  },
  methods: {
    queryResultByBtn(val) {
      this.meetName = val ? $.trim(val) : '';
      this.queryResult('1');
      this.queryResult('2');
    },
    /**
     *查询招聘会反馈列表
     */
    queryResult(witchTable) {
      console.log(this.$refs);
      console.log(this.$refs['fairTable' + witchTable]);
      let params = {
        pageIndex: this.$refs['fairTable' + witchTable].currentPage - 1 || 0,
        pageSize: this.$refs['fairTable' + witchTable].pageSize || 10,
        cid: this.$store.getters['corporation/cid'],
        meetName: this.meetName,
        meetType: witchTable || ''
      };
      queryFairResult(params).then(queryRes => {
        if (queryRes && queryRes.status === 200) {
          this['totalCount' + witchTable] =
            queryRes.result.pageresult.total || 0;
          this['tableData' + witchTable] =
            queryRes.result.pageresult.data || [];
          this['tableData' + witchTable].forEach(element => {
            element.actions = ['action1'];
          });
        } else if (queryRes) {
          this.$message({ type: 'error', message: '查询失败' });
        }
      });
    },
    /**
     * 查看招聘会反馈详情
     */
    async queryFairDetailsResult() {
      let queryRes = await queryFairDetailsResult({
        applyId: this.currentRow.applyId
      });
      if (queryRes && queryRes.status === 200) {
        this.currentRow = queryRes.result.data || {};
      } else if (queryRes) {
        this.$message.error('查询详细信息失败');
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleClose() {
      this.dialog = false;
    },
    /**
     *后台分页功能
     */

    handlePageChange1() {
      this.queryResult('1');
    },
    /**
     *后台分页功能
     */
    handlePageChange2() {
      this.queryResult('2');
    },
    handleSelectionChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
#jobFairReview {
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
    .el-range-editor {
      width: 100%;
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
