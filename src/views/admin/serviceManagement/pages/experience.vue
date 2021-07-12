<!--
 * @Author: your name
 * @Date: 2021-03-09 14:15:11
 * @LastEditTime: 2021-07-08 14:40:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\experience.vue
-->
<template>
  <div id="indexBody">
    <ttable
      v-loading="loading"
      :options="{ height: '560px' }"
      :columns="columns"
      :list="list"
    >
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
import { trim } from '@/utils/index';
import ttable from '../../common/t_table';
import { job_labor } from '../api/index';
export default {
  name: 'experience',
  components: { ttable },
  props: ['userPid'],
  data() {
    return {
      dicOptions: {
        qx: trim(this.$store.getters['dictionary/ggjbxx_qx'])
      },
      pageParam: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      loading: true,
      columns: [
        { title: '序号', type: 'index', width: 50 },
        { title: '起始日期', prop: 'gzksrq' },
        { title: '终止日期', prop: 'gzjsrq' },
        { title: '就业类型', prop: 'jylx' },
        { title: '用工形式', prop: 'ygxs' },
        { title: '工作单位名称', prop: 'dwmc' },
        { title: '单位性质', prop: 'corpNature' },
        { title: '职业工种', prop: 'zygz' },
        { title: '劳务派遣', prop: 'lwpq' },
        { title: '派遣去向', prop: 'pqqx' },
        { title: '派遣期限', prop: 'pqqx' },
        { title: '备注', prop: 'bz' }
      ],
      list: []
    };
  },
  computed: {},
  methods: {
    formatTime(val) {
      if (val.length >= 8) {
        return (
          val.substring(0, 4) +
          '年' +
          val.substring(4, 6) +
          '月' +
          val.substring(6, 8) +
          '日'
        );
      } else {
        return val;
      }
    },
    query() {
      let data = { pid: this.userPid, pageParam: this.pageParam };
      data.pageParam.pageIndex =
        JSON.parse(JSON.stringify(this.pageParam.pageIndex)) - 1;
      job_labor(
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
