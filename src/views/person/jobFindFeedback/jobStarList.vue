<!--
 * @Author: GengHH
 * @Date: 2020-12-31 17:09:36
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-09 15:44:26
 * @Description: 职位收藏子界面
 * @FilePath: \jb2q-hrm-web\src\views\person\jobFindFeedback\jobStarList.vue
-->
<template>
  <div id="jobStarList">
    <div class="title-style">职位收藏列表</div>
    <el-row>
      <el-col :span="12">
        <pl-button type="danger" icon="el-icon-delete" @click="cancelFavorite"
          >删除</pl-button
        >
      </el-col>
      <el-col :span="12">
        <BaseSearch @clickButton="queryStarList($event)"></BaseSearch>
      </el-col>
    </el-row>
    <pl-table :data="tableData" ref="jobTable" :columns="columns" show-pager>
      <template #date="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.favorTime }}</span>
      </template>
    </pl-table>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import { queryPositionStarList } from '@/api/personApi';
export default {
  name: 'jobStarList',
  components: {
    BaseSearch
  },
  data() {
    return {
      tableData: []
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
          attrs: { showOverflowTooltip: true },
          prop: 'corpName',
          rowSpan: 'all'
        },
        {
          label: '职位名称',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'positionName',
          rowSpan: 'all'
        },
        {
          label: '职位薪资',
          prop: 'salaryScope',
          rowSpan: 'all'
        },
        {
          label: '学历要求',
          prop: 'eduRequire',
          rowSpan: 'all'
        },
        {
          label: '工作性质',
          prop: 'workNature',
          rowSpan: 'all'
        },
        {
          label: '工作年限',
          prop: 'workYearNeed',
          rowSpan: 'all'
        },
        {
          label: '招聘人数',
          prop: 'recruitNum',
          rowSpan: 'all'
        },
        {
          label: '工作地点',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'workArea',
          rowSpan: 'all'
        },
        {
          label: '收藏时间',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'favorTime',
          formatter: 'date',
          slotName: 'date'
        },
        {
          label: '操作',
          attrs: { width: 200 },
          actions: [
            {
              id: 'action1',
              text: '查看',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-search',
              onClick: ({ row }) => {
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action2',
              text: '收藏',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-edit',
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
    async queryStarList() {
      let res = await queryPositionStarList({
        pid: this.$store.getters['person/pid'] || ''
      });
      if (res.status === 200) {
        res.result.data.forEach(item => {
          item.actions = ['action1', 'action2'];
        });
        this.tableData = res.result.data;
      } else {
        this.$message({ type: 'success', message: '未查询到信息' });
      }
    },
    cancelFavorite() {
      let that = this;
      if (this.selection && this.selection.length == 0) {
        this.$alert('请选择一条');
      } else {
        // TODO 删除数据
        that.tableData = that.tableData.filter(
          obj => !that.selection.some(i => obj.id === i.id)
        );
      }
    }
  },
  created() {
    this.queryStarList();
  }
};
</script>

<style lang="scss" scoped>
#jobStarList {
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
