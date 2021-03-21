<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-18 18:08:53
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobMgr\JobQueryOffline.vue
-->
<template>
  <div id="jobQueryOffline">
    <div class="title-style">已下架职位</div>
    <el-row>
      <el-col :span="12">
        <pl-button type="danger" icon="el-icon-delete">删除</pl-button>
        <pl-button class="orange-btn" icon="el-icon-thumb">重新发布</pl-button>
      </el-col>
      <el-col :span="12">
        <BaseSearch></BaseSearch>
      </el-col>
    </el-row>
    <!-- 查询结果Tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="自助招聘" name="first">
        <pl-table
          :data="tableData"
          ref="serveTable"
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
          :data="tableData"
          ref="serveTable"
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
export default {
  name: 'jobQueryOffline',
  components: {
    BaseSearch
  },
  data() {
    return {
      activeName: 'first',
      unshowShztColumn: true,
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
          label: '审核状态',
          prop: 'age',
          unshow: this.unshowShztColumn,
          rowSpan: 'all'
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
    }
  }
};
</script>

<style lang="scss" scoped>
#jobQueryOffline {
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
