<!--
 * @Author: your name
 * @Date: 2021-03-05 09:55:06
 * @LastEditTime: 2021-06-25 14:49:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <el-button-group>
      <el-button
        v-for="(v, k) in dicOptions.status"
        :key="k"
        size="mini"
        @click="queryState(v.value)"
        type="primary"
        >{{ v.label }}</el-button
      >
    </el-button-group>
    <ttable
      :options="{ height: '350px' }"
      :tableClass="'tableClass'"
      :columns="columns"
      :list="list0"
    >
      <el-table-column slot="complaintStatus" label="审核状态" align="center">
        <template slot-scope="scope">
          <template v-for="(v, k) in dicOptions.status">
            <el-tag :key="k" v-if="v.value == scope.row.complaintStatus">
              {{ v.label }}
            </el-tag>
          </template>
        </template>
      </el-table-column>

      <el-table-column slot="aaa009" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="state == '1'"
            size="mini"
            type="primary"
            plain
            @click="look('0', scope)"
          >
            查看</el-button
          >
          <el-button
            v-if="state == '0'"
            size="mini"
            type="primary"
            plain
            @click="look('1', scope)"
          >
            处理</el-button
          >
        </template>
      </el-table-column>
    </ttable>
    <el-pagination
      @size-change="handleChange0"
      @current-change="handleChange0"
      :current-page.sync="params0.pageIndex"
      :page-size="params0.pageSize"
      layout="total, prev, pager, next"
      :total="params0.total"
    ></el-pagination>
    <adddetails
      v-if="visible"
      :visible="visible"
      :type="type"
      :dataList="dataListObj"
      @onclose="onclose"
    ></adddetails>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../common/t_form';
import ttable from '../common/t_table';
import adddetails from './module/addDetails';

import { user_query } from './api/index';

export default {
  name: 'positionComplainManagement',
  components: { ttable, tform, adddetails },
  data() {
    return {
      type: '0',
      dataListObj: {},
      visible: false,
      state: '0',
      adminId: this.$store.state.admin.userInfo.logonUser.areaInfo.areaCode,
      params0: {
        pageIndex: 1,
        total: 0,
        pageSize: 10
      },
      columns: [
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'corpName' },
        { title: '职位名称', prop: 'positionName' },
        { title: '投诉人', prop: 'xm' },
        { title: '投诉人手机', prop: 'contactPhone' },
        { title: '投诉内容', prop: 'complaintContent' },
        { title: '投诉时间', prop: 'complaintTime' },
        {
          title: '审核状态',
          prop: 'complaintStatus ',
          slot: 'complaintStatus'
        },
        { title: '操作', prop: 'aaa009', slot: 'aaa009' }
      ],
      list0: [],
      dataList: [],
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
            placeholder: '请输入单位名称',
            rules: [],
            key: 'corpName'
          },
          {
            type: 'input',
            label: '职位名称',
            style: { width: '210px' },
            placeholder: '请输入职位名称',
            rules: [],
            key: 'positionName'
          }
        ]
      },
      dicOptions: {
        //投诉状态
        status: [
          { value: '0', label: '待处理' },
          { value: '1', label: '已处理' }
        ]
      }
    };
  },
  computed: {},
  methods: {
    onclose(type) {
      this.visible = false;
      if (type == '1') {
        this.advancedSearch(this.dataList);
      }
    },
    look(type, e) {
      //0查看 1处理
      this.type = type;
      this.dataListObj = { ...e.row };
      this.visible = true;
    },
    message(type, msg) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {}
      });
    },
    queryState(type) {
      this.state = type;
      this.advancedSearch(this.dataList);
    },
    handleChange0(e) {
      console.log(e);
      this.params0.pageIndex = e;
      this.advancedSearch(this.dataList);
    },
    advancedSearch(e) {
      let pageParam = { ...this.params0 };
      let data = { ...e, pageParam, complaintStatus: this.state };
      //分页
      data.pageParam.pageIndex = JSON.parse(
        JSON.stringify(this.params0.pageIndex - 1)
      );
      data.districtCode = this.adminId;
      this.dataList = data;
      user_query(
        data,
        res => {
          if (res.status == 200) {
            this.message('success', '操作成功');
            let pageresult = res.result.pageresult;
            this.list0 = pageresult.data;
            this.params0.pageIndex = Number(pageresult.pageIndex) + 1;
            this.params0.total = pageresult.total;
          }

          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
