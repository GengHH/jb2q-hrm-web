<!--
 * @Author: GengHH
 * @Date: 2020-12-16 10:36:14
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-22 16:13:18
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobFindMgr\resumeCollected.vue
-->
<template>
  <div id="resumeCollected">
    <div class="title-style">已收藏的简历</div>
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
          <el-date-picker
            v-model="queryParam.favorDate"
            type="daterange"
            align="right"
            unlink-panels
            label="123"
            range-separator="至"
            start-placeholder="收藏开始日期"
            end-placeholder="收藏结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <pl-button
            class="orange-btn"
            icon="el-icon-edit"
            @click="doFavorResume"
            >批量操作</pl-button
          >
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
    <pl-table :data="tableData" ref="resumeTable" :columns="columns" show-pager>
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
import { doFavorResume } from '@/api/corporationApi';
export default {
  name: 'resumeCollected',
  data() {
    return {
      queryParam: {
        // feedBackStatus: '',
        gjz: '',
        ageMin: '',
        ageMax: '',
        positionName: '',
        workYear: '',
        eduLevel: '',
        favorDate: '',
        pageParam: {
          pageSize: 10,
          pageIndex: 0
        }
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
          label: '姓名',
          prop: 'name',
          customerRenderText: ({ row }) => {
            const { name } = row;
            return name ? name.substr(0, 1) + '**' : name;
          },
          rowSpan: 'all'
        },
        {
          label: '年龄',
          prop: 'age',
          rowSpan: 'all'
        },
        {
          label: '学历',
          prop: 'city',
          rowSpan: 'all'
        },
        {
          label: '工作年限',
          prop: 'province',
          rowSpan: 'all'
        },
        {
          label: '职位名称',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'positionName',
          rowSpan: 'all'
        },
        {
          label: '简历最近修改时间',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'date',
          formatter: 'date',
          slotName: 'date'
        },
        {
          label: '账号最近登录时间',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'date',
          formatter: 'date',
          slotName: 'date'
        },
        {
          label: '收藏时间',
          attrs: { 'show-overflow-tooltip': true },
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
          attrs: { width: 120 },
          actions: [
            {
              id: 'action1',
              text: '取消收藏',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-star-on',
              onClick: ({ row }) => {
                //console.log(row);
                this.doFavorResume(row);
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
      return this.$refs.resumeTable.multipleSelection;
    }
  },
  methods: {
    /**
     * 单个取消和批量取消
     */
    async doFavorResume(row) {
      if (!row && this.selection && this.selection.length == 0) {
        this.$alert('请选择一条');
      } else {
        //取消收藏简历
        let res = await doFavorResume({
          resumeId: row
            ? [resumeId]
            : this.selection.map(obj => {
                return obj.resumeId;
              }),
          cid: this.$store.getters['corporation/cid'],
          favorType: false
        });
        if (res.status === 200) {
          // 修改按钮状态
          this.queryResult[index].favor = false;
          this.$message({ type: 'success', message: '取消收藏简历成功' });
        } else {
          this.$message({ type: 'error', message: '取消收藏简历失败' });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#resumeCollected {
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
