<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-18 17:07:13
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobMgr\JobSearch.vue
-->
<template>
  <div id="jobQueryUnpublished">
    <div class="title-style">已收藏的简历</div>
    <div>
      <BaseSearch></BaseSearch>
    </div>
    <pl-table :data="tableData" ref="serveTable" :columns="columns" show-pager>
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
export default {
  name: 'jobQueryUnpublished',
  components: {
    BaseSearch
  },
  data() {
    return {
      tableData: [
        {
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
          date: '2019-05-02',
          star: null,
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
          prop: 'name',
          rowSpan: 'all'
        },
        {
          label: '工作地点',
          prop: 'age',
          rowSpan: 'all'
        },
        {
          label: '操作时间',
          prop: 'date',
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
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row.actions.find(c => c === item.id);
              }
            }
          ]
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
#jobQueryUnpublished {
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
