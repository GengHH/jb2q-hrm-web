<!--
 * @Author: GengHH
 * @Date: 2020-12-31 17:09:36
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-18 17:13:08
 * @Description: 职位收藏子界面
 * @FilePath: \jb2q-hrm-web\src\views\person\jobFindFeedback\jobStarList.vue
-->
<template>
  <div id="jobStarList">
    <div class="title-style">职位收藏列表</div>
    <el-row>
      <el-col :span="12">
        <pl-button type="danger" icon="el-icon-delete" @click="deleteFavorite"
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
    <!-- 职位详细信息 弹窗部分 -->
    <el-dialog
      width="75%"
      v-if="detailsDialog"
      :visible.sync="detailsDialog"
      :before-close="detailsHandleClose"
    >
      <job-details
        :positionData="onePosition"
        :index="detailsIndex"
        @perfectResume="perfectResume"
        @uploadResume="uploadResume"
        @deliveryResume="deliveryResume(arguments)"
        @favorJob="favorJob(arguments)"
        @callPositionCorp="callPositionCorp(arguments)"
      ></job-details>
    </el-dialog>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import JobDetails from '@/views/person/jobDetails.vue';
import { queryPositionStarList, attentionOrFavor } from '@/api/personApi';
import { getDicText } from '@/utils';

export default {
  name: 'jobStarList',
  components: {
    BaseSearch,
    JobDetails
  },
  data() {
    return {
      detailsDialog: false,
      tableData: [],
      onePosition: {},
      detailsIndex: 0
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
          prop: 'eduRequireText',
          rowSpan: 'all'
        },
        {
          label: '工作性质',
          prop: 'workNatureText',
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
          prop: 'workAreaText',
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
              icon: 'el-icon-view',
              onClick: ({ row }) => {
                //console.log(row);
                // this.detailsDialog = true;
                this.$alert('此功能暂未开放，请稍后');
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action2',
              text: '取消收藏',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-star-on',
              onClick: ({ row }) => {
                this.cancelFavorite(row);
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
    detailsHandleClose() {
      this.detailsDialog = false;
    },
    /**
     *查询收藏简历信息的列表
     */
    async queryStarList() {
      let res = await queryPositionStarList({
        pid: this.$store.getters['person/pid'] || ''
      });
      if (res.status === 200) {
        res.result.data.forEach(item => {
          item.actions = ['action1', 'action2'];
          // 转换字典
          if (item.workArea) {
            item.workAreaText = getDicText(
              this.$store.getters['dictionary/ggjbxx_qx'],
              item.workArea
            );
          }
          if (item.industryType) {
            item.industryTypeText = getDicText(
              this.$store.getters['dictionary/recruit_industry_type'],
              item.industryType
            );
          }
          if (item.workNature) {
            item.workNatureText = getDicText(
              this.$store.getters['dictionary/recruit_work_nature'],
              item.workNature
            );
            if (item.eduRequire) {
              item.eduRequireText = getDicText(
                this.$store.getters['dictionary/recruit_edu'],
                item.eduRequire
              );
            }
          }
        });
        this.tableData = res.result.data;
      } else {
        this.$message({ type: 'success', message: '未查询到信息' });
      }
    },
    /**
     *取消收藏记录
     */
    async cancelFavorite(row) {
      if (!row) {
        this.$alert('请选择一条');
      } else {
        let res = await attentionOrFavor('2', {
          id: row.positionId,
          pid: this.$store.getters['person/pid'],
          status: false
        });
        if (res && res.status === 200) {
          this.$message.success('取消收藏成功');
          // TODO 删除数据 （重新加载数据）
          this.tableData = this.tableData.filter(
            obj => !(obj.positionId === row.positionId)
          );
        } else if (res) {
          this.$message.error('取消收藏失败');
        }
      }
    },
    /**
     *删除收藏记录
     */
    deleteFavorite() {
      this.$alert('此功能暂未开放，请稍后');
      return;
      let that = this;
      if (this.selection && this.selection.length == 0) {
        this.$alert('请选择一条');
      } else {
        // TODO 删除数据
        that.tableData = that.tableData.filter(
          obj => !that.selection.some(i => obj.positionId === i.positionId)
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
