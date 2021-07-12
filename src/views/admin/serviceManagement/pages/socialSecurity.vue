<!--
 * @Author: your name
 * @Date: 2021-03-09 14:18:14
 * @LastEditTime: 2021-07-08 14:36:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\socialSecurity.vue
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
  </div>
</template>

<script>
import ttable from '../../common/t_table';
import { job_insur } from '../api/index';
export default {
  name: 'socialSecurity',
  components: { ttable },
  props: ['userPid'],
  data() {
    return {
      params: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      loading: true,
      list: [],
      columns: [
        { title: '序号', type: 'index' },
        { title: '缴费单位名称', prop: 'corpName' },
        { title: '缴费基数', prop: 'jfjs' },
        { title: '起始日期', prop: 'ksrq' },
        { title: '终止日期', prop: 'jsrq' },
        { title: '单位类型', prop: 'corpType' }
      ]
    };
  },
  computed: {},
  methods: {
    handleChange(e) {
      console.log;
    },
    query() {
      let data = { pid: this.userPid };
      job_insur(
        data,
        res => {
          this.loading = false;
          if (res.status == 200) {
            let d = res.result.data;
            this.list = d;
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    this.query();
  }
};
</script>
