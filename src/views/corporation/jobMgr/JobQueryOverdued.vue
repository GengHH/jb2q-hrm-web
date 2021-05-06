<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-06 18:05:34
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobMgr\JobQueryOverdued.vue
-->
<template>
  <div id="jobQueryOverdued">
    <div class="title-style">已过期职位</div>
    <el-row>
      <el-col :span="12">
        <pl-button type="danger" icon="el-icon-delete">删除</pl-button>
        <pl-button class="orange-btn" icon="el-icon-thumb">重新发布</pl-button>
      </el-col>
      <el-col :span="12">
        <BaseSearch @clickButton="queryResult($event)"></BaseSearch>
      </el-col>
    </el-row>
    <!-- 查询结果Tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="自主招聘" name="first">
        <pl-table
          :data="tableData1"
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
      <el-tab-pane label="代理招聘" name="second">
        <pl-table
          :data="tableData2"
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
    </el-tabs>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import { findPosition } from '@/api/corporationApi';
const STATUS_TAG_MAP = {
  1: { text: '待审核', type: 'info' },
  2: { text: '审核通过', type: 'success' },
  3: { text: '驳回', type: 'danger' }
};
export default {
  name: 'jobQueryOverdued',
  components: {
    BaseSearch
  },
  data() {
    return {
      activeName: 'first',
      unshowShztColumn: true,
      pageSize: 10,
      pageIndex: 0,
      tableData1: [
        {
          positionId: '4',
          editId: '',
          positionName: 'JAVA架构工程师',
          workAddress: '上海市普陀区中江路889号804室',
          salaryScope: '20-50(04)',
          describe: '',
          statusId: '1',
          actions: ['action1']
        },
        {
          positionId: '3',
          editId: '',
          positionName: 'JAVA超高级工程师',
          workAddress: '上海市普陀区中江路889号804室',
          salaryScope: '20-50(04)',
          describe: '',
          statusId: '1',
          actions: ['action1']
        }
      ],
      tableData2: [
        {
          positionId: '4',
          editId: '',
          positionName: 'JAVA架构工程师',
          workAddress: '上海市普陀区中江路889号804室',
          salaryScope: '20-50(04)',
          describe: '',
          statusId: '1',
          actions: ['action1']
        },
        {
          positionId: '3',
          editId: '',
          positionName: 'JAVA超高级工程师',
          workAddress: '上海市普陀区中江路889号804室',
          salaryScope: '20-50(04)',
          describe: '',
          statusId: '1',
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
          label: '行序号',
          attrs: { type: 'index', width: 100 },
          rowSpan: [
            [0, 1],
            [2, 4]
          ]
        },
        {
          label: '职位名称',
          prop: 'positionName',
          rowSpan: 'all'
        },
        {
          label: '薪酬',
          prop: 'salaryScope',
          rowSpan: 'all'
        },
        {
          label: '工作地点',
          prop: 'workAddress',
          rowSpan: 'all'
        },
        {
          label: '操作时间',
          prop: 'editId',
          formatter: 'date',
          slotName: 'date'
        },
        {
          label: '审核状态',
          prop: 'editId',
          unshow: this.unshowShztColumn,
          tagMap: STATUS_TAG_MAP
        },
        {
          label: '操作',
          attrs: { width: 100 },
          actions: [
            {
              id: 'action1',
              text: '编辑',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-edit',
              onClick: ({ row }) => {
                //编辑职位信息
                this.$router.push({
                  path: '/jobMgr/jobAdd',
                  query: { positionId: row.positionId }
                });
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
      if (tab.label === '代理招聘') {
        this.unshowShztColumn = false;
      } else {
        this.unshowShztColumn = true;
      }
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    async queryResult(val) {
      let positionResult = await findPosition({
        cid: this.$store.getters['corporation/cid'],
        status: 'overdue',
        agencyRecruit: this.unshowShztColumn ? 'unagency' : 'agency',
        positionName: $.trim(val),
        pageParam: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '系统异常，查询失败'
        });
      });
      if (positionResult.status == 200) {
        positionResult.result.data.forEach(element => {
          element.actions = ['action1'];
        });
        if (this.unshowShztColumn) {
          this.tableData1 = positionResult.result.data;
        } else {
          this.tableData2 = positionResult.result.data;
        }
      } else {
        if (this.unshowShztColumn) {
          this.tableData1 = [];
        } else {
          this.tableData2 = [];
        }
        this.$message({
          type: 'error',
          message: '查询失败'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#jobQueryOverdued {
  #seek-box {
    margin: 0;
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
