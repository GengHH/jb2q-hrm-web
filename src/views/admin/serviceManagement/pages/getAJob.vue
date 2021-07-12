<!--
 * @Author: your name
 * @Date: 2021-03-09 14:18:24
 * @LastEditTime: 2021-07-08 14:40:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\getAJob.vue
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
      <el-table-column slot="headerTime" label="时间" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)"
            >时间</el-button
          ><el-tag type="success">时间</el-tag>
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
import { job_jyjxRecordInfo } from '../api/index';
export default {
  name: 'getAJob',
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
        { title: '起始年月', prop: 'ksrq' },
        { title: '终止年月', prop: 'jsrq' },
        { title: '见习基地名称', prop: 'jdmc' },
        { title: '见习岗位名称', prop: 'gwmc' }
      ]
    };
  },
  computed: {},
  methods: {
    query() {
      let data = { pid: this.userPid, pageParam: this.pageParam };
      data.pageParam.pageIndex =
        JSON.parse(JSON.stringify(this.pageParam.pageIndex)) - 1;
      job_jyjxRecordInfo(
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
