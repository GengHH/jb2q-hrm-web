<!--
 * @Author: GengHH
 * @Date: 2020-12-31 17:09:37
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-30 16:49:17
 * @Description: 职位评价子页面
 * @FilePath: \jb2q-hrm-web\src\views\person\jobFindFeedback\jobEvaluation.vue
-->
<template>
  <div id="jobEvaluation">
    <div class="title-style">职位评价</div>
    <el-row>
      <el-col :span="12"> </el-col>
      <el-col :span="12">
        <BaseSearch @clickButton="queryJobEvaluationList($event)"></BaseSearch>
      </el-col>
    </el-row>
    <pl-table
      :data="tableData"
      :totalCount="totalCount"
      ref="jobTable"
      :columns="columns"
      show-pager
      @handleSizeChangeOnBack="queryJobEvaluationList"
      @handleCurrentChangeOnBack="queryJobEvaluationList"
    >
      <template #date="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.evaluationTime }}</span>
      </template>
      <template #star="{row}">
        <el-rate disabled v-model="row.evaluationLevel"></el-rate>
      </template>
    </pl-table>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import { queryEvaluateList } from '@/api/personApi';
import { niceScrollUpdate } from '@/utils';
export default {
  name: 'jobEvaluation',
  components: {
    BaseSearch
  },
  data() {
    return {
      positioName: '',
      totalCount: 0,
      tableData: []
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
        { label: '评分星级', prop: 'evaluationLevel', slotName: 'star' },
        {
          label: '评价内容',
          prop: 'evaluationContent',
          attrs: { showOverflowTooltip: true },
          rowSpan: 'all'
        },
        {
          label: '评价时间',
          prop: 'evaluationTime',
          attrs: { showOverflowTooltip: true },
          formatter: 'date',
          slotName: 'date'
        }
      ];
    },
    selection() {
      return this.$refs.jobTable.multipleSelection;
    }
  },
  mounted() {
    this.queryJobEvaluationList();
  },
  updated() {
    this._.throttle(niceScrollUpdate, 500)();
  },
  methods: {
    queryJobEvaluationList(val) {
      this.filter = val;
      queryEvaluateList({
        pid: this.$store.getters['person/pid'],
        filter: this.filter,
        pageParam: {
          pageSize: this.$refs.jobTable.pageSize || 10,
          pageIndex: this.$refs.jobTable.currentPage - 1 || 0
        }
      }).then(queryRes => {
        if (queryRes && queryRes.status === 200) {
          this.tableData = queryRes.result.pageresult.data || [];
          this.totalCount = queryRes.result.pageresult.total || [];
        } else if (queryRes) {
          this.$message({ type: 'error', message: '查询失败' });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#jobEvaluation {
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
</style>
