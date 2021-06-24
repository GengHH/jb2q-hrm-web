<!--
 * @Author: GengHH
 * @Date: 2020-12-31 17:09:36
 * @LastEditors: GengHH
 * @LastEditTime: 2021-06-24 15:33:33
 * @Description: 职位收藏子界面
 * @FilePath: \jb2q-hrm-web\src\views\person\jobFindFeedback\jobStarList.vue
-->
<template>
  <div id="jobStarList">
    <div class="title-style">职位收藏列表</div>
    <el-row>
      <el-col :span="12">
        <pl-button type="danger" icon="el-icon-delete" @click="deleteFavorite"
          >批量取消</pl-button
        >
      </el-col>
      <el-col :span="12">
        <BaseSearch @clickButton="queryStarList($event)"></BaseSearch>
      </el-col>
    </el-row>
    <pl-table
      :data="tableData"
      :totalCount="tableCount"
      ref="jobTable"
      :columns="columns"
      show-pager
      @handleSizeChangeOnBack="handlePageChange"
      @handleCurrentChangeOnBack="handlePageChange"
    >
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
        @deliveryResume="deliveryResume(arguments)"
        @favorJob="favorJob(arguments)"
        @callPositionCorp="callPositionCorp(arguments)"
      ></job-details>
    </el-dialog>
    <!-- 聊天框 弹窗部分 -->
    <el-dialog
      class="width75 dialog-content-full-screen"
      :visible.sync="wchatDialog"
      :before-close="wchatHandleClose"
    >
      <pl-wchat :targetObjId="targetObjId"></pl-wchat>
    </el-dialog>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import JobDetails from '@/views/person/jobDetails.vue';
import {
  queryPositionStarList,
  attentionOrFavor,
  queryPositionDetail,
  doDeliveryResume,
  doDeliveryResumeRecommend
} from '@/api/personApi';
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
      wchatDialog: false,
      tableData: [],
      tableCount: 0,
      onePosition: {},
      detailsIndex: 0,
      targetObjId: ''
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
          attrs: { 'show-overflow-tooltip': true },
          prop: 'salaryScope',
          rowSpan: 'all'
        },
        {
          label: '学历要求',
          attrs: { 'show-overflow-tooltip': true },
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
          prop: 'workYearNeedText',
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
                //查看职位信息
                this.queryPositionDetail(row);
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
    wchatHandleClose() {
      this.wchatDialog = false;
    },
    handlePageChange() {
      this.queryStarList();
    },
    /**
     *查询收藏职位信息的列表
     */
    async queryStarList() {
      let res = await queryPositionStarList({
        pageParam: {
          pageIndex: this.$refs.jobTable?.currentPage - 1 || 0,
          pageSize: this.$refs.jobTable?.pageSize || 10
        },
        pid: this.$store.getters['person/pid'] || ''
      });
      if (res && res.status === 200) {
        res.result.pageresult.data.forEach(item => {
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
          }
          if (item.eduRequire) {
            item.eduRequireText = getDicText(
              this.$store.getters['dictionary/recruit_edu'],
              item.eduRequire
            );
          }
          if (item.workYearNeed) {
            item.workYearNeedText = getDicText(
              this.$store.getters['dictionary/recruit_work_year'],
              item.workYearNeed
            );
          }
        });
        this.tableData = res.result.pageresult.data;
        this.tableCount = res.result.pageresult.total;
      } else if (res) {
        this.tableData = [];
        this.tableCount = 0;
        this.$message.success('未查询到信息');
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
          id: [row.positionId],
          pid: this.$store.getters['person/pid'],
          status: false
        });
        if (res && res.status === 200) {
          this.$message.success('取消收藏成功');
          // 删除数据 （重新加载数据）
          // this.tableData = this.tableData.filter(
          //   obj => !(obj.positionId === row.positionId)
          // );
          this.queryStarList();
        } else if (res) {
          this.$message.error('取消收藏失败');
        }
      }
    },
    /**
     *删除收藏记录
     */
    async deleteFavorite() {
      let that = this;
      if (this.selection && this.selection.length == 0) {
        this.$alert('请选择一条');
      } else {
        let res = await attentionOrFavor('2', {
          id: this.selection.map(obj => {
            return obj.positionId;
          }),
          pid: this.$store.getters['person/pid'],
          status: false
        });
        if (res && res.status === 200) {
          this.$message.success('批量取消收藏成功');
          // 删除数据 （重新加载数据）
          this.queryStarList();
        } else if (res) {
          this.$message.error('批量取消收藏失败');
        }
      }
    },
    /**
     * 获取职位的详细信息
     */
    async queryPositionDetail(row) {
      this.loading = true;
      let queryRes = await queryPositionDetail({
        positionId: row.positionId
      });
      if (queryRes && queryRes.status === 200) {
        let item = queryRes.result.data || {};
        if (item.workArea) {
          item.workAreaText = getDicText(
            this.$store.getters['dictionary/ggjbxx_qx'],
            item.workArea
          );
        }
        if (item.eduRequire) {
          item.eduRequireText = getDicText(
            this.$store.getters['dictionary/recruit_edu'],
            item.eduRequire
          );
        }
        if (item.workNature) {
          item.workNatureText = getDicText(
            this.$store.getters['dictionary/recruit_work_nature'],
            item.workNature
          );
        }
        if (item.corpNature) {
          item.corpNatureText = getDicText(
            this.$store.getters['dictionary/recruit_corp_nature'],
            item.corpNature
          );
        }
        if (item.industryType) {
          item.industryTypeText = getDicText(
            this.$store.getters['dictionary/recruit_industry_type'],
            item.industryType
          );
        }
        if (item.workYearNeed) {
          item.workYearNeedText = getDicText(
            this.$store.getters['dictionary/recruit_work_year'],
            item.workYearNeed
          );
        }
        if (item.salaryPayType) {
          item.salaryPayTypeText =
            '元/' +
            getDicText(
              this.$store.getters['dictionary/recruit_salary_pay_type'],
              item.salaryPayType
            );
        }
        this.onePosition = item || {};
        this.detailsDialog = true;
      } else if (queryRes) {
        this.$message.error('获取职位详细信息失败');
      }
      this.loading = false;
    },
    /**
     * 职位详细信息页面-投递简历
     */
    async deliveryResume(arg) {
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';
      let recId = (arg && arg[2]) || '';
      if (!recId) {
        //向自己搜索的职位投递简历
        let res = await doDeliveryResume({
          positionId: positionId,
          pid: this.$store.getters['person/pid']
        });
        if (res.status === 200) {
          // 更换按钮
          // this.tableData.splice(index, 1);
          this.tableData[index].applyFor = true;
          this.$message({ type: 'success', message: '简历投递成功' });
        } else {
          this.$message({
            type: 'error',
            message: '简历投递失败'
          });
        }
      } else {
        //向推荐职位投递简历
        let res = await doDeliveryResumeRecommend({
          recId: recId,
          positionId: positionId,
          pid: this.$store.getters['person/pid']
        });
        if (res.status === 200) {
          // 更换按钮
          // this.tableData.splice(index, 1);
          this.queryDefaultResult[index].applyFor = true;
          this.$message({ type: 'success', message: '简历投递成功' });
        } else {
          this.$message({
            type: 'error',
            message: '简历投递失败'
          });
        }
      }
    },
    /**
     * 职位详细信息页面-取消收藏
     */
    async favorJob(arg) {
      let index = arg[0];
      let positionId = (arg && arg[1]) || '';
      let orginFavorType = arg[2];
      let recId = arg[3] || '';
      if (!orginFavorType) {
        let res = await attentionOrFavor('2', {
          id: [positionId],
          pid: this.$store.getters['person/pid'],
          status: true
        });
        if (res.status === 200) {
          // 修改按钮状态
          // if (!recId) {
          //   this.tableData[index].favor = true;
          // } else {
          //   this.queryDefaultResult[index].favor = true;
          // }
          this.detailsDialog = false;
          this.$message({ type: 'success', message: '收藏职位成功' });
        } else {
          this.$message({ type: 'error', message: '收藏职位失败' });
        }
      } else {
        //取消收藏职位
        let res = await attentionOrFavor('2', {
          id: [positionId],
          pid: this.$store.getters['person/pid'],
          status: false
        });
        if (res.status === 200) {
          // 修改按钮状态
          // if (!recId) {
          //   this.tableData[index].favor = false;
          // } else {
          //   this.queryDefaultResult[index].favor = false;
          // }
          this.detailsDialog = false;
          this.$message({ type: 'success', message: '取消收藏职位成功' });
        } else {
          this.$message({ type: 'error', message: '取消收藏职位失败' });
        }
      }
    },
    /**
     * 职位详细信息页面-聊天
     */
    callPositionCorp(arg) {
      console.log(
        '%c 🍸 arg: ',
        'font-size:20px;background-color: #E41A6A;color:#fff;',
        arg
      );

      // let index = arg[0];
      let corpId = (arg && arg[0]) || '';
      this.targetObjId = corpId;
      this.wchatDialog = true;
    }
  },
  mounted() {
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
