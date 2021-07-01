<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-17 17:13:54
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobMgr\JobQueryPublished.vue
-->
<template>
  <div id="jobQueryPublished">
    <div class="title-style">已发布职位</div>
    <el-row>
      <el-col :span="12">
        <pl-button class="orange-btn" icon="el-icon-upload2" @click="topJob"
          >置顶</pl-button
        >
        <pl-button type="danger" icon="el-icon-download" @click="offJob"
          >下架</pl-button
        >
      </el-col>
      <el-col :span="12">
        <BaseSearch @clickButton="queryResultByBtn($event)"></BaseSearch>
      </el-col>
    </el-row>
    <!-- 查询结果Tabs -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="自主招聘" name="first">
        <pl-table
          :data="tableData1"
          :totalCount="totalCount1"
          ref="serveTable1"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange1"
          @handleCurrentChangeOnBack="handlePageChange1"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.releaseTime }}</span>
          </template>
        </pl-table>
      </el-tab-pane>
      <el-tab-pane label="代理招聘" name="second"
        ><pl-table
          :data="tableData2"
          :totalCount="totalCount2"
          ref="serveTable3"
          :columns="columns"
          show-pager
          @selection-change="handleSelectionChange"
          @handleSizeChangeOnBack="handlePageChange2"
          @handleCurrentChangeOnBack="handlePageChange2"
        >
          <template #date="{row}">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ row.releaseTime }}</span>
          </template>
        </pl-table></el-tab-pane
      >
    </el-tabs>

    <!----------------------->
    <!-- 不参见面试弹框 -->
    <!----------------------->
    <el-dialog title="原因" :visible.sync="dialog2">
      <pl-input
        type="textarea"
        label="请输入下架原因（1000字符）"
        v-model="offReason"
      ></pl-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button type="primary" @click="offJobs">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import {
  findPosition,
  doOffPosition,
  doTopPosition
} from '@/api/corporationApi';
const STATUS_TAG_MAP = {
  1: { text: '待审核', type: 'info' },
  2: { text: '审核通过', type: 'success' },
  3: { text: '驳回', type: 'danger' }
};
export default {
  name: 'jobQueryPublished',
  components: {
    BaseSearch
  },
  data() {
    return {
      activeName: 'first',
      unshowShztColumn: true,
      totalCount1: 0,
      totalCount2: 0,
      dialog2: false,
      offReason: '',
      tableData1: [],
      tableData2: []
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
          label: '职位编号',
          prop: 'positionCode',
          rowSpan: 'all'
        },
        {
          label: '职位名称',
          prop: 'positionName',
          rowSpan: 'all'
        },
        {
          label: '薪酬',
          prop: 'salaryScope',
          rowSpan: 'all'
        },
        {
          label: '工作地点',
          prop: 'workAddress',
          rowSpan: 'all'
        },
        {
          label: '操作时间',
          prop: 'releaseTime',
          formatter: 'date',
          slotName: 'date'
        },
        {
          label: '审核状态',
          prop: 'statusId',
          unshow: this.unshowShztColumn,
          tagMap: STATUS_TAG_MAP
        },
        {
          label: '操作',
          attrs: { width: 100 },
          actions: [
            {
              id: 'action1',
              text: '查看',
              attrs: { round: true, size: 'small' },
              icon: 'el-icon-view',
              onClick: ({ row }) => {
                //编辑职位信息
                this.$router.push({
                  path: '/jobMgr/jobAdd',
                  query: { positionId: row.positionId, disabled: true }
                });
              },
              hidden: ({ row }, item) => {
                return !row?.actions?.find(c => c === item.id);
              }
            }
          ]
        }
      ];
    },
    selection1() {
      return this.$refs.serveTable1.multipleSelection;
    },
    selection2() {
      return this.$refs.serveTable2.multipleSelection;
    }
  },
  created() {
    this.queryResult('first');
    this.queryResult('second');
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
    },
    queryResultByBtn(val) {
      this.positionName = $.trim(val);
      this.queryResult('first');
      this.queryResult('second');
    },
    /**
     * witchTable: first自主招聘； witchTable: second代理招聘
     */
    async queryResult(witchTable) {
      let _pageSize =
          (witchTable === 'first'
            ? this.$refs.serveTable1?.pageSize
            : this.$refs.serveTable2?.pageSize) || 10,
        _pageIndex =
          (witchTable === 'first'
            ? this.$refs.serveTable1?.currentPage - 1
            : this.$refs.serveTable2?.currentPage - 1) || 0;
      let positionResult = await findPosition({
        cid: this.$store.getters['corporation/cid'],
        status: 'released',
        recruitType: witchTable === 'first' ? '1' : '2', //1：自主招聘，2：代理招聘
        positionName: this.positionName,
        pageParam: {
          pageSize: _pageSize,
          pageIndex: _pageIndex
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '系统异常，查询失败'
        });
      });
      if (positionResult.status == 200) {
        positionResult.result.pageresult.data.forEach(element => {
          element.actions = ['action1'];
        });
        if (witchTable === 'first') {
          this.tableData1 = positionResult.result.pageresult.data;
          this.totalCount1 = positionResult.result.pageresult.total || 0;
        } else {
          this.tableData2 = positionResult.result.pageresult.data;
          this.totalCount2 = positionResult.result.pageresult.total || 0;
        }
      } else {
        if (witchTable === 'first') {
          this.tableData1 = [];
          this.totalCount1 = 0;
        } else {
          this.tableData2 = [];
          this.totalCount2 = 0;
        }
        this.$message({
          type: 'error',
          message: '查询失败'
        });
      }
    },
    /**
     * 置顶职位
     */
    topJob() {
      let that = this;
      if (
        (this.activeName === 'first' &&
          this.selection1 &&
          this.selection1.length == 0) ||
        (this.activeName === 'second' &&
          this.selection2 &&
          this.selection2.length == 0)
      ) {
        this.$alert('请选择一条');
      } else {
        // TODO删除数据
        that
          .$confirm('确定置顶所选职位, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          })
          .then(() => {
            //参数
            let _positionIdList = [];
            if (this.activeName == 'first') {
              this.selection1.forEach(i => {
                _positionIdList.push(i.editId || i.positionId);
              });
            } else if (this.activeName == 'second') {
              this.selection2.forEach(i => {
                _positionIdList.push(i.editId || i.positionId);
              });
            }
            doTopPosition({
              positionIdList: _positionIdList
            }).then(deleteRes => {
              if (deleteRes && deleteRes.status === 200) {
                // that.tableData = that.tableData.filter(
                //   obj => !that.selection.some(i => obj.id === i.id)
                // );
                this.queryResult(this.activeName);
                this.$message({
                  type: 'success',
                  message: '置顶成功'
                });
              } else if (deleteRes) {
                this.$message({
                  type: 'error',
                  message: '置顶失败'
                });
              }
            });
          });
      }
    },
    /**
     * 下架职位
     */
    offJob() {
      let that = this;
      if (
        (this.activeName === 'first' &&
          this.selection1 &&
          this.selection1.length == 0) ||
        (this.activeName === 'second' &&
          this.selection2 &&
          this.selection2.length == 0)
      ) {
        this.$alert('请选择一条');
      } else {
        // TODO发布数据
        that
          .$confirm('确定下架所选职位, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.dialog2 = true;
          });
      }
    },
    offJobs() {
      if (!this.offReason) {
        this.$alert('请输入下架原因');
      }
      let positionIdList = [];
      if (this.activeName === 'first') {
        this.selection1.forEach(i => {
          positionIdList.push(i.positionId);
        });
      } else if (this.activeName === 'second') {
        this.selection2.forEach(i => {
          positionIdList.push(i.positionId);
        });
      }
      let _positionIdList = [...new Set(positionIdList)];
      doOffPosition({
        positionIdList: _positionIdList,
        offReason: this.offReason
      }).then(releaseRes => {
        if (releaseRes && releaseRes.status === 200) {
          // that.tableData = that.tableData.filter(
          //   obj => !that.selection.some(i => obj.id === i.id)
          // );
          this.$message({
            type: 'success',
            message: '下架成功'
          });
        } else if (releaseRes) {
          this.$message({
            type: 'error',
            message: '下架失败'
          });
        }
      });
    },
    /**
     *后台分页功能
     */
    handlePageChange1() {
      this.queryResult('first');
    },
    /**
     *后台分页功能
     */
    handlePageChange2() {
      this.queryResult('second');
    }
  }
};
</script>

<style lang="scss" scoped>
#jobQueryPublished {
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
