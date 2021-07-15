<!--
 * @Author: GengHH
 * @Date: 2020-12-31 17:09:36
 * @LastEditors: GengHH
 * @LastEditTime: 2021-07-15 15:46:55
 * @Description: 职位收藏子界面
 * @FilePath: \jb2q-hrm-web\src\views\person\remind\systemMsg.vue
-->
<template>
  <div id="jobStarList">
    <div class="title-style">私信</div>
    <el-row>
      <el-col :span="12">
        <pl-button type="danger" icon="el-icon-delete" @click="deleteMsg"
          >删除</pl-button
        >
        <pl-button type="danger" icon="el-icon-delete" @click="readMsg"
          >标记已读</pl-button
        >
      </el-col>
      <el-col :span="12">
        <BaseSearch @clickButton="querySystemMsg($event)"></BaseSearch>
      </el-col>
    </el-row>
    <pl-table
      :data="tableData"
      :totalCount="tableCount"
      ref="msgTable"
      :columns="columns"
      show-pager
      @handleSizeChangeOnBack="handlePageChange"
      @handleCurrentChangeOnBack="handlePageChange"
    >
      <template #readsStatus="{row}">
        <!-- <i class="el-icon-time"></i> -->
        <span style="color:green" v-if="row.readsStatus === '0'">未读</span>
        <span style="color:green" v-else>已读</span>
      </template>
      <template #date="{row}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ row.readTime }}</span>
      </template>
    </pl-table>
    <!-- 职位详细信息 弹窗部分 -->
    <el-dialog
      width="75%"
      v-if="detailsDialog"
      :visible.sync="detailsDialog"
      :before-close="detailsHandleClose"
    >
      {{ oneRow.content }}
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
  deleteBatchNotice,
  updateBatchReadNotice,
  querySystemMsg,
  queryMsgDetails
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
      targetObjId: '',
      oneRow: {}
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
          label: '发送人',
          attrs: { showOverflowTooltip: true },
          prop: 'noticeTypeName',
          rowSpan: 'all'
        },
        {
          label: '标题内容',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'content',
          rowSpan: 'all'
        },
        {
          label: '未/已读',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'readsStatus',
          slotName: 'readsStatus',
          rowSpan: 'all'
        },
        {
          label: '时间',
          attrs: { 'show-overflow-tooltip': true },
          prop: 'readTime',
          formatter: 'date',
          slotName: 'date'
        },
        {
          label: '操作',
          attrs: { width: 200 },
          actions: [
            {
              id: 'action2',
              text: '删除',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-delete',
              onClick: ({ row }) => {
                this.cancelFavorite(row);
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            },
            {
              id: 'action1',
              text: '详情',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-view',
              onClick: ({ row }) => {
                //console.log(row);
                this.oneRow = { ...row };
                this.detailsDialog = true;
                this.readMsg(row);
                // TODO查看职位信息
                //this.queryMsgDetails(row);
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
      return this.$refs.msgTable.multipleSelection;
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
      this.querySystemMsg();
    },
    /**
     *查询收藏职位信息的列表
     */
    async querySystemMsg(arg) {
      let res = await querySystemMsg({
        pageParam: {
          pageIndex: this.$refs.msgTable?.currentPage - 1 || 0,
          pageSize: this.$refs.msgTable?.pageSize || 10
        },
        receiveId: this.$store.getters['person/pid'] || '',
        content: arg
      });
      if (res && res.status === 200) {
        res.result.pageresult.data.forEach(item => {
          item.actions = ['action1'];
        });
        this.tableData = res.result.pageresult.data;
        this.tableCount = res.result.pageresult.total;
      } else if (res) {
        this.tableData = [];
        this.tableCount = 0;
        this.$message.success('未查询到系统消息');
      }
    },
    /**
     * 标记已读
     */
    async readMsg(row) {
      if (
        (!row || typeof row === 'function') &&
        (!this.selection || this.selection.length === 0)
      ) {
        this.$alert('请选择一条');
      } else {
        let res = await updateBatchReadNotice({
          noticeIdList:
            row && typeof row !== 'function'
              ? [row.noticeId]
              : this.selection.map(obj => {
                  return obj.noticeId;
                })
        });
        if (res && res.status === 200) {
          this.$message.success('批量已读成功');
          // 删除数据 （重新加载数据）
          // this.tableData = this.tableData.filter(
          //   obj => !(obj.positionId === row.positionId)
          // );
          this.querySystemMsg();
        } else if (res) {
          this.$message.error('批量已读失败');
        }
      }
    },
    /**
     *删除消息
     */
    async deleteMsg() {
      let that = this;
      if (this.selection && this.selection.length == 0) {
        this.$alert('请选择一条');
      } else {
        let res = await deleteBatchNotice({
          noticeIdList: this.selection.map(obj => {
            return obj.noticeId;
          })
        });
        if (res && res.status === 200) {
          this.$message.success('批量删除成功');
          // 删除数据 （重新加载数据）
          this.querySystemMsg();
        } else if (res) {
          this.$message.error('批量删除失败');
        }
      }
    },
    /**
     * 获取职位的详细信息
     */
    async queryMsgDetails(row) {
      this.loading = true;
      let queryRes = await queryMsgDetails({
        noticeId: row.noticeId
      });
      if (queryRes && queryRes.status === 200) {
        let item = queryRes.result.data || {};
        // if (item.workArea) {
        //   item.workAreaText = getDicText(
        //     this.$store.getters['dictionary/ggjbxx_qx'],
        //     item.workArea
        //   );
        // }
        // if (item.eduRequire) {
        //   item.eduRequireText = getDicText(
        //     this.$store.getters['dictionary/recruit_edu'],
        //     item.eduRequire
        //   );
        // }
        // if (item.workNature) {
        //   item.workNatureText = getDicText(
        //     this.$store.getters['dictionary/recruit_work_nature'],
        //     item.workNature
        //   );
        // }
        // if (item.corpNature) {
        //   item.corpNatureText = getDicText(
        //     this.$store.getters['dictionary/recruit_corp_nature'],
        //     item.corpNature
        //   );
        // }
        // if (item.industryType) {
        //   item.industryTypeText = getDicText(
        //     this.$store.getters['dictionary/recruit_industry_type'],
        //     item.industryType
        //   );
        // }
        // if (item.workYearNeed) {
        //   item.workYearNeedText = getDicText(
        //     this.$store.getters['dictionary/recruit_work_year'],
        //     item.workYearNeed
        //   );
        // }
        // if (item.salaryPayType) {
        //   item.salaryPayTypeText =
        //     '元/' +
        //     getDicText(
        //       this.$store.getters['dictionary/recruit_salary_pay_type'],
        //       item.salaryPayType
        //     );
        // }
        this.onePosition = item || {};
        this.detailsDialog = true;
      } else if (queryRes) {
        this.$message.error('获取详细信息失败');
      }
      this.loading = false;
    },

    /**
     * TODO 职位详细信息页面-聊天
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
    this.querySystemMsg();
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
