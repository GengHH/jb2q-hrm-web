<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-17 17:13:47
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobMgr\JobQueryOverdued.vue
-->
<template>
  <div id="jobQueryOverdued">
    <div class="title-style">已过期职位</div>
    <el-row>
      <el-col :span="12">
        <pl-button type="danger" icon="el-icon-delete" @click="deleteJob"
          >删除</pl-button
        >
        <!-- <pl-button class="orange-btn" icon="el-icon-thumb" @click="releaseJob"
          >发布</pl-button
        > -->
        <!-- <pl-button
          btnClass="red-btn"
          icon="el-icon-delete"
          confirmType="pop"
          :popConfig="popConfig1"
          @confirm="doDeletePosition($event)"
          >删除</pl-button
        >
        <pl-button
          btnClass="orange-btn"
          icon="el-icon-thumb"
          confirmType="pop"
          :popConfig="popConfig2"
          @confirm="doReleasePosition($event)"
          >重新发布</pl-button
        > -->
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
      <el-tab-pane label="代理招聘" name="second">
        <pl-table
          :data="tableData2"
          :totalCount="totalCount2"
          ref="serveTable2"
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
  </div>
</template>

<script>
import BaseSearch from '@/components/common/BaseSearch';
import {
  findPosition,
  doDeletePosition,
  doReleaseAgainPosition
} from '@/api/corporationApi';
const STATUS_TAG_MAP = {
  1: { text: '待审核', type: 'info' },
  2: { text: '审核通过', type: 'success' },
  3: { text: '驳回', type: 'danger' }
};
export default {
  name: 'jobQueryOverdued',
  components: {
    BaseSearch
  },
  data() {
    return {
      activeName: 'first',
      unshowShztColumn: true,
      totalCount1: 0,
      totalCount2: 0,
      tableData1: [],
      tableData2: []
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
          prop: 'editId',
          formatter: 'releaseTime',
          slotName: 'date'
        },
        {
          label: '审核状态',
          prop: 'editId',
          unshow: this.unshowShztColumn,
          tagMap: STATUS_TAG_MAP
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
                //编辑职位信息
                this.$router.push({
                  path: '/jobMgr/jobAdd',
                  query: { editId: row.editId, positionId: row.positionId }
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
        status: 'overdue',
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
     * 删除职位
     */
    deleteJob() {
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
          .$confirm('确定删除所选职位, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
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
            doDeletePosition({ editIdList: _positionIdList }).then(
              deleteRes => {
                if (deleteRes && deleteRes.status === 200) {
                  // if (that.witchTable === 'first') {
                  //   that.tableData1 = that.tableData1.filter(
                  //     obj => !that.selection1.some(i => obj.id === i.id)
                  //   );
                  // } else {
                  //   that.tableData2 = that.tableData2.filter(
                  //     obj => !that.selection2.some(i => obj.id === i.id)
                  //   );
                  // }
                  //回显数据
                  this.queryResult(this.witchTable);
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                } else if (deleteRes) {
                  this.$message({
                    type: 'error',
                    message: '删除失败'
                  });
                }
              }
            );
          });
      }
    },
    /**
     * 发布职位 TODO
     */
    releaseJob() {
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
          .$confirm('确定发布所选职位, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          })
          .then(() => {
            doReleaseAgainPosition().then(releaseRes => {
              if (releaseRes && releaseRes.status === 200) {
                //回显数据
                this.queryResult(this.witchTable);
                this.$message({
                  type: 'success',
                  message: '发布成功'
                });
              } else if (releaseRes) {
                this.$message({
                  type: 'error',
                  message: '发布失败'
                });
              }
            });
          });
      }
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
#jobQueryOverdued {
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
