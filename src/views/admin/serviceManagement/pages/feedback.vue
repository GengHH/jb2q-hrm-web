<!--
 * @Author: your name
 * @Date: 2021-03-09 14:18:33
 * @LastEditTime: 2021-07-09 10:59:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\views\admin\serviceManagement\page\feedback.vue
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
      <el-table-column slot="feedbackStatus" label="反馈状态" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.status" :key="k">
            <el-tag v-if="v.value == scope.row.feedbackStatus" type="warning">{{
              v.label
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column slot="reply" label="是否参见面试" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in dicOptions.yesno" :key="k">
            <el-tag v-if="v.value == scope.row.reply" type="warning">{{
              v.label
            }}</el-tag>
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
import { job_queryApplyForFeedbackList } from '../api/index';
export default {
  name: 'feedback',
  components: { ttable },
  props: ['userPid'],
  data() {
    return {
      dicOptions: {
        //状态
        status: this.$store.getters['dictionary/recruit_feedback_status'],
        yesno: this.$store.getters['dictionary/yesno']
      },
      pageParam: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      loading: true,
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '职位名称', prop: 'positionName' },
        { title: '职位薪酬', prop: 'salary' },
        { title: '反馈状态', prop: 'feedbackStatus', slot: 'feedbackStatus' },
        { title: '反馈时间', prop: 'feedbackTime' },
        { title: '面试信息', prop: 'aaa007' },
        { title: '是否参见面试', prop: 'reply', slot: 'reply' },
        { title: '不参加原因', prop: 'reason' }
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
      job_queryApplyForFeedbackList(
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
  mounted() {
    this.query();
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
