<!--
 * @Author: your name
 * @Date: 2021-03-09 14:18:40
 * @LastEditTime: 2021-06-30 15:11:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\comment.vue
-->
<template>
  <div id="indexBody">
    <ttable
      v-loading="loading"
      :options="{ height: '560px' }"
      :columns="columns"
      :list="list"
    >
      <!-- 内容部分-操作 -->
      <el-table-column slot="evaluationLevel" label="反馈状态" align="center">
        <template slot-scope="scope">
          <el-rate disabled :value="scope.row.evaluationLevel - 0"></el-rate>
        </template>
      </el-table-column>
    </ttable>
    <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :page-size="pageParam.pageSize"
      layout="total, prev, pager, next"
      :total="pageParam.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import ttable from '../../common/t_table';
import { job_evaluation } from '../api/index';
export default {
  name: 'comment',
  components: { ttable },
  props: ['userPid'],
  data() {
    return {
      pageParam: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      loading: true,
      list: [],
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '职位名称', prop: 'positionName' },
        { title: '评价星级', prop: 'evaluationLevel', slot: 'evaluationLevel' },
        { title: '评价内容', prop: 'evaluationContent' },
        { title: '评价时间', prop: 'evaluationTime' }
      ]
    };
  },
  computed: {},
  methods: {
    query() {
      let data = { pid: this.userPid, pageParam: this.pageParam };
      data.pageParam.pageIndex =
        JSON.parse(JSON.stringify(this.pageParam.pageIndex)) - 1;
      job_evaluation(
        data,
        res => {
          this.loading = false;
          if (res.status == 200) {
            let pageresult = res.result.pageresult;
            this.list = pageresult.data;
            this.pageParam.pageIndex = Number(pageresult.pageIndex) + 1;
            this.pageParam.total = pageresult.total;
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    handleChange(e) {
      this.pageParam.pageIndex = e;
      this.query();
    }
  },
  created() {
    this.query();
  }
};
</script>

<style lang="scss" scoped></style>
