<!--
 * @Author: your name
 * @Date: 2021-03-05 09:55:06
 * @LastEditTime: 2021-05-18 17:31:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div id="indexBody">
    <tform :formConfig="formConfig" @onsubmit="advancedSearch"></tform>
    <ttable :columns="columns" :list="list">
      <!-- 内容部分-操作 -->

      <el-table-column width="280" slot="aaa010" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="look(1, scope)" plain>
            <i class="el-icon-search"></i>查看</el-button
          >
          <el-button
            icon="el-icon-folder-checked"
            size="mini"
            type="success"
            @click="look(2, scope)"
            plain
          >
            审核</el-button
          >
          <el-popconfirm title="确定删除吗？" @confirm="userRemove(scope)">
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              @click="look(scope, 1)"
              plain
            >
              <i class="el-icon-close"></i> 删除</el-button
            >
          </el-popconfirm>
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
    <hrdetails
      v-if="visible"
      :visible="visible"
      :type="type"
      :dataList="dataList"
      @onclose="onclose"
    ></hrdetails>
  </div>
</template>

<script>
import { trim } from '@/utils/index';
import tform from '../common/t_form';
import ttable from '../common/t_table';
import hrdetails from './module/details';
import {
  user_query,
  user_querySysm,
  user_edit,
  user_del,
  user_add
} from './api/index';

export default {
  name: 'HRAudit',
  components: { ttable, tform, hrdetails },
  data() {
    return {
      type: 1,
      visible: false,
      dataList: [],
      params: {
        pageIndex: 1,
        total: 0
      },
      pageSize: 10,
      columns: [
        // { type: 'selection' },
        { title: '序号', type: 'index' },
        { title: '单位名称', prop: 'userName' },
        { title: '社会信用代码', prop: 'name' },
        { title: '联系人', prop: 'statusId' },
        { title: '联系电话', prop: 'deptName' },
        { title: '其他说明', prop: 'positionName' },
        { title: '操作', slot: 'aaa010' }
      ],
      list: [{}],
      formConfig: {
        inline: true,
        size: 'small',
        labelPosition: 'right',
        labelWidth: '100px',

        formItemList: [
          {
            type: 'input',
            label: '账号名',
            style: { width: '210px' },
            placeholder: '请输入账号名',
            rules: [],
            key: 'userName'
          },
          {
            type: 'input',
            label: '姓名',
            style: { width: '210px' },
            placeholder: '请输入姓名',
            rules: [],
            key: 'name'
          }
        ]
      },
      dicOptions: {
        //角色类型
        role: trim(this.$store.getters['dictionary/recruit_user_role'])
      }
    };
  },
  computed: {},
  methods: {
    message(type, msg) {
      this.$message({
        message: msg,
        type: type,
        duration: 1000,
        onClose: () => {}
      });
    },
    look(type, e) {
      this.type = type;

      this.visible = true;

      //1查看 2审核
    },
    handleChange(e) {
      console.log(e);
    },
    onclose() {
      this.visible = false;
    },
    advancedSearch(e) {
      let data = { ...this.params, ...e };
      data.pageIndex = JSON.parse(JSON.stringify(this.params.pageIndex - 1));
      data.pageSize = this.pageSize;
      this.dataList = data;
      user_query(
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
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
