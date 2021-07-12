<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-07-01 19:34:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->
      <el-table-column
        width="140"
        slot="evaluationLevel"
        label="评价星级"
        align="center"
      >
        <template slot-scope="scope">
          <el-rate disabled :value="scope.row.evaluationLevel - 0"></el-rate>
        </template>
      </el-table-column>
      <el-table-column slot="aaa010" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(scope)" plain>
            <i class="el-icon-search"></i> 查看</el-button
          >
        </template>
      </el-table-column>
    </ttable>
    <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="params.pageIndex"
      :page-size="params.pageSize"
      layout="total, prev, pager, next"
      :total="params.total"
    >
    </el-pagination>
    <el-dialog
      width="75%"
      title="查看"
      :visible="dialogTableVisible"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
      @close="dialogTableVisible = false"
    >
      <resume v-if="userPid" :userPid="userPid"></resume>
    </el-dialog>
  </div>
</template>

<script>
import tform from '../common/t_form';
import ttable from '../common/t_table';
import { query } from './api/index';
import resume from '../serviceManagement/pages/resume'; //简历信息
import { allAction } from '@/api/adminApi';
export default {
  name: 'JobEvaluationReview',
  components: { ttable, tform, resume },
  data() {
    return {
      userPid: '',
      resume: {},
      loading: false,
      dialogTableVisible: false,
      params: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',

        formItemList: [
          {
            type: 'input',
            label: '单位名称',
            style: { width: '210px' },
            placeholder: '请输入账号名',
            rules: [],
            key: 'corpName'
          },
          {
            type: 'input',
            label: '职位名称',
            style: { width: '210px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'positionName'
          },
          {
            type: 'select',
            label: '评级星级',
            rules: [],
            key: 'evaluationLevel',
            style: { width: '210px' },
            options: [
              {
                value: '1',
                label: '一星',
                disabled: false
              },
              {
                value: '2',
                label: '二星',
                disabled: false
              },
              {
                value: '3',
                label: '三星',
                disabled: false
              },
              {
                value: '4',
                label: '四星',
                disabled: false
              },
              {
                value: '5',
                label: '五星',
                disabled: false
              }
            ]
          }
        ]
      },
      currentPage: 1,
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '职位名称', prop: 'positionName' },
        { title: '评价星级', prop: 'evaluationLevel', slot: 'evaluationLevel' },
        { title: '评价内容', prop: 'evaluationContent' },
        { title: '评价时间', prop: 'evaluationTime' },
        { title: '评价人', prop: 'xm' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [],
      dataList: {}
    };
  },
  computed: {},
  methods: {
    handleChange(e) {
      console.log(e);
      this.params.pageIndex = e;
      this.advancedSearch(this.dataList);
    },
    message(type, msg) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {}
      });
    },
    advancedSearch(e) {
      let data = { ...e, ...this.params };
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex - 1));
      this.dataList = data;
      query(
        data,
        res => {
          if (res.status == 200) {
            this.message('success', '操作成功');
            let pageresult = res.result.pageresult;
            this.list = pageresult.data;
            this.params.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params.total = pageresult.total;
          } else {
            this.message('warning', res.result.data.msg);
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
      console.log(e);
    },
    look(e) {
      this.userPid = e.row.pid;
      this.dialogTableVisible = true;
      this.loading = true;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
