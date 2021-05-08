<!--
 * @Author: GengHH
 * @Date: 2020-12-16 11:32:31
 * @LastEditors: GengHH
 * @LastEditTime: 2021-05-08 18:41:10
 * @Description: file content
 * @FilePath: \jb2q-hrm-web\src\views\corporation\jobMgr\JobQueryUnpublished.vue
-->
<template>
  <div id="jobQueryUnpublished">
    <div class="title-style">未发布职位</div>
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
          icon="el-icon-close"
          confirmType="pop"
          :easyBtn="easyBtn"
          :popConfig="popConfig1"
          @confirm="doDeletePosition($event)"
          @click="doDeletePosition($event)"
          >删除</pl-button
        >
        <pl-button
          btnClass="orange-btn"
          icon="el-icon-thumb"
          confirmType="pop"
          :popConfig="popConfig2"
          @confirm="doReleasePosition($event)"
          >发布</pl-button> -->
      </el-col>
      <el-col :span="12">
        <BaseSearch @clickButton="queryResult($event, 'btn')"></BaseSearch>
      </el-col>
    </el-row>
    <pl-table
      :data="tableData"
      :totalCount="totalCount"
      ref="jobTable"
      :columns="columns"
      show-pager
      @handleSizeChangeOnBack="handlePageChange"
      @handleCurrentChangeOnBack="handlePageChange"
    >
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
import BaseSearch from '@/components/common/BaseSearch';
import {
  findPosition,
  doDeletePosition,
  releasePosition
} from '@/api/corporationApi';
export default {
  name: 'jobQueryUnpublished',
  components: {
    BaseSearch
  },
  data() {
    return {
      easyBtn: true,
      totalCount: 0,
      positionName: '',
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
          prop: 'editTime',
          formatter: 'date',
          slotName: 'date'
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
                return !row.actions.find(c => c === item.id);
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
  created() {
    this.queryResult();
  },
  methods: {
    async queryResult(val, type) {
      this.positionName = type === 'btn' ? $.trim(val) : this.positionName;
      let positionResult = await findPosition({
        cid: this.$store.getters['corporation/cid'],
        status: 'unrelease',
        positionName: this.positionName,
        pageParam: {
          pageSize: this.$refs.jobTable?.pageSize || 10,
          pageIndex: this.$refs.jobTable?.currentPage - 1 || 0
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
        this.tableData = positionResult.result.pageresult.data;
        this.totalCount = positionResult.result.pageresult.total || 0;
      } else {
        this.tableData = [];
        this.totalCount = 0;
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
      if (this.selection && this.selection.length == 0) {
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
            that.selection.forEach(i => {
              _positionIdList.push(i.editId || i.positionId);
            });
            doDeletePosition({
              editIdList: _positionIdList
            }).then(deleteRes => {
              if (deleteRes && deleteRes.status === 200) {
                that.tableData = that.tableData.filter(
                  obj => !that.selection.some(i => obj.id === i.id)
                );
                this.$message({
                  type: 'success',
                  message: '发布成功'
                });
              } else if (deleteRes) {
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
     * 首次发布职位 TODO
     */
    releaseJob() {
      let that = this;
      if (this.selection && this.selection.length == 0) {
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
            releasePosition().then(releaseRes => {
              if (releaseRes && releaseRes.status === 200) {
                that.tableData = that.tableData.filter(
                  obj => !that.selection.some(i => obj.id === i.id)
                );
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
    handlePageChange() {
      this.queryResult();
    }
  }
};
</script>

<style lang="scss" scoped>
#jobQueryUnpublished {
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
