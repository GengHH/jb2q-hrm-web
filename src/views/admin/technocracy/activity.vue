<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-06-29 14:54:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <div style="text-align:right">
      <!-- <el-input style="width:50%" placeholder="请输入内容" v-model="input3"> -->
      <el-button
        style="background:#ff9350;color:#ffffff"
        type="primary"
        slot="append"
        icon="el-icon-search"
        @click="onSubmit"
        >搜索</el-button
      >
      <!-- </el-input> -->
    </div>
    <ttable :columns="columns" :list="list">
      <el-table-column width="180" slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="opendio(2, scope)"
            plain
          >
            <i class="el-icon-search"></i> 查看</el-button
          >
          <el-button
            size="mini"
            v-if="scope.row.realSubmit == '0'"
            @click="opendio(1, scope)"
            plain
          >
            <i class="el-icon-edit"></i> 编辑</el-button
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
    <div style="text-align:right">
      <el-button type="primary" @click="opendio(3)">
        <i class="el-icon-plus"></i> 添加</el-button
      >
    </div>
    <activitydetail
      v-if="visible"
      :visible="visible"
      :form="form"
      :type="type"
      @onclose="onclose"
    ></activitydetail>
  </div>
</template>

<script>
import ttable from '../common/t_table';
import activitydetail from './pages/activityDetail';
import { activity_query } from './api/index';
import { act_query } from '../profession/api/index';
export default {
  name: 'activity',
  components: {
    ttable,
    activitydetail
  },
  data() {
    return {
      type: 0,
      form: {},
      initform: {
        expertId: '',
        actType: '',
        actDate: '',
        actDateType: '',
        pid: '',
        zjhm: '',
        xm: '',
        contactNumber: '',
        actName: '',
        psnlCount: '',
        recordImageBase64: ''
      },
      visible: false,
      params: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      input3: '',

      list: [],
      columns: [
        { type: 'index' },
        { title: '专家编号', prop: 'expertId' },
        { title: '专家姓名', prop: 'expertName' },
        { title: '活动时间', prop: 'actDate' },
        { title: '服务对象姓名', prop: 'xm' },
        { title: '证件号码', prop: 'zjhm' },
        { title: '活动类型', prop: 'actTypems' },
        { title: '活动名称', prop: 'actName' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      activityList: [],
      dataList: {}
    };
  },
  computed: {},
  methods: {
    message(type, msg, fn) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {
          if (fn) {
            fn();
          }
        }
      });
    },
    onSubmit() {
      let data = { ...this.params };
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex - 1));
      this.dataList = data;
      activity_query(
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
    },
    opendio(type, scope) {
      //1 编辑 2 查看 3 新增
      if (type == 1 || type == 2) {
        this.form = { ...scope.row };
        this.form.name = this.form.expertName;
        this.form.pids = this.form.xm;
        this.form.actName = this.form.actName
          ? this.form.actName - 0
          : this.form.actName;
      } else {
        this.form = { ...this.initform };
      }
      this.type = type;
      this.visible = true;
    },
    onclose(type) {
      this.visible = false;
      this.form = {};
      if (!!type) {
        this.onSubmit();
      }
    },
    handleChange(e) {
      console.log(e);
      this.params.pageIndex = e;
      this.onSubmit(this.dataList);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
