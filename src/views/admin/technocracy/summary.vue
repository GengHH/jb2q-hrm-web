<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-04-01 10:10:12
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
      <el-table-column width="200" slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="opendio(1, scope)" plain>
            <i class="el-icon-edit"></i> 编辑</el-button
          >
          <el-button size="mini" type="danger" @click="remove(scope)" plain
            ><i class="el-icon-close"></i>删除</el-button
          >
        </template>
      </el-table-column>
    </ttable>
    <el-pagination
      @size-change="handleChange"
      @current-change="handleChange"
      :current-page.sync="params.pageIndex"
      :page-size="params.pageSize"
      layout="prev, pager, next, jumper"
      :total="params.total"
    >
    </el-pagination>
    <div style="text-align:right">
      <el-button type="primary" @click="opendio(3)">
        <i class="el-icon-plus"></i> 添加</el-button
      >
    </div>
    <summarydetail
      v-if="visible"
      :disabled="disabled"
      :visible="visible"
      :form="form"
      :type="type"
      @onclose="onclose"
    ></summarydetail>
  </div>
</template>

<script>
import ttable from '../common/t_table';
import summarydetail from './pages/summaryDetail';
import { summary_query, summary_remove } from './api/index';

export default {
  name: 'summarys',
  components: {
    ttable,
    summarydetail
  },
  data() {
    return {
      type: 0,
      form: {},
      initform: {
        meetTheme: '',
        meetTime: '',
        meetAddress: '',
        meetCaller: '',
        expertNames: '',
        meetOtherPeople: '',
        meetImageBase64: ''
      },
      disabled: false,
      visible: false,
      params: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      input3: '',
      currentPage: 1,
      list: [],
      columns: [
        { type: 'selection' },
        { title: '会议议题', prop: 'meetTheme' },
        { title: '会议日期', prop: 'meetTime' },
        { title: '会议地点', prop: 'meetAddress' },
        { title: '会议召集人', prop: 'meetCaller' },
        { title: '会与专家', prop: 'expertJoinDatas' },
        { title: '会与其他人员', prop: 'meetOtherPeople' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009', width: 200 }
      ]
    };
  },
  computed: {},
  methods: {
    remove(e) {
      let data = { ...e.row };
      summary_remove(
        data,
        res => {
          if (res.result.data.result) {
            this.message('success', '操作成功');
            this.onSubmit();
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
    message(type, msg) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {}
      });
    },
    onSubmit() {
      let data = { ...this.params };
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex - 1));
      summary_query(
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
      if (type == 1) {
        this.type = 1;
        this.disabled = false;
        this.form = { ...scope.row };
      } else if (type == 2) {
        this.disabled = true;
        this.form = { ...scope.row };
      } else {
        this.type = 3;
        this.disabled = false;
        this.form = { ...this.initform };
      }
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
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
