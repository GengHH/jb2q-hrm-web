<!--
 * @Author: GengHH
 * @Date: 2020-12-16 10:36:14
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-12 18:59:35
 * @Description: 招聘会收到简历子界面
-->
<template>
  <div id="jobFairResume">
    <div class="title-style">招聘会收到简历</div>
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
        <el-col :span="8">
          <!-- <el-date-picker
            v-model="queryParam.gjz"
            type="daterange"
            align="right"
            unlink-panels
            label="123"
            range-separator="至"
            start-placeholder="收藏开始日期"
            end-placeholder="收藏结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker> -->
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <pl-button class="orange-btn" icon="el-icon-edit">批量删除</pl-button>
        </el-col>
        <el-col :span="8"> </el-col>
        <el-col :span="8">
          <el-col :span="8" class="no-col-padding text-left">
            <pl-button class="orange-btn" icon="el-icon-search">搜索</pl-button>
          </el-col>
          <el-col :span="8" class="no-col-padding text-center">
            <pl-button>清屏</pl-button>
          </el-col>
          <el-col :span="8" class="no-col-padding text-right">
            <pl-button>高级搜索</pl-button>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
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
export default {
  name: 'jobFairResume',
  data() {
    return {
      queryParam: {
        gjz: ''
      },
      data: [],
      dicGznx: this.$store.getters['dictionary/recruit_work_year'],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
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
          actions: ['action1', 'action2', 'action3']
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
          actions: ['action1', 'action2', 'action3']
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
          actions: ['action1', 'action2', 'action3']
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
          actions: ['action1', 'action2', 'action3']
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
          actions: ['action1', 'action2', 'action3']
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
          attrs: { 'show-overflow-tooltip': true },
          prop: 'positionName',
          rowSpan: 'all'
        },
        {
          label: '招聘时间',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'date',
          formatter: 'date',
          slotName: 'date'
        },
        {
          label: '姓名',
          prop: 'name',
          rowSpan: 'all'
        },
        {
          label: '职位名称',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'positionName',
          rowSpan: 'all'
        },
        {
          label: '操作',
          attrs: { width: 400 },
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
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action1',
              text: '反馈',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-edit',
              onClick: ({ row }) => {
                //console.log(row);
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action3',
              text: '聊天',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-chat-dot-round',
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
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
#jobFairResume {
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
