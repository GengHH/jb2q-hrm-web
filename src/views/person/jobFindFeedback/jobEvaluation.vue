<!--
 * @Author: GengHH
 * @Date: 2020-12-31 17:09:37
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-23 10:03:38
 * @Description: 职位评价子页面
 * @FilePath: \jb2q-hrm-web\src\views\person\jobFindFeedback\jobEvaluation.vue
-->
<template>
  <div id="jobEvaluation">
    <div class="title-style">职位评价</div>
    <el-row>
      <el-col :span="12">
        <!-- <pl-button type="danger" icon="el-icon-delete" @click="deleteJob"
          >删除</pl-button
        >
        <pl-button class="orange-btn" icon="el-icon-thumb" @click="publickJob"
          >发布</pl-button
        > -->
      </el-col>
      <el-col :span="12">
        <BaseSearch @clickButton="queryJobEvaluationList($event)"></BaseSearch>
      </el-col>
    </el-row>
    <pl-table :data="tableData" ref="jobTable" :columns="columns" show-pager>
      <template #date="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.date }}</span>
      </template>
      <template #star="{row}">
        <el-rate disabled v-model="row.star"></el-rate>
      </template>
    </pl-table>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
export default {
  name: 'jobEvaluation',
  components: {
    BaseSearch
  },
  data() {
    return {
      tableData: [
        {
          id: '1',
          date: '2019-05-01',
          star: null,
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200333,
          tag: '家',
          status: 0,
          actions: ['action1']
        },
        {
          id: '2',
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
          id: '3',
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
          id: '4',
          date: '2019-05-02',
          star: 3,
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1516 弄',
          zip: 200333,
          tag: '公司',
          status: 0,
          actions: ['action1']
        },
        {
          id: '5',
          date: '2019-05-05',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1515 弄',
          zip: 200333,
          tag: '公司',
          status: 0,
          actions: ['action1']
        }
      ]
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
          prop: 'positionName',
          rowSpan: 'all'
        },
        {
          label: '职位名称',
          prop: 'name',
          rowSpan: 'all'
        },
        { label: '评分星级', prop: 'star', slotName: 'star' },
        {
          label: '评价内容',
          prop: 'age',
          rowSpan: 'all'
        },
        {
          label: '评价时间',
          prop: 'date',
          formatter: 'date',
          slotName: 'date'
        }
      ];
    },
    selection() {
      return this.$refs.jobTable.multipleSelection;
    }
  },
  methods: {
    queryJobEvaluationList(val) {
      console.log(val);
      this.$alert('暂时没有此Api接口，请稍后！');
      // let that = this;
      // if (this.selection && this.selection.length == 0) {
      //   this.$alert('请选择一条');
      // } else {
      //   // TODO 删除数据
      //   that.tableData = that.tableData.filter(
      //     obj => !that.selection.some(i => obj.id === i.id)
      //   );
      // }
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
