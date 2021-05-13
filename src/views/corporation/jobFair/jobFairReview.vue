<!--
 * @Author: GengHH
 * @Date: 2020-12-31 17:09:37
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-12 18:38:11
 * @Description: 报名审核结果子页面
-->
<template>
  <div id="jobFairReview">
    <div class="title-style">报名审核结果</div>
    <el-row>
      <el-col :span="12"> </el-col>
      <el-col :span="12">
        <BaseSearch @clickButton="queryResult($event)"></BaseSearch>
      </el-col>
    </el-row>

    <!-- 查询结果Tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 职位展示位 -->
      <el-tab-pane label="线下招聘会" name="onlineFair">
        <pl-table
          :data="tableData"
          ref="jobTable"
          :columns="columns"
          show-pager
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.date }}</span>
          </template>
          <template #star="{row}">
            <el-rate disabled v-model="row.star"></el-rate>
          </template>
        </pl-table>
      </el-tab-pane>
      <!-- 职位展示位 -->

      <el-tab-pane label="线上招聘会" name="unlineFair">
        <pl-table
          :data="tableData"
          ref="jobTable"
          :columns="columns"
          show-pager
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.date }}</span>
          </template>
          <template #star="{row}">
            <el-rate disabled v-model="row.star"></el-rate>
          </template>
        </pl-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
export default {
  name: 'jobFairReview',
  components: {
    BaseSearch
  },
  data() {
    return {
      activeName: 'onlineFair',
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
          tag: '审核通过',
          status: 0,
          fairName: '2020界高校毕业生全国网络联合招聘',
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
          tag: '审核通过',
          status: 1,
          fairName: '2020界高校毕业生全国网络联合招聘',
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
          tag: '审核通过',
          status: 0,
          fairName: '2020界高校毕业生全国网络联合招聘',
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
          tag: '审核通过',
          status: 0,
          fairName: '2020界高校毕业生全国网络联合招聘',
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
          tag: '审核通过',
          status: 0,
          fairName: '2020界高校毕业生全国网络联合招聘',
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
          label: '招聘会名称',
          prop: 'fairName',
          rowSpan: 'all'
        },
        {
          label: '操作时间',
          prop: 'date',
          formatter: 'date',
          slotName: 'date'
        },
        {
          label: '审核状态',
          prop: 'tag',
          rowSpan: 'all'
        },
        {
          label: '操作',
          attrs: { width: 120 },
          actions: [
            {
              id: 'action1',
              text: '查看',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-view',
              onClick: ({ row }) => {
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            }
          ]
        }
      ];
    },
    selection() {
      return this.$refs.jobTable.multipleSelection;
    }
  },
  methods: {
    queryResult(val) {
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
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
</style>
