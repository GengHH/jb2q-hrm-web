<!--
 * @Author: GengHH
 * @Date: 2021-03-18 10:55:17
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-18 16:37:09
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobFindMgr\resumeReceived.vue
-->
<template>
  <div id="resumeReceived">
    <div class="title-style">收到的简历</div>
    <el-form>
      <el-row :gutter="20">
        <el-col :span="8">
          <pl-input
            v-model="queryParam.gjz"
            autocomplete="off"
            label="关键字"
          ></pl-input>
        </el-col>
        <el-col :span="8">
          <el-col :span="11" class="text-left no-col-padding">
            <pl-input
              v-model="queryParam.gjz"
              autocomplete="off"
              label="年龄（小）"
            ></pl-input>
          </el-col>
          <el-col :span="2" class="text-center no-col-padding">
            <span class="delimiter">-</span>
          </el-col>
          <el-col :span="11" class="text-right no-col-padding">
            <pl-input
              v-model="queryParam.gjz"
              autocomplete="off"
              label="年龄（大）"
            ></pl-input>
          </el-col>
        </el-col>
        <el-col :span="8">
          <pl-input
            v-model="queryParam.gjz"
            autocomplete="off"
            label="职位名称"
          ></pl-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <pl-select
            v-model="queryParam.gjz"
            :optionData="dicGznx"
            label="工作年限"
          >
          </pl-select>
        </el-col>
        <el-col :span="8">
          <pl-select
            v-model="queryParam.gjz"
            :optionData="$store.getters['dictionary/recruit_edu']"
            label="学历"
          >
          </pl-select>
        </el-col>
        <el-col :span="8"> </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <pl-button class="orange-btn" icon="el-icon-edit">批量操作</pl-button>
        </el-col>
        <el-col :span="8"> </el-col>
        <el-col :span="8">
          <el-col :span="8" class="no-col-padding text-left">
            <pl-button class="orange-btn" icon="el-icon-search">搜索</pl-button>
          </el-col>
          <el-col :span="8" class="no-col-padding text-center">
            <pl-button>清空</pl-button>
          </el-col>
          <el-col :span="8" class="no-col-padding text-right">
            <pl-button>高级搜索</pl-button>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <!-- 查询结果Tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未查看" name="first">
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
          <template #star="{row}">
            <el-rate v-model="row.star"></el-rate>
          </template>
        </pl-table>
      </el-tab-pane>
      <el-tab-pane label="待处理" name="second">待处理</el-tab-pane>
      <el-tab-pane label="通知面试" name="third">通知面试</el-tab-pane>
      <el-tab-pane label="通知录用" name="fourth">通知录用</el-tab-pane>
      <el-tab-pane label="通知不录用" name="fifth">通知不录用</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'resumeReceived',
  data() {
    return {
      activeName: 'first',
      queryParam: {
        gjz: ''
      },
      data: [],
      dicGznx: [
        {
          value: '1',
          label: '不足一年'
        }
      ],
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
          actions: ['action1']
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
          label: '姓名',
          prop: 'name',
          rowSpan: 'all'
        },
        {
          label: '职位名称',
          prop: 'name',
          rowSpan: 'all'
        },
        {
          label: '年龄',
          prop: 'age',
          rowSpan: 'all'
        },
        {
          label: '工作年限',
          prop: 'province',
          rowSpan: 'all'
        },
        {
          label: '学历',
          prop: 'city',
          rowSpan: 'all'
        },
        {
          label: '投递时间',
          prop: 'date',
          formatter: 'date',
          slotName: 'date'
        },
        // { label: '评分', prop: 'star', slotName: 'star' },
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
              text: '查看简历',
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
    }
  }
};
</script>

<style lang="scss" scoped>
#resumeReceived {
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
}
</style>
