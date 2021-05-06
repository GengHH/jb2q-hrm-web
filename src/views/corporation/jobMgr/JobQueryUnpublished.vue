<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-06 18:06:51
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobMgr\JobQueryUnpublished.vue
-->
<template>
  <div id="jobQueryUnpublished">
    <div class="title-style">未发布职位</div>
    <el-row>
      <el-col :span="12">
        <pl-button type="danger" icon="el-icon-delete" @click="deleteJob"
          >删除</pl-button
        >
        <pl-button class="orange-btn" icon="el-icon-thumb" @click="publickJob"
          >发布</pl-button
        >
      </el-col>
      <el-col :span="12">
        <BaseSearch @clickButton="queryResult($event)"></BaseSearch>
      </el-col>
    </el-row>
    <pl-table :data="tableData" ref="jobTable" :columns="columns" show-pager>
      <template #date="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.date }}</span>
      </template>
      <template #star="{row}">
        <el-rate v-model="row.star"></el-rate>
      </template>
    </pl-table>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import { findPosition } from '@/api/corporationApi';
export default {
  name: 'jobQueryUnpublished',
  components: {
    BaseSearch
  },
  data() {
    return {
      pageSize: 10,
      pageIndex: 0,
      tableData: [
        {
          positionId: '4',
          editId: '',
          positionName: 'JAVA架构工程师',
          workAddress: '上海市普陀区中江路889号804室',
          salaryScope: '20-50(04)',
          describe: '',
          actions: ['action1']
        },
        {
          positionId: '3',
          editId: '',
          positionName: 'JAVA超高级工程师',
          workAddress: '上海市普陀区中江路889号804室',
          salaryScope: '20-50(04)',
          describe: '',
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
    },
    selection() {
      return this.$refs.jobTable.multipleSelection;
    }
  },
  methods: {
    async queryResult(val) {
      let positionResult = await findPosition({
        cid: this.$store.getters['corporation/cid'],
        status: 'unrelease',
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
        this.tableData = positionResult.result.data;
      } else {
        this.tableData = [];
        this.$message({
          type: 'error',
          message: '查询失败'
        });
      }
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
    publickJob() {
      let that = this;
      if (this.selection && this.selection.length == 0) {
        this.$alert('请选择一条');
      } else {
        // TODO 发布数据
        this.$alert('发布成功');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#jobQueryUnpublished {
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
