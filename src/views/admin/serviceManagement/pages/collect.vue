<!--
 * @Author: your name
 * @Date: 2021-03-09 14:18:47
 * @LastEditTime: 2021-07-08 14:40:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\collect.vue
-->
<template>
  <div id="indexBody">
    <ttable
      v-loading="loading"
      :options="{ height: '560px' }"
      :columns="columns"
      :list="list"
    >
      <el-table-column slot="workNature" label="工作性质" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.nature" :key="k">
            <el-tag v-if="v.value == scope.row.workNature">{{
              v.label
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column slot="eduRequire" label="学历要求" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.edu" :key="k">
            <el-tag v-if="v.value == scope.row.eduRequire">{{
              v.label
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column slot="workArea" label="工作地点" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.qx" :key="k">
            <el-tag v-if="v.value == scope.row.workArea">{{ v.label }}</el-tag>
          </div>
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
import { job_favor } from '../api/index';
export default {
  name: 'collect',
  components: { ttable },
  props: ['userPid'],
  data() {
    return {
      dicOptions: {
        //区县
        qx: this.$store.getters['dictionary/ggjbxx_qx'],
        //学历
        edu: this.$store.getters['dictionary/recruit_edu'],
        //工作性质
        nature: this.$store.getters['dictionary/recruit_work_nature']
      },
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
        { title: '薪酬', prop: 'salary', slot: 'salary' },
        { title: '学历要求', prop: 'eduRequire', slot: 'eduRequire' },
        { title: '工作性质', prop: 'workNature', slot: 'workNature' },
        { title: '招聘人数', prop: 'recruitNum' },
        { title: '工作地点', prop: 'workArea', slot: 'workArea' },
        { title: '发布时间', prop: 'releaseTime' },
        { title: '收藏时间', prop: 'favorTime' }
      ],
      list: []
    };
  },
  computed: {},
  methods: {
    query() {
      let data = { pid: this.userPid, pageParam: this.pageParam };
      data.pageParam.pageIndex =
        JSON.parse(JSON.stringify(this.pageParam.pageIndex)) - 1;
      job_favor(
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
