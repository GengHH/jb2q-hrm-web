<!--
 * @Author: tangqiang
 * @Date: 2021-03-05 13:46:47
 * @LastEditTime: 2021-04-17 16:54:54
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
      <el-table-column slot="actName" label="活动名称" align="center">
        <template slot-scope="scope">
          <div v-for="(v, k) in activityList" :key="k">
            <div v-if="v.actId == scope.row.actName">{{ v.actName }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="opendio(1, scope)" plain>
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
      layout="prev, pager, next, jumper"
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
      :disabled="disabled"
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
      disabled: false,
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
        { title: '职位名称', prop: 'positionName' },
        { title: '学历要求', prop: 'eduRequire' },
        { title: '薪酬', prop: 'salary', slot: 'salary' },
        { title: '职位描述', prop: 'xm' },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      activityList: []
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
          fn();
        }
      });
    },
    onSubmit() {
      let data = { ...this.params };
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex - 1));
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
      if (type == 1) {
        this.type = 1;
        this.disabled = false;
        this.form = { ...scope.row };
        this.form.name = this.form.expertName;
        this.form.pids = this.form.xm;
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
  created() {},
  mounted() {
    //获取活动信息
    act_query(
      {
        pageIndex: 0,
        pageSize: 100,
        actName: ''
      },
      res => {
        if (res.status == 200) {
          let data = res.result.data.data;
          this.activityList = data;
        } else {
          this.message('warning', res.result.data.msg);
        }
        console.log('-----------------------------');
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>

<style lang="scss" scoped></style>
