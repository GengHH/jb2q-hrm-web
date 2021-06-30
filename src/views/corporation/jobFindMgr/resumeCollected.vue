<!--
 * @Author: GengHH
 * @Date: 2020-12-16 10:36:14
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-30 18:10:34
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobFindMgr\resumeCollected.vue
-->
<template>
  <div
    id="resumeCollected"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <div class="title-style">已收藏的简历</div>
    <el-form>
      <el-row :gutter="20">
        <el-col :span="8">
          <pl-input
            v-model="queryParam.keyWord"
            autocomplete="off"
            label="关键字"
          ></pl-input>
        </el-col>
        <el-col :span="8">
          <el-col :span="11" class="text-left no-col-padding">
            <pl-input
              v-model="queryParam.ageMin"
              autocomplete="off"
              label="年龄（小）"
            ></pl-input>
          </el-col>
          <el-col :span="2" class="text-center no-col-padding">
            <span class="delimiter">-</span>
          </el-col>
          <el-col :span="11" class="text-right no-col-padding">
            <pl-input
              v-model="queryParam.ageMax"
              autocomplete="off"
              label="年龄（大）"
            ></pl-input>
          </el-col>
        </el-col>
        <el-col :span="8">
          <pl-input
            v-model="queryParam.positionName"
            autocomplete="off"
            label="职位名称"
          ></pl-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <pl-select
            v-model="queryParam.workYear"
            :optionData="dicGznx"
            label="工作年限"
          >
          </pl-select>
        </el-col>
        <el-col :span="8">
          <pl-select
            v-model="queryParam.eduLevel"
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
            <pl-button
              class="orange-btn"
              icon="el-icon-search"
              @click="queryFavorList"
              >搜索</pl-button
            >
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
    <pl-table
      :data="tableData"
      :totalCount="tableCount"
      ref="resumeTable"
      :columns="columns"
      @handleSizeChangeOnBack="queryFavorList"
      @handleCurrentChangeOnBack="queryFavorList"
      show-pager
    >
      <template #updateTime="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.updateTime }}</span>
      </template>
      <template #loginTime="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.loginTime }}</span>
      </template>
      <template #favorStartTime="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.favorStartTime }}</span>
      </template>
    </pl-table>
  </div>
</template>

<script>
import { doFavorResume, findFavorList } from '@/api/corporationApi';
import { niceScroll, niceScrollUpdate } from '@/utils';
export default {
  name: 'resumeCollected',
  data() {
    return {
      loading: false,
      queryParam: {
        // feedBackStatus: '',
        cid: this.$store.getters['corporation/cid'],
        keyWord: '',
        ageMin: '',
        ageMax: '',
        positionName: '',
        workYear: '',
        eduLevel: '',
        favorDate: [],
        favorStartDate: '',
        favorEndDate: '',
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
      tableCount: 0,
      tableData: []
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
          prop: 'xm',
          customerRenderText: ({ row }) => {
            return row.xm ? row.xm.substr(0, 1) + '**' : row.xm;
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
          prop: 'eduLevel',
          customerRenderText: ({ row }) => {
            const { eduLevel } = row;
            const data = this.$store.getters['dictionary/recruit_edu'] || [];
            return (
              data.find(element => element.value === eduLevel)?.label ||
              eduLevel
            );
          },
          rowSpan: 'all'
        },
        {
          label: '工作年限（年）',
          prop: 'workYear',
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
          prop: 'updateTime',
          formatter: 'date',
          slotName: 'updateTime'
        },
        {
          label: '账号最近登录时间',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'loginTime',
          formatter: 'date',
          slotName: 'loginTime'
        },
        {
          label: '收藏时间',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'favorStartTime',
          formatter: 'date',
          slotName: 'favorStartTime'
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
  watch: {
    'queryParam.favorDate': function(val) {
      if (val && val.length > 0) {
        this.queryParam.favorStartDate = val[0] + ' 00:00:00' || '';
        this.queryParam.favorEndDate =
          val.length > 1 ? val[1] + ' 23:59:59' || '' : '';
      } else {
        this.queryParam.favorStartDate = '';
        this.queryParam.favorEndDate = '';
      }
    }
  },
  methods: {
    /**
     * 单个取消和批量取消收藏
     */
    async doFavorResume(row) {
      if (
        (!row || typeof row == 'function') &&
        this.selection &&
        this.selection.length == 0
      ) {
        this.$alert('请选择一条');
      } else {
        //取消收藏简历
        let res = await doFavorResume({
          resumeIdList: row
            ? [row.resumeId]
            : this.selection.map(obj => {
                return obj.resumeId;
              }),
          cid: this.$store.getters['corporation/cid'],
          favorType: false
        });
        if (res.status === 200) {
          // 修改按钮状态
          // this.queryResult[index].favor = false;
          this.$message({ type: 'success', message: '取消收藏简历成功' });
        } else {
          this.$message({ type: 'error', message: '取消收藏简历失败' });
        }
      }
    },
    async queryFavorList() {
      let _pageSize = this.$refs.resumeTable?.pageSize || 10,
        _pageIndex = this.$refs.resumeTable?.currentPage - 1 || 0;
      let params = { ...this.queryParam };
      params.pageParam.pageSize = _pageSize;
      params.pageParam.pageIndex = _pageIndex;
      this.loading = true;
      let queryRes = await findFavorList(params);
      if (queryRes && queryRes.status === 200) {
        queryRes.result.pageresult.data.forEach(item => {
          item.actions = ['action1'];
        });
        this.tableCount = queryRes.result.pageresult.total || 0;
        this.tableData = queryRes.result.pageresult.data || [];
        this.$message.success('获取收藏简历信息成功');
      } else if (queryRes) {
        this.$message.error('获取收藏简历信息失败');
      }
      this.loading = false;
    }
  },
  mounted() {
    niceScroll('#indexApp');
    this.queryFavorList();
  },
  updated() {
    // 更新滚动条
    this._.throttle(niceScrollUpdate, 500)();
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
